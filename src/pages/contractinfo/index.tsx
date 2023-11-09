import { Center, Spinner, Stack, Text } from "@chakra-ui/react";
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
import Treasury from "../../components/contract/Treasury";
import { useAssets } from "../../hooks/useAssets";

const ContractInfo = () => {
  const { daoId } = useParams();
  const chains = DAO_DATA[daoId as keyof typeof DAO_DATA].chains;

  const [isLoading, setIsLoading] = useState(false);
  const [proposals, setProposals] = useState<any>();
  const [poolInfoList, setPoolInfoList] = useState<IParsedPoolInfo[]>([]);
  const { getNeutronProposalsList } = useNeutronGovQuery(daoId as string);
  const { getAllBalances } = useAssets(daoId as string);
  const { getParsedPoolList } = useCommunityPools();

  useEffect(() => {
    fetchData();
  }, [daoId]);

  const fetchData = async () => {
    getAllBalances();
    setIsLoading(true);
    const data = await getNeutronProposalsList();
    setProposals(data);
    const poolList = await getParsedPoolList(chains);
    console.log(poolList);
    setPoolInfoList(poolList);
    setIsLoading(false);
  };

  return (
    <Stack gap={"50px"}>
      {isLoading ? (
        <Center>
          <Spinner size={"xl"} color="white" />
        </Center>
      ) : (
        <>
          {poolInfoList?.length ? <PoolList pools={poolInfoList} /> : null}
          {proposals?.length ? <ProposalList proposals={proposals} /> : null}
          <Treasury />
        </>
      )}
    </Stack>
  );
};

export default ContractInfo;
