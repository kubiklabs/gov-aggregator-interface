import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useGovernance } from "../../hooks/useGovernance";
import { useParams } from "react-router-dom";
import LoadingModal from "../common/loading-modal/LoadingModal";
import { colorVoteMap } from "../../utils/constants";
import { useNeutronGovTxn } from "../../hooks/neutron/useNeutronGovTxn";
import DAO_DATA from "../../config/dao_config.json";
import CHAIN_DATA from "../../config/chain_config.json";
type IColorVoteMap = typeof colorVoteMap;

const VoteCard = (props: any) => {
  const { daoId } = useParams();
  const { sendNeutronVote } = useNeutronGovTxn(daoId as string);
  const { sendGovVote } = useGovernance(daoId as string);
  const { chain, proposalId } = useParams();
  const [loading, setLoading] = useState(false);

  const handleSendVote = async () => {
    setLoading(true);
    await sendGovVote(chain as string, proposalId as string, props.option);
    setLoading(false);
  };

  return (
    <>
      <Flex
        onClick={!props.disable ? handleSendVote : () => {}}
        p={"30px"}
        borderRadius={"10px"}
        flexDirection={"column"}
        gap={"15px"}
        bg={colorVoteMap[props.option as keyof IColorVoteMap].bg}
        minWidth={"fit-content"}
        transition={"ease-in-out 500ms"}
        border={
          props.vote === props.option
            ? `2px solid ${
                colorVoteMap[props.option as keyof IColorVoteMap].color
              }`
            : ""
        }
        _hover={{
          boxShadow: !props.disable
            ? `-1px -1px 1px ${
                colorVoteMap[props.option as keyof IColorVoteMap].color
              },15px 15px 15px rgba(0, 0, 0, 0.1),inset -5px -5px 5px ${
                colorVoteMap[props.option as keyof IColorVoteMap].color
              },inset 5px 5px 5px rgba(0, 0, 0, 0.1)`
            : "",
          // border: `2px solid ${
          //   colorVoteMap[props.option as keyof IColorVoteMap].color
          // }`,
          cursor: props.disable ? "not-allowed" : "pointer",
        }}
      >
        <Flex gap={"10px"} align={"center"} justifyContent={"space-between"}>
          <Text
            alignSelf={"flex-start"}
            color={colorVoteMap[props.option as keyof IColorVoteMap].color}
            m={"0"}
            fontSize={"1.7rem"}
          >
            {props.option}
          </Text>
          <Text
            fontSize={"1.5rem"}
            color={colorVoteMap[props.option as keyof IColorVoteMap].color}
            m={"0"}
          >
            {props.value}%
          </Text>
        </Flex>
        <Flex
          color={"#bfbfbf"}
          alignSelf={"flex-end"}
          fontSize={"0.9rem"}
          m={"0"}
          gap={"15px"}
        >
          {DAO_DATA[daoId as keyof typeof DAO_DATA].chains.map((id) => {
            const denom = CHAIN_DATA[id as keyof typeof CHAIN_DATA].symbol;
            return (
              <Text
                color={"#bfbfbf"}
                alignSelf={"flex-end"}
                fontSize={"0.9rem"}
                m={"0"}
              >
                {props.tokenAmountUnderVote} {denom}
              </Text>
            );
          })}
        </Flex>
      </Flex>
      <LoadingModal
        isOpen={loading}
        content={["Voting on the Proposal with option", `${props?.option}`]}
      />
      {/* <ModalOverlay isOpen={loading} onClose={() => setLoading(false)}>
        Txn in Progress...
      </ModalOverlay> */}
    </>
  );
};

export default VoteCard;
