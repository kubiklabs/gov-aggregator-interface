import { atom } from "recoil";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";

export const queryClientState = atom<{
  queryClient: CosmWasmClient | undefined;
  osmoClient: any,
}>({
  key: "queryClientState",
  default: {
    queryClient: undefined,
    osmoClient: undefined,
  },
  dangerouslyAllowMutability: true,
});
