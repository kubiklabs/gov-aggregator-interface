import { atom } from "recoil";

export const networkState = atom<{
  network: string;
}>({
  key: "networkState",
  // default: {
  //   network: (localStorage.getItem("networkState") !== null)? localStorage.getItem("networkState") as string: "OsmosisTestnet",
  // },
  default: {
    network:"OsmosisTestnet",
  },
  dangerouslyAllowMutability: true,
});
