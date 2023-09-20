import { osmosis } from "osmojs";
import { useSetRecoilState } from "recoil";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";

import { useChainInfo } from "./useChainInfo";
import { queryClientState } from "../context/queryClientState";

export const useQueryClient = () => {
  const setQueryClientState = useSetRecoilState(queryClientState);
  const chainInfo = useChainInfo();

  return async () => {
    const queryClient = await CosmWasmClient.connect(
      chainInfo.getRpcUrl(),
    );
    const osmoClient = await osmosis.ClientFactory.createLCDClient(
      { restEndpoint: chainInfo.getRestUrl() }
    );

    /* successfully update the query client state */
    setQueryClientState({
      queryClient: queryClient,
      osmoClient: osmoClient,
    });
  };
};
