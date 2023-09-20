import { useRecoilValue } from "recoil";
import { CosmWasmClient, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

import { useConfig } from "./useConfig";
import { walletState } from "../context/walletState";
import { queryClientState } from "../context/queryClientState";
import {
  Cw20TokenContract,
  Cw20TokenQueryContract,
} from "./clients/contracts";
import { coinConvert, sleep } from "../utils/common";
import { networkConstants } from "../utils/constants";
import { networkState } from "../context/networkState";
import { useMessageToaster } from "./useMessageToaster";

export const useCw20Token = () => {
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
  }

  const checkTxnClient = async () => {
    while (true) {
      if (client === undefined) {
        await sleep(0.2);
      } else {
        break;
      }
    }
  }

  const checkAddressClient = async () => {
    while (true) {
      if (address === undefined) {
        await sleep(0.2);
      } else {
        break;
      }
    }
  }

  /*
   * Returns token balance using cw20 contract
   */
  const getCw20Balance = async (
    tokenName: string,
  ) => {
    await checkQueryClient();
    await checkAddressClient();
    const cwQueryClient = new Cw20TokenQueryContract[network](
      queryClient as CosmWasmClient,
      config.getOtherContract(tokenName).contract_addr as string,
      config.getOtherContract(tokenName).contract_code_hash as string
    );

    try {
      const balanceInfo = await cwQueryClient.balance({
        address: address as string,
      });

      return coinConvert(balanceInfo.balance as string, 6, "human");
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Returns token balance for token address using cw20 contract
   */
  const getCw20BalanceByAddress = async (
    tokenAddr: string,
    tokenCodeHash: string,
  ) => {
    await checkQueryClient();
    await checkAddressClient();
    const cwQueryClient = new Cw20TokenQueryContract[network](
      queryClient as CosmWasmClient,
      tokenAddr,
      tokenCodeHash
    );

    try {
      const balanceInfo = await cwQueryClient.balance({
        address: address as string,
      });

      return coinConvert(balanceInfo.balance as string, 6, "human");
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Returns token total supply for token address using cw20 contract
   */
  const getCw20SupplyByAddress = async (
    tokenAddr: string,
    tokenCodeHash: string,
  ) => {
    await checkQueryClient();
    const cwQueryClient = new Cw20TokenQueryContract[network](
      queryClient as CosmWasmClient,
      tokenAddr,
      tokenCodeHash
    );

    try {
      const tokenInfo = await cwQueryClient.tokenInfo();

      return coinConvert(tokenInfo.token_info.total_supply as string, 6, "human");
    } catch (error) {
      console.log(error);
    }
  };

  // /*
  //  * Returns token transaction history using cw20 contract
  //  */
  // const getTransactionHistory = async (
  //   tokenName: string,
  //   userAddress: string,
  // ) => {
  //   // TODO: move the queryClient init to global of the app and remove from here
  //   // TODO: move the contract Clients init to outer of this hook, same of other hooks

  //   const routerQueryClient = new RouterQueryContract(
  //     queryClient,
  //     otherContracts.router.contract_addr,
  //     otherContracts.router.contract_code_hash
  //   );
  //   try {
  //     const routerConfig = await routerQueryClient.config();
  //   } catch (error) {
  //     console.log(error);
  //     //handleErrorMessage(error);
  //     return;
  //   }

  //   // let exch_rate = response.sejuno_exchange_rate.rate;
  //   // if (exch_rate.length > 10) {
  //   //   exch_rate = exch_rate.slice(0, 10);
  //   // }
  //   return [];
  // };

  /*
   * Transfers token to given address using cw20 contract
   */
  const doTransfer = async (
    tokenName: string,
    tokenAmount: string,
    destAddress: string,
    gasValue?: string | undefined,
  ) => {
    const cwClient = new Cw20TokenContract[network](
      client as SigningCosmWasmClient,
      config.getOtherContract(tokenName).contract_addr as string,
      config.getOtherContract(tokenName).contract_code_hash as string
    );

    try {
      const transferResponse = await cwClient.transfer(
        {
          userAddress: address as string,
          customFees: {
            gas: (gasValue !== undefined)? gasValue: defaultGas.snip_transfer,
            amount: [],
          }
        },
        {
          amount: coinConvert(tokenAmount, 6, "machine"),
          recipient: destAddress,
        }
      );

      return transferResponse;
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Sends token to given contract using cw20 contract
   */
  const toaster = useMessageToaster();
  const doSend = async (
    tokenName: string,
    tokenAmount: string,
    contractAddress: string,
    msg: string,
    gasValue?: string | undefined,
  ) => {
    await checkTxnClient();
    const cwClient = new Cw20TokenContract[network](
      client as SigningCosmWasmClient,
      config.getOtherContract(tokenName).contract_addr as string,
      config.getOtherContract(tokenName).contract_code_hash as string
    );

    try {
      const sendResponse = await cwClient.send(
        {
          userAddress: address as string,
          customFees: {
            gas: (gasValue !== undefined)? gasValue: defaultGas.snip_send,
            amount: [],
          }
        },
        {
          amount: coinConvert(tokenAmount, 6, "machine"),
          contract: contractAddress,
          msg: msg,
        }
      );

      return sendResponse;
    } catch (error) {
      
      toaster.Error(`Transaction failed`);
      toaster.Error(error as string);
      console.log(error);
    }
  }

  /*
   * Sends token to given contract using cw20 contract
   */
  const doSendByAddress = async (
    tokenAddress: string,
    tokenCodeHash: string,
    tokenAmount: string,
    contractAddress: string,
    msg: string,
    gasValue?: string | undefined,
  ) => {
    await checkTxnClient();
    const cwClient = new Cw20TokenContract[network](
      client as SigningCosmWasmClient,
      tokenAddress,
      tokenCodeHash,
    );

    try {
      const sendResponse = await cwClient.send(
        {
          userAddress: address as string,
          customFees: {
            gas: (gasValue !== undefined)? gasValue: defaultGas.snip_send,
            amount: [],
          }
        },
        {
          amount: coinConvert(tokenAmount, 6, "machine"),
          contract: contractAddress,
          msg: msg,
        }
      );

      return sendResponse;
    } catch (error) {
      console.log(error);
    }
  }

  /*
   * Increase token allowance for given contract address using cw20 contract
   */
  const doIncreaseAllowance = async (
    tokenName: string,
    tokenAmount: string,
    contractAddress: string,
    gasValue?: string | undefined,
  ) => {
    await checkTxnClient();
    const cwClient = new Cw20TokenContract[network](
      client as SigningCosmWasmClient,
      config.getOtherContract(tokenName).contract_addr as string,
      config.getOtherContract(tokenName).contract_code_hash as string
    );

    try {
      const incAllowanceResponse = await cwClient.increaseAllowance(
        {
          userAddress: address as string,
          customFees: {
            gas: (gasValue !== undefined)? gasValue: defaultGas.snip_allowance,
            amount: [],
          }
        },
        {
          amount: coinConvert(tokenAmount, 6, "machine"),
          spender: contractAddress,
        }
      );

      return incAllowanceResponse;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getCw20Balance,
    getCw20BalanceByAddress,
    getCw20SupplyByAddress,
    // getTokenInfo,
    // getTokenConfig,
    // getAllowance,
    // getTransactionHistory,
    doTransfer,
    doSend,
    doSendByAddress,
    doIncreaseAllowance,
  };
};
