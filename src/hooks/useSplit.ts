import { Buffer } from "buffer";
import { useRecoilValue } from "recoil";
import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";

import { useToken } from "./useToken";
import { toast } from "react-toastify";
import { useConfig } from "./useConfig";
import { TxnLinkComp, coinConvert, sleep } from "../utils/common";
import { walletState } from "../context/walletState";
import { useMessageToaster } from "./useMessageToaster";
import { networkConstants } from "../utils/constants";
import { queryClientState } from "../context/queryClientState";
import {
  SplitterContract,
  SplitterQueryContract,
} from "./clients/osmosis/SplitterContract";
import { networkState } from "../context/networkState";

export interface Coin {
  readonly denom: string;
  readonly amount: string;
}

export const useSplit = () => {
  const token = useToken();
  const config = useConfig();
  const toaster = useMessageToaster();
  const { queryClient } = useRecoilValue(queryClientState);
  const { client, address } = useRecoilValue(walletState);

  const { network } = useRecoilValue(networkState);
  const defaultGas = networkConstants[network].defaultGas;
  const baseDenom = networkConstants[network].baseDenom;
  const baseSymbol = networkConstants[network].baseSymbol;

  const splitterQueryClient = new SplitterQueryContract(
    queryClient as CosmWasmClient,
    config.getOtherContract("splitter").contract_addr
  );
  const splitterClient = new SplitterContract(
    client as SigningCosmWasmClient,
    config.getOtherContract("splitter").contract_addr
  );

  const checkQueryClient = async () => {
    while (true) {
      if (queryClient === undefined) {
        await sleep(0.2);
      } else {
        break;
      }
    }
  };

  const checkTxnClient = async () => {
    while (true) {
      if (client === undefined) {
        await sleep(0.2);
      } else {
        break;
      }
    }
  };

  const checkAddressClient = async () => {
    while (true) {
      if (address === undefined) {
        await sleep(0.2);
      } else {
        break;
      }
    }
  };

  /*
   * Returns the state of splitter contract (ybToken deposited)
   */
  const getSplitterState = async (): Promise<string | undefined> => {
    await checkQueryClient();
    try {
      const splitterStateResponse = await splitterQueryClient.state();
      return splitterStateResponse.state;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  /*
   * Deposit ybToken to get pToken and yToken
   */
  const doSplit = async (
    tokenAmount: string,
    tokenType: string,
    gasValue?: string | undefined
  ) => {
    await checkTxnClient();
    const tid = "Request Rejected";
    try {
      let splitResponse = await splitterClient.deposit(
        {
          userAddress: address as string,
          customFees: {
            gas: gasValue !== undefined ? gasValue : defaultGas.add_liquidity,
            amount: [],
          },
          transferAmount: [ // send ybToken here, TODO: remove hardcoded denom
            {
              amount: coinConvert(tokenAmount, 6, "machine"),
              denom: "factory/osmo1jfxslamnq8au8yz0ak2v765jthp95d5pm3e05f8yers8pdmqyxvql2uhp5/osmomars",
            },
          ],
        },
      );

      if(!splitResponse || splitResponse===undefined){
        toaster.Error("Failed to split OSMOmars");
        toaster.Error((splitResponse.rawLog).substr(0,100) + "...");
      } else {
        toast.success(`Split ${tokenAmount} ${baseSymbol} for ${tokenType}${baseSymbol}`);
        toast.info(
          splitResponse.transactionHash
            ? TxnLinkComp(splitResponse.transactionHash)
            : "No hash",
          {
            closeOnClick: false,
          }
        );
      }
      console.log("splitResponse: ", splitResponse);
      return splitResponse;
    } catch (error) {
      toaster.Error("Failed to split.");
      console.log(error);
      toast.info(tid, {
        type: "error",
        closeOnClick: true,
        // render: "Request rejected",
        autoClose: 5000,
        isLoading: false,
      });
      if (error instanceof Error) {
        toaster.Error(error.message);
      }
      return;
    }
  };

  /*
   * Deposit pToken and yToken to get ybToken
   */
  const doMerge = async (
    tokenAmount: string,
    tokenType: string,
    gasValue?: string | undefined
  ) => {
    await checkTxnClient();
    const tid = "Request Rejected";

    try {
      let mergeResponse = await splitterClient.withdraw(
        {
          userAddress: address as string,
          customFees: {
            gas: gasValue !== undefined ? gasValue : defaultGas.add_liquidity,
            amount: [],
          },
          transferAmount: [ // send pToken and yToken here, TODO: remove hardcoded denom
            {
              amount: coinConvert(tokenAmount, 6, "machine"),
              denom: "factory/osmo1f9krjhw2umx5fv4rerxfksafljwejrwwej28sslsm0s3qswgst7qhjncmf/posmomars",
            },
            {
              amount: coinConvert(tokenAmount, 6, "machine"),
              denom: "factory/osmo1f9krjhw2umx5fv4rerxfksafljwejrwwej28sslsm0s3qswgst7qhjncmf/yosmomars",
            },
          ],
        },
      );

      if(!mergeResponse || mergeResponse===undefined){
        toaster.Error("Failed to merge to OSMOmars");
        toaster.Error((mergeResponse.rawLog).substr(0,100) + "...");
      } else {
        toast.success(`Merged to ${tokenAmount} ${baseSymbol} for ${tokenType}${baseSymbol}`);
        toast.info(
          mergeResponse.transactionHash
            ? TxnLinkComp(mergeResponse.transactionHash)
            : "No hash",
          {
            closeOnClick: false,
          }
        );
      }
      console.log("mergeResponse: ", mergeResponse);
      return mergeResponse;
    } catch (error) {
      console.log(error);
      toaster.Error("Failed to merge");
      toast.info(tid, {
        type: "error",
        closeOnClick: true,
        // render: "Request rejected",
        autoClose: 5000,
        isLoading: false,
      });

      if (error instanceof Error) {
        toaster.Error(error.message);
      }
      return;
    }
  };

  return {
    getSplitterState,
    doSplit,
    doMerge,
  };
};
