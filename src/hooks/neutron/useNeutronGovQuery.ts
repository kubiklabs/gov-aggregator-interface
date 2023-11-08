import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useEffect, useState } from "react";
// import { neutronSingleProposal } from "../../../config/chains/Neutron/contracts/SingleProposalModule";
import { parseNanosecondTimeString, sleep } from "../../utils/common";
import { ILpCardProps } from "../../components/contract/ProposalList";
// import { neutronVotingModule } from "../../../config/chains/Neutron/contracts/VotingModule";
import { useRecoilState, useRecoilValue } from "recoil";
// import { userVpState } from "../../../context/userVpState";
import { walletState } from "../../context/walletState";
import DAO_DATA from "../../config/dao_config.json";

export const useNeutronGovQuery = (daoId: string) => {
  const [queryClient, setQueryClient] = useState<CosmWasmClient>();
  const [proposals, setProposals] = useState<any[]>([]);
  // const [vpState, setVpState] = useRecoilState(userVpState);
  const address = useRecoilValue(walletState);
  const { single_proposal, voting_module } =
    DAO_DATA[daoId as keyof typeof DAO_DATA];

  useEffect(() => {
    createQueryClient();
  }, []);

  const createQueryClient = async () => {
    const queryClient = await CosmWasmClient.connect(
      "http://45.250.253.23:26657"
    );
    setQueryClient(queryClient);
    return queryClient;
  };

  const getNeutronProposals = async () => {
    let client = queryClient;
    if (!client) {
      client = await createQueryClient();
    }

    const response = await client?.queryContractSmart(single_proposal, {
      list_proposals: {},
    });
    setProposals(response.proposal);
    return response.proposals;
  };

  const getNeutronProposalById = async (proposalId: string) => {
    let client = queryClient;
    if (!client) {
      client = await createQueryClient();
    }

    const response = await client?.queryContractSmart(single_proposal, {
      proposal: { proposal_id: Number(proposalId) },
    });

    return response;
  };

  const getNeutronTotalBondedTokens = async () => {
    let client = queryClient;
    if (!client) {
      client = await createQueryClient();
    }

    const response = await client?.queryContractSmart(voting_module, {
      total_power_at_height: {},
    });

    return response.power;
  };

  const getNeutronUserDelegations = async (address: string) => {
    let client = queryClient;
    if (!client) {
      client = await createQueryClient();
    }

    const response = await client?.queryContractSmart(voting_module, {
      voting_power_at_height: {
        address: address,
      },
    });

    return response.power;
  };

  const getNeutronVotingPower = async (address: string) => {
    const totalDeposits = await getNeutronTotalBondedTokens();
    const totalUserDelegation = await getNeutronUserDelegations(address);
    const userVp = (
      Number(totalUserDelegation) / Number(totalDeposits)
    ).toFixed(10);
    const votingPower = {
      address,
      amount: {
        amount: totalUserDelegation,
        denom: "NTRN",
      },
      userVotingPower: userVp,
      totalDeposits,
    };
    // const updatedState = { ...vpState, Neutron: votingPower };
    // setVpState(updatedState);
    return votingPower;
  };

  const getNeutronUserVote = async (id: string) => {
    // const address =  ge
    let client = queryClient;
    if (!client) {
      client = await createQueryClient();
    }

    const response = await client?.queryContractSmart(single_proposal, {
      get_vote: {
        proposal_id: Number(id),
        voter: address,
      },
    });
    return response.vote.vote;
  };

  const calculateVoteDistribution = (votes: any) => {
    type Ivotes = typeof votes;
    let totalVotes = 0;
    Object.values(votes).map((vote) => {
      totalVotes += Number(vote);
    });
    return {
      ratio: {
        YES: ((Number(votes["yes"]) / totalVotes) * 100).toLocaleString(),
        NO: ((Number(votes["no"]) / totalVotes) * 100).toLocaleString(),
        ABSTAIN: (
          (Number(votes["abstain"]) / totalVotes) *
          100
        ).toLocaleString(),
      },
      tally: {
        YES: votes.yes,
        NO: votes.no,
        ABSTAIN: votes.abstain,
      },
      totalVotes,
    };
  };

  const calculateNeutronProposalTurnout = (proposal: any) => {
    let totalVotes = 0;
    for (let vote in proposal.votes) {
      totalVotes += Number(proposal.votes[vote]);
    }
    return ((totalVotes / Number(proposal.total_power)) * 100).toLocaleString();
  };

  const getNeutronProposalsList = async () => {
    let parsedProposals: ILpCardProps[] = [];
    let rawProposals: any[] = proposals;

    if (!rawProposals || !rawProposals?.length) {
      rawProposals = await getNeutronProposals();
    }

    (rawProposals as Array<any>)?.forEach((proposal) => {
      const { localeDateOnly, localeTimeOnly } = parseNanosecondTimeString(
        proposal.proposal.expiration.at_time
      );
      const { ratio } = calculateVoteDistribution(proposal.proposal.votes);
      const parsedProposal: ILpCardProps = {
        id: proposal.id,
        title: proposal.proposal.title,
        tags: ["Neutron"],
        status: proposal.proposal.status,
        // voteDistribution: ratio,
        endDate: localeDateOnly,
        endTime: localeTimeOnly,
      };
      parsedProposals.push(parsedProposal);
    });

    return parsedProposals.reverse();
  };

  const getNeutronLpList = async () => {
    const lpList = (await getNeutronProposalsList()).filter(
      (proposal) => proposal.status === "open"
    );
    return lpList;
  };

  const getNeutronOpList = async () => {
    const opList = (await getNeutronProposalsList()).filter(
      (proposal) => proposal.status !== "open"
    );
    return opList;
  };

  const getParsedNeutronProposal = async (proposalId: string) => {
    const { id, proposal } = await getNeutronProposalById(proposalId);
    const turnout = calculateNeutronProposalTurnout(proposal);
    const voteDistribution = calculateVoteDistribution(proposal.votes);
    const { localeStringFormat } = parseNanosecondTimeString(
      proposal.expiration.at_time
    );

    const parsedProposal = {
      id,
      title: proposal.title,
      status: proposal.status,
      description: proposal.description,
      voteDistribution,
      votingEndTime: localeStringFormat,
      totalDeposit: null,
      denom: {
        pretty: "NTRN",
        denom: "untrn",
      },
      turnout,
      threshold: "40",
      yesVotes: voteDistribution.ratio.YES,
      quorom: 0.1,
    };
    return parsedProposal;
  };

  return {
    createQueryClient,
    getNeutronProposals,
    getNeutronProposalsList,
    getNeutronLpList,
    getNeutronOpList,
    getParsedNeutronProposal,
    getNeutronVotingPower,
    getNeutronUserVote,
  };
};
