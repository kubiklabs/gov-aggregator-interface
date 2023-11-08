import React from "react";
import Section from "../common/layout/Section";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import Card from "../common/DataDisplay/Card";
import ColorTag from "../common/DataDisplay/ColorTag";
import SubtitleText from "../common/DataDisplay/SubtitleText";
import { Link, useNavigate } from "react-router-dom";
import { neutronStatusMap } from "../../utils/constants";

export interface ILpCardProps {
  id: string;
  title: string;
  endDate: string;
  endTime: string;
  tags: Array<string>;
  status: string;
}

const ProposalList = ({ proposals }: { proposals: ILpCardProps[] }) => {
  const pathName = window.location.pathname;
  const navigate = useNavigate();

  return (
    <Section heading="Proposals">
      <Link
        style={{
          width: "fit-content",
        }}
        to={`${pathName}/proposal/new`}
      >
        <Button fontWeight={"medium"} width={"150px"}>
          + New Proposal
        </Button>
      </Link>
      <Stack>
        {proposals.map((proposal) => {
          return (
            <Card
              onClick={() => {
                navigate(`${pathName}/proposal/${proposal.id}`);
              }}
              cursor={"pointer"}
              // maxWidth={"300px"}
            >
              <Flex
                justifyContent={"space-between"}
                width={"100%"}
                alignItems={"center"}
                padding={"35px"}
              >
                <Flex
                  gap={"25px"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Text>#{proposal.id}</Text>
                  <Button
                    color={"white"}
                    bg={"transparent"}
                    border={"1px solid"}
                    borderColor={
                      neutronStatusMap[
                        proposal.status as keyof typeof neutronStatusMap
                      ].bg
                    }
                    _hover={{
                      border: `1px solid white`,
                    }}
                    height={"40px"}
                    width={"150px"}
                  >
                    {proposal.status}
                  </Button>
                  <Text>{proposal.title}</Text>
                </Flex>
                <SubtitleText>
                  {proposal.endDate} {proposal.endTime}
                </SubtitleText>
                {/* <Flex gap={"10px"} flexWrap={"wrap"}>
                    {proposal.tags.map((tag: string) => {
                      return <ColorTag bgColor="purple" content={tag} />;
                    })}
                  </Flex> */}
              </Flex>
            </Card>
          );
        })}
      </Stack>
    </Section>
  );
};

export default ProposalList;
