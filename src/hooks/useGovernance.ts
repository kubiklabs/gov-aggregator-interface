import { useRecoilValue, useSetRecoilState } from "recoil";
// import { useCosmosGovQuery } from "./chains/cosmos/useCosmosGovQuery";
// import { useCosmosGovTxn } from "./chains/cosmos/useCosmosGovTxn";
import { useNeutronGovQuery } from "./neutron/useNeutronGovQuery";
import { useNeutronGovTxn } from "./neutron/useNeutronGovTxn";
// import { useStrideGovQuery } from "./chains/stride/useStrideGovQuery";
// import { useStrideGovTxn } from "./chains/stride/useStrideGovTxn";
import { walletState } from "../context/walletState";
import { userVpState } from "../context/userVpState";
import { log } from "console";
// import { userVpState } from "../context/userVpState";

export const useGovernance = (daoId: string) => {
  const { isLoggedIn, address } = useRecoilValue(walletState);
  const setUserVp = useSetRecoilState(userVpState);
  // const {
  //   getParsedCosmosProposal,
  //   getCosmosTotalBondedToken,
  //   getCosmosVotingPower,
  //   getCosmosUserVote,
  // } = useCosmosGovQuery();
  const {
    getParsedNeutronProposal,
    getNeutronVotingPower,
    getNeutronUserVote,
  } = useNeutronGovQuery(daoId);
  // const { getParsedStrideProposal, getStrideVotingPower, getStrideUserVote } =
  //   useStrideGovQuery();
  // const { sendCosmosVote, getCosmosAddressSigner } = useCosmosGovTxn();
  // const { sendStrideVote, getStrideAddressSigner } = useStrideGovTxn();
  const { sendNeutronVote, addNeutronProposal, executeProposal } =
    useNeutronGovTxn(daoId as string);

  const fetchAllUserVp = async () => {
    if (!isLoggedIn) return;
    // const cosmosVp = await getCosmosVotingPower(Cosmos as string);
    const neutronVp = await getNeutronVotingPower(address as string);
    // const strideVp = await getStrideVotingPower(Stride as string);
    setUserVp((prev) => {
      return {
        ...prev,
        [daoId]: neutronVp,
      };
    });
  };

  const fetchProposalByIdAndName = async (name: string, id: string) => {
    return await getParsedNeutronProposal(id);
  };
  // const fetchTotalBondedToken = async (name: string) => {

  //       return await getCosmosTotalBondedToken();

  // };

  // const fetchVotingPower = async (name: string) => {
  //   const { address } = await getNeutronAddressSigner();
  //   return await getNeutronVotingPower(address);
  // };

  const fetchUserVote = async (name: string, id: string) => {
    return await getNeutronUserVote(id);
  };

  const sendGovVote = async (
    name: string,
    proposalId: string,
    voteOption: string
  ) => {
    return await sendNeutronVote(proposalId, voteOption);
  };

  const addGovProposal = async (data: {
    title: string;
    description: string;
    action: string;
    chainIds: string[];
    amounts: object[];
  }) => {
    const { title, description, action, chainIds, amounts } = data;

    await addNeutronProposal(title, description, action, chainIds, amounts);
  };

  const executeGovProposal = async (proposalId: string) => {
    await executeProposal(proposalId);
  };
  return {
    fetchProposalByIdAndName,
    // fetchTotalBondedToken,
    sendGovVote,
    // fetchVotingPower,
    fetchUserVote,
    fetchAllUserVp,
    addGovProposal,
    executeGovProposal,
  };
};
