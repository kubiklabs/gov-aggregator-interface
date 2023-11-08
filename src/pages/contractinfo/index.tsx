import { Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PoolList from "../../components/contract/PoolList";
import ProposalList from "../../components/contract/ProposalList";
import { useParams } from "react-router-dom";
import { useNeutronGovQuery } from "../../hooks/neutron/useNeutronGovQuery";
import DAO_DATA from "../../config/dao_config.json";
import useCommunityPools, {
  IParsedPoolInfo,
} from "../../hooks/useCommunityPools";
import { log } from "console";

const ContractInfo = () => {
  const { daoId } = useParams();
  const chains = DAO_DATA[daoId as keyof typeof DAO_DATA].chains;
  const [proposals, setProposals] = useState<any>();
  const [poolInfoList, setPoolInfoList] = useState<any>();
  const { getNeutronProposalsList } = useNeutronGovQuery(daoId as string);
  const { getParsedPoolList } = useCommunityPools();

  useEffect(() => {
    fetchData();
  }, [daoId]);

  const fetchData = async () => {
    const data = await getNeutronProposalsList();
    setProposals(data);
    const poolList = await getParsedPoolList(chains);
    console.log(poolList);
    setPoolInfoList(poolList);
  };

  return (
    <Stack gap={"50px"}>
      <Text>{poolInfoList?.length}</Text>
      {poolInfoList?.length && <PoolList pools={poolInfoList} />}
      {proposals?.length && <ProposalList proposals={proposals} />}
    </Stack>
  );
};

export default ContractInfo;
