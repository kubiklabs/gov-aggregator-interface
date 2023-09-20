import { useRecoilValue } from "recoil";
import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";

import { useConfig } from "./useConfig";
import { walletState } from "../context/walletState";
import { queryClientState } from "../context/queryClientState";
import { coinConvert, sleep } from "../utils/common";
import { networkConstants } from "../utils/constants";
import { networkState } from "../context/networkState";

export const useNativeToken = () => {
  const { queryClient } = useRecoilValue(queryClientState);
  const { client, address } = useRecoilValue(walletState);
  const config = useConfig();

  const { network } = useRecoilValue(networkState);
  const defaultGas = networkConstants[network].defaultGas;

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
   * Returns native token balance
   */
  const getBalance = async (tokenName: string) => {
    await checkQueryClient();
    await checkAddressClient();
    console.log("tokenName: ", tokenName);
    try {
      const balanceResponse = await (queryClient as CosmWasmClient).getBalance(
        address as string,
        tokenName
      );
      console.log("balanceResponse: ", balanceResponse);

      return coinConvert(balanceResponse.amount as string, 6, "human");
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Transfers native token to given address
   */
  const doTransfer = async (
    tokenName: string,
    tokenAmount: string,
    destAddress: string,
    gasValue?: string | undefined
  ) => {
    await checkTxnClient();
    try {
      const sendResponse = await (client as SigningCosmWasmClient).sendTokens(
        address as string,
        destAddress,
        [
          {
            denom: tokenName,
            amount: coinConvert(tokenAmount, 6, "machine"),
          },
        ],
        {
          amount: [],
          gas: gasValue !== undefined ? gasValue : defaultGas.native_transfer,
        }
      );

      return sendResponse;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getBalance,
    doTransfer,
  };
};
