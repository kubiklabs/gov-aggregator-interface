import { Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Section from "../../components/common/layout/Section";
import PoolList from "../../components/contract/PoolList";
import ProposalList from "../../components/contract/ProposalList";
import { useParams } from "react-router-dom";
import { useNeutronGovQuery } from "../../hooks/neutron/useNeutronGovQuery";
import DAO_DATA from "../../config/dao_config.json";

const ContractInfo = () => {
  const { daoId } = useParams();
  const [proposals, setProposals] = useState<any>();

  const contractAddress =
    DAO_DATA[daoId as keyof typeof DAO_DATA].single_proposal;

  const { getNeutronProposalsList } = useNeutronGovQuery(daoId as string);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getNeutronProposalsList();
    console.log(data);

    setProposals(data);
  };

  return (
    <Stack gap={"50px"}>
      <PoolList />
      {proposals?.length && <ProposalList proposals={proposals} />}
    </Stack>
  );
};

export default ContractInfo;
