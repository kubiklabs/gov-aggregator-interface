import { StargateClient } from "@cosmjs/stargate";
import { useState } from "react";
import DAO_DATA from "../config/dao_config.json";
import ASSET_DATA from "../config/asset_config.json";
import axios from "axios";
import { log } from "console";
import { coinConvert } from "../utils/common";

export const useAssets = (daoId: string) => {
  const dao_core = DAO_DATA[daoId as keyof typeof DAO_DATA].core_module;

  const [stargateClient, setStargateClient] = useState<StargateClient>();

  const createStargateClient = async () => {
    const stClient = await StargateClient.connect("http://45.250.253.23:26657");
    setStargateClient(stClient);
    return stClient;
  };

  const getAllBalances = async () => {
    let stClient = stargateClient;
    try {
      if (!stClient) stClient = await createStargateClient();
      let balances = await stClient.getAllBalances(dao_core);

      // getParsedAssets();
      return balances;
    } catch (error) {}
  };

  const getParsedAssets = async () => {
    let parsedBalances: any[] = [];
    try {
      const balances = await getAllBalances();
      for (const i in balances) {
        const { name, coingecko_id, decimals, denom, icon, symbol } =
          ASSET_DATA[balances[Number(i)].denom as keyof typeof ASSET_DATA];
        const price = (
          await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coingecko_id}&vs_currencies=usd`
          )
        ).data[coingecko_id].usd;

        const parsedBalance = {
          name,
          symbol,
          logo: icon,
          tokenAmount: coinConvert(
            balances[Number(i)].amount,
            decimals,
            "human"
          ),
          amountInUsd:
            Number(coinConvert(balances[Number(i)].amount, decimals, "human")) *
            price,
        };

        parsedBalances.push(parsedBalance);
      }
      return parsedBalances;
    } catch (error) {
      console.log(error);
    }
  };

  return { getAllBalances, getParsedAssets };
};
