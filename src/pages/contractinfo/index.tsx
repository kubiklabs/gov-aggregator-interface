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
  const [assets, setAssets] = useState<any>();

  const [poolInfoList, setPoolInfoList] = useState<IParsedPoolInfo[]>([]);
  const { getNeutronProposalsList } = useNeutronGovQuery(daoId as string);
  const { getAllBalances, getParsedAssets } = useAssets(daoId as string);
  const { getParsedPoolList } = useCommunityPools();

  useEffect(() => {
    fetchData();
  }, [daoId]);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getNeutronProposalsList();
    setProposals(data);
    const poolList = await getParsedPoolList(chains);
    setPoolInfoList(poolList);
    const assetList = await getParsedAssets();
    setAssets(assetList);
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
          {<ProposalList proposals={proposals} />}
          {<Treasury assetList={assets} />}
        </>
      )}
    </Stack>
  );
};

export default ContractInfo;
