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
        <Button width={"200px"}>New Proposal</Button>
      </Link>
      <Grid
        gap={"20px"}
        // justifyContent={"space-evenly"}
        // gridAutoFlow={"column"}
        gridTemplateColumns={"repeat(auto-fit, minmax(350px, 1fr))"}
      >
        {proposals.map((proposal) => {
          return (
            <GridItem
              onClick={() => {
                navigate(`${pathName}/proposal/${proposal.id}`);
              }}
            >
              <Card cursor={"pointer"} maWidth={"300px"}>
                <Stack>
                  <Box maxH={"250px"} overflow={"hidden"}>
                    <Avatar size={"3xl"} />
                  </Box>
                  <Stack padding={"35px"}>
                    <Flex justifyContent={"space-between"}>
                      <Stack>
                        <Text>
                          #{proposal.id} {proposal.title}
                        </Text>
                        <SubtitleText>
                          voting ends on {proposal.endDate} {proposal.endTime}
                        </SubtitleText>
                      </Stack>
                      <Button
                        color={"white"}
                        bg={"transparent"}
                        border={"1px solid green"}
                        _hover={{
                          border: `1px solid white`,
                        }}
                        height={"40px"}
                      >
                        {proposal.status}
                      </Button>
                    </Flex>
                    <Flex gap={"10px"} flexWrap={"wrap"}>
                      {proposal.tags.map((tag: string) => {
                        return <ColorTag bgColor="purple" content={tag} />;
                      })}
                    </Flex>
                  </Stack>
                </Stack>
              </Card>
            </GridItem>
          );
        })}
      </Grid>
    </Section>
  );
};

export default ProposalList;
