import { atom } from "recoil";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

export interface Coin {
  readonly denom: string;
  readonly amount: string;
}

export const walletState = atom<{
  client: SigningCosmWasmClient | undefined;
  address: string | undefined;
  shortAddress: string | undefined;
  balance: Coin | undefined;
  nickName: string | undefined;
  isLoggedIn: boolean;
}>({
  key: "walletState",
  default: {
    client: undefined,
    address: undefined,
    shortAddress: undefined,
    balance: {
      amount: "",
      denom: "",
    },
    nickName: undefined,
    isLoggedIn: false,
  },
  dangerouslyAllowMutability: true,
});
