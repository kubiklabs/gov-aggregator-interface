import { useConfig } from "./useConfig";
import { useNativeToken } from "./useNativeToken";
import { useCw20Token } from "./useCw20Token";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { networkConstants } from "../utils/constants";
import { networkState } from "../context/networkState";

export const useToken = () => {
  const config = useConfig();

  const nativeToken = useNativeToken();
  const cw20Token = useCw20Token();

  const { network } = useRecoilValue(networkState);
  const baseDenom = networkConstants[network].baseDenom;

  /*
   * Returns token balance (cw20 and native)
   */
  const getBalance = async (tokenName: string, isRefetching?: boolean) => {
    // if (
    //   isRefetching !== true &&
    //   balanceData[tokenName as keyof balanceStateType] !== ""
    // ) {
    //   return balanceData[tokenName as keyof balanceStateType];
    // }

    if (tokenName === baseDenom || tokenName.startsWith("factory/")) {
      // native token
      const balResponse = await nativeToken.getBalance(tokenName);
      return balResponse;
    } else {
      const balResponse = await cw20Token.getCw20Balance(tokenName);
      return balResponse;
    }
  };

  /*
   * Returns token balance (cw20) using token addr (only use for LP token)
   */
  const getBalanceByAddress = async (
    tokenAddr: string,
    tokenCodeHash: string
  ) => {
    const balance = await cw20Token.getCw20BalanceByAddress(
      tokenAddr,
      tokenCodeHash
    );
    return balance;
  };

  /*
   * Returns token total supply (cw20) using token addr (only use for LP token)
   */
  const getSupplyByAddress = async (
    tokenAddr: string,
    tokenCodeHash: string
  ) => {
    const supply = await cw20Token.getCw20SupplyByAddress(
      tokenAddr,
      tokenCodeHash
    );
    return supply;
  };

  /*
   * Transfers token to given address using (cw20 and native)
   */
  const doTransfer = async (
    tokenName: string,
    tokenAmount: string,
    destAddress: string,
    gasValue?: string | undefined
  ) => {
    if (tokenName === baseDenom) {
      // native token
      const transferResponse = await nativeToken.doTransfer(
        tokenName,
        tokenAmount,
        destAddress,
        gasValue
      );
      return transferResponse;
    } else {
      // cw20 token
      const transferResponse = await cw20Token.doTransfer(
        tokenName,
        tokenAmount,
        destAddress,
        gasValue
      );
      return transferResponse;
    }
  };

  /*
   * Sends token to given contract (cw20 only)
   */
  const doSend = async (
    tokenName: string,
    tokenAmount: string,
    contractAddress: string,
    msg: string,
    gasValue?: string | undefined
  ) => {
    if (tokenName === baseDenom) {
      // native token
      throw new Error(
        `Send transaction not allowed for native token ${tokenName}`
      );
    } else {
      // cw20 token
      const sendResponse = await cw20Token.doSend(
        tokenName,
        tokenAmount,
        contractAddress,
        msg,
        gasValue
      );
      return sendResponse;
    }
  };

  /*
   * Sends token to given contract (cw20 only)
   */
  const doSendByAddress = async (
    tokenAddress: string,
    tokenCodeHash: string,
    tokenAmount: string,
    contractAddress: string,
    msg: string,
    gasValue?: string | undefined
  ) => {
    const sendResponse = await cw20Token.doSendByAddress(
      tokenAddress,
      tokenCodeHash,
      tokenAmount,
      contractAddress,
      msg,
      gasValue
    );
    return sendResponse;
  };

  /*
   * Increase token allowance for given contract address (cw20 only)
   */
  const doIncreaseAllowance = async (
    tokenName: string,
    tokenAmount: string,
    contractAddress: string,
    gasValue?: string | undefined
  ) => {
    if (tokenName === baseDenom) {
      // native token
      throw new Error(
        `Increase allowance not allowed for native token ${tokenName}`
      );
    } else {
      // cw20 token
      const incAllowanceResponse = await cw20Token.doIncreaseAllowance(
        tokenName,
        tokenAmount,
        contractAddress,
        gasValue
      );
      return incAllowanceResponse;
    }
  };

  return {
    getBalance,
    getBalanceByAddress,
    getSupplyByAddress,
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
