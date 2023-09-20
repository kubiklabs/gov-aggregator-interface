import { atom } from "recoil";

export const responsiveState = atom<{
  first: boolean;
}>({
  key: "responsiveState",
  default: {
    first: false,
  },
  dangerouslyAllowMutability: true,
});
