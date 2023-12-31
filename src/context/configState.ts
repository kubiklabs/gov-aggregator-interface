import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import { ChainInfo, contractInfo } from "../types/configTypes";

import osmosisTestnetChainInfo from "../config/osmosis_testnet/chain_info.json";
import osmosisTestnetOtherContracts from "../config/osmosis_testnet/other_contracts.json";

import junoTestnetChainInfo from "../config/juno_testnet/chain_info.json";
import junoTestnetOtherContracts from "../config/juno_testnet/other_contracts.json";
import neutronLocalnetChainInfo from "../config/neutron_localnet/chain_info.json";
const readConfig = () => {
  let network: string = "OsmosisTestnet";
  if (localStorage.getItem("networkState") !== null) {
    network = localStorage.getItem("networkState") as string;
  }

  // TODO: on the drop down menu, apply one method
  // which updates the config recoil state on network selection
  // that reads the network variable from recoil and it reflected in the app

  const chainInfo = neutronLocalnetChainInfo;
  const otherContracts =
    network === "OsmosisTestnet"
      ? osmosisTestnetOtherContracts
      : junoTestnetOtherContracts;

  let otherContractsMap: Record<string, contractInfo> = {};
  Object.entries(otherContracts).forEach(([contractName, value]) => {
    otherContractsMap[contractName] = value;
  });

  return {
    disclaimerSeen: false,
    tourSeen: false,
    chainInfo: chainInfo,
    otherContractsMap: otherContractsMap,
  };
};

export const configState = atom<{
  disclaimerSeen: boolean;
  tourSeen: boolean;
  chainInfo: ChainInfo;
  otherContractsMap: Record<string, contractInfo>;
}>({
  key: "configState",
  default: readConfig(),
  dangerouslyAllowMutability: true,
});
