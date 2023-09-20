import { Slide } from "react-toastify";
import { atom } from "recoil";

export const swapState = atom<{
  input1: string;
  // input2: string;
  // swapRate: string;
  slippage: string;
}>({
  key: "swapState",
  default: {
    input1: "",
    // input2: "",
    // swapRate: "",
    slippage: "",
  },
  dangerouslyAllowMutability: true,
});
