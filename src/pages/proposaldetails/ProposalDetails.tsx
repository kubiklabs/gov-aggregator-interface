import { Box, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import BasicInfo from "../../components/Proposal/BasicInfo";
import VoteSection from "../../components/Proposal/VoteSection";
import Overview from "../../components/Proposal/Overview";
import OtherDetails from "../../components/Proposal/OtherDetails";
import { useParams } from "react-router-dom";
import { useGovernance } from "../../hooks/useGovernance";

const ProposalDetails = () => {
  const { daoId, proposalId } = useParams();
  const [proposalData, setProposalData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const { fetchProposalByIdAndName } = useGovernance(daoId as string);

  useEffect(() => {
    fetchProposal();
  }, []);

  const fetchProposal = async () => {
    setIsLoading(true);
    const proposal = await fetchProposalByIdAndName(
      daoId as string,
      proposalId as string
    );
    console.log(proposal);
    setProposalData(proposal);
    setIsLoading(false);
  };

  return isLoading ? (
    <Spinner width={"3rem"} height="3rem" />
  ) : (
    <Box flexDirection={"column"} display={"flex"} gap={"50px"}>
      <BasicInfo {...proposalData} />
      <VoteSection
        prettyDenom={proposalData?.denom.pretty}
        voteDistribution={proposalData && proposalData.voteDistribution}
        status={proposalData?.status}
      />
      <Overview voteDistribution={proposalData?.voteDistribution.ratio} />
      <OtherDetails
        votingEndTime={proposalData?.votingEndTime}
        votingStartTime={proposalData?.votingStartTime}
      />
    </Box>
  );
};

export default ProposalDetails;
