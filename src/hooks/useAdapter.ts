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
  MarsAdapterContract,
  MarsAdapterQueryContract,
} from "./clients/osmosis/MarsAdapterContract";
import { networkState } from "../context/networkState";

export interface Coin {
  readonly denom: string;
  readonly amount: string;
}

export const useAdapter = () => {
  const token = useToken();
  const config = useConfig();
  const toaster = useMessageToaster();
  const { queryClient } = useRecoilValue(queryClientState);
  const { client, address } = useRecoilValue(walletState);

  const { network } = useRecoilValue(networkState);
  const defaultGas = networkConstants[network].defaultGas;
  const baseDenom = networkConstants[network].baseDenom;
  const baseSymbol = networkConstants[network].baseSymbol;

  const adapterQueryClient = new MarsAdapterQueryContract(
    queryClient as CosmWasmClient,
    config.getOtherContract("mars_adapter").contract_addr
  );
  const adapterClient = new MarsAdapterContract(
    client as SigningCosmWasmClient,
    config.getOtherContract("mars_adapter").contract_addr
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
   * Returns the state of mars adapter contract (token deposited in mars etc)
   */
  const getAdapterState = async (): Promise<string | undefined> => {
    await checkQueryClient();
    try {
      const adapterStateResponse = await adapterQueryClient.state();
      console.log("adapterStateResponse: ", adapterStateResponse);
      return adapterStateResponse.exchange_rate;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  /*
   * Deposit Token to get ybToken
   */
  const doDeposit = async (
    tokenAmount: string,
    tokenType: string,
    gasValue?: string | undefined
  ) => {
    await checkTxnClient();
    const tid = "Request Rejected";
    try {
      let depositResponse = await adapterClient.deposit(
        {
          userAddress: address as string,
          customFees: {
            gas: gasValue !== undefined ? gasValue : defaultGas.add_liquidity,
            amount: [],
          },
          transferAmount: [ // send ybToken here, TODO: remove hardcoded denom
            {
              amount: coinConvert(tokenAmount, 6, "machine"),
              denom: "uosmo",
            },
          ],
        },
      );

      if(!depositResponse || depositResponse===undefined){
        toaster.Error("Failed to deposit OSMO");
        toaster.Error((depositResponse.rawLog).substr(0,100) + "...");
      } else {
        toast.success(`Deposit ${tokenAmount} ${baseSymbol} for ${tokenType}${baseSymbol}`);
        toast.info(
          depositResponse.transactionHash
            ? TxnLinkComp(depositResponse.transactionHash)
            : "No hash",
          {
            closeOnClick: false,
          }
        );
      }
      console.log("depositResponse: ", depositResponse);
      return depositResponse;
    } catch (error) {
      toaster.Error("Failed to deposit.");
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
   * Deposit ybToken to get Token
   */
  const doWithdraw = async (
    tokenAmount: string,
    tokenType: string,
    gasValue?: string | undefined
  ) => {
    await checkTxnClient();
    const tid = "Request Rejected";

    try {
      let withdrawResponse = await adapterClient.withdraw(
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

      if(!withdrawResponse || withdrawResponse===undefined){
        toaster.Error("Failed to withdraw to OSMO");
        toaster.Error((withdrawResponse.rawLog).substr(0,100) + "...");
      } else {
        toast.success(`Withdrawn to ${tokenAmount} ${baseSymbol} for ${tokenType}${baseSymbol}`);
        toast.info(
          withdrawResponse.transactionHash
            ? TxnLinkComp(withdrawResponse.transactionHash)
            : "No hash",
          {
            closeOnClick: false,
          }
        );
      }
      console.log("withdrawResponse: ", withdrawResponse);
      return withdrawResponse;
    } catch (error) {
      console.log(error);
      toaster.Error("Failed to withdraw");
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
    getAdapterState,
    doDeposit,
    doWithdraw,
  };
};
