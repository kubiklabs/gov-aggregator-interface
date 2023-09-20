import { Slide } from "react-toastify";
import { atom } from "recoil";

export const swapRateState = atom<{
  //   input1: string;
  input2: string;
  swapRate: string;
  //   slippage: string;
}>({
  key: "swapRateState",
  default: {
    // input1: "",
    input2: "",
    swapRate: "",
    // slippage: "",
  },
  dangerouslyAllowMutability: true,
});
