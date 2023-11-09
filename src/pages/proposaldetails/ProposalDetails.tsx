import { Box, Button, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import BasicInfo from "../../components/Proposal/BasicInfo";
import VoteSection from "../../components/Proposal/VoteSection";
import Overview from "../../components/Proposal/Overview";
import OtherDetails from "../../components/Proposal/OtherDetails";
import { useParams } from "react-router-dom";
import { useGovernance } from "../../hooks/useGovernance";
import LoadingModal from "../../components/common/loading-modal/LoadingModal";

const ProposalDetails = () => {
  const { daoId, proposalId } = useParams();
  const [proposalData, setProposalData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [isTxnLoading, setIsTxnLoading] = useState(false);
  const { fetchProposalByIdAndName, executeGovProposal } = useGovernance(
    daoId as string
  );

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

  const execute = async () => {
    setIsTxnLoading(true);
    await executeGovProposal(proposalId as string);
    setIsTxnLoading(false);
  };

  return isLoading ? (
    <Spinner width={"3rem"} height="3rem" />
  ) : (
    <Box flexDirection={"column"} display={"flex"} gap={"50px"}>
      <BasicInfo {...proposalData} />
      {proposalData?.status === "passed" ? (
        <Button colorScheme="green" onClick={execute}>
          Execute Proposal
        </Button>
      ) : null}
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
      <LoadingModal
        isOpen={isTxnLoading}
        content={[`Executing proposal with proposal id:`, proposalId as string]}
      />
    </Box>
  );
};

export default ProposalDetails;
