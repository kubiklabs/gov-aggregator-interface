import { Stack } from "@chakra-ui/react";
import React from "react";
import Section from "../../components/common/layout/Section";
import PoolList from "../../components/contract/PoolList";
import ProposalList from "../../components/contract/ProposalList";

const ContractInfo = () => {
  return (
    <Stack gap={"50px"}>
      <PoolList />
      <ProposalList />
    </Stack>
  );
};

export default ContractInfo;
