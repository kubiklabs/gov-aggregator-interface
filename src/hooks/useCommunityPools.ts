import React from "react";
import DAO_DATA from "../config/dao_config.json";
import CHAIN_DATA from "../config/chain_config.json";
import axios from "axios";
import { log } from "console";
import { coinConvert } from "../utils/common";

export interface IParsedPoolInfo {
  name: string;
  denom: string;
  tokens: string;
  totalFund: number;
  logo_uri: string;
}

const useCommunityPools = () => {
  const getParsedPoolInfo = async (chainId: string) => {
    const { name, denom, coingecko_id, apis, logo_uri, symbol, price } =
      CHAIN_DATA[chainId as keyof typeof CHAIN_DATA];
    try {
      // const price = (
      //   await axios.get(
      //     `https://api.coingecko.com/api/v3/simple/price?ids=${coingecko_id}&vs_currencies=usd`
      //   )
      // ).data[coingecko_id].usd;
      const amount = (
        await axios.get(
          `${apis.rest}/cosmos/distribution/v1beta1/community_pool`
        )
      ).data.pool[0].amount;
      // console.log(amount, coinConvert(parseInt(amount), 6, "human"));
      const parsedPoolInfo: IParsedPoolInfo = {
        name: name,
        denom: symbol,
        tokens: coinConvert(parseInt(amount), 6, "human"),
        totalFund: Number(coinConvert(parseInt(amount), 6, "human")) * price,
        logo_uri,
      };
      return parsedPoolInfo;
    } catch (error) {
      console.log(error);
    }
  };

  const getParsedPoolList = async (chainIds: string[]) => {
    let parsedPoolList: IParsedPoolInfo[] = [];
    try {
      for (const i in chainIds) {
        const id = chainIds[i];
        const poolInfo = await getParsedPoolInfo(id);
        parsedPoolList.push(poolInfo as IParsedPoolInfo);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(parsedPoolList);
    return parsedPoolList;
  };

  return { getParsedPoolInfo, getParsedPoolList };
};

export default useCommunityPools;
