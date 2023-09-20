import { useRecoilValue } from "recoil";

import { contractInfo } from "../types/configTypes";
import { configState } from "../context/configState";

export const useConfig = () => {
  const configStore = useRecoilValue(configState);

  /*
   * Returns the flag config from json config
   */
  const getFlags = () => {
    return [];
  };

  /*
   * Returns the contract data for given contractName from json config
   */
  const getOtherContract = (contractName: string): contractInfo => {
    if (!(contractName in configStore.otherContractsMap)) {
      // raise error
      throw new Error(
        `Contract ${contractName} does not exist in contracts list`
      );
    }
    return configStore.otherContractsMap[contractName];
  };

  return {
    getFlags,
    getOtherContract,
  };
};
