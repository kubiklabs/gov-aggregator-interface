import { atom } from "recoil";

export const userVpState = atom<{
  [daoId: string]: any;
}>({
  key: "userVpState",
  default: {},
});
