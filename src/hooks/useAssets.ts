import { StargateClient } from "@cosmjs/stargate";
import { useState } from "react";
import DAO_DATA from "../config/dao_config.json";

export const useAssets = (daoId: string) => {
  const dao_core = DAO_DATA[daoId as keyof typeof DAO_DATA].core_module;

  const [stargateClient, setStargateClient] = useState<StargateClient>();

  const createStargateClient = async () => {
    const stClient = await StargateClient.connect(
      "https://rpc-kralum.neutron-1.neutron.org"
    );
    setStargateClient(stClient);
    return stClient;
  };

  const getAllBalances = async () => {
    let stClient = stargateClient;
    if (!stClient) stClient = await createStargateClient();
    let balances = await stClient.getAllBalances(dao_core);
    console.log(balances);
  };

  return { getAllBalances };
};
