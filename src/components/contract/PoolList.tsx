import { Avatar, Box, Flex, Grid, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Card from "../common/DataDisplay/Card";
import Section from "../common/layout/Section";
import CHAIN_DATA from "../../config/chain_config.json";
import { log } from "console";
import { IParsedPoolInfo } from "../../hooks/useCommunityPools";
import SubtitleText from "../common/DataDisplay/SubtitleText";

// const DATA = [
//   {
//     poolName: "Osmosis",
//     fund: "$102,100",
//     balance: "9,202,200",
//     memberCount: 40,
//   },
//   {
//     poolName: "Osmosis",
//     fund: "$102,100",
//     balance: "9,202,200",
//     memberCount: 40,
//   },
//   {
//     poolName: "Osmosis",
//     fund: "$102,100",
//     balance: "9,202,200",
//     memberCount: 40,
//   },
//   {
//     poolName: "Osmosis",
//     fund: "$102,100",
//     balance: "9,202,200",
//     memberCount: 40,
//   },
//   {
//     poolName: "Osmosis",
//     fund: "$102,100",
//     balance: "9,202,200",
//     memberCount: 40,
//   },
// ];

//Provide a data array in the above format as props

const PoolList = ({ pools }: { pools: IParsedPoolInfo[] }) => {
  return (
    <Section heading="Community Pools">
      <Stack gap={"25px"} direction={"row"} flexWrap={"wrap"}>
        {pools.map((pool) => {
          const { denom, name, tokens, totalFund, logo_uri } = pool;

          return (
            <Card flex={"1"} maxW={"500px"} minW={"300px"}>
              <Stack>
                <Box height={"200px"} width={"100%"} overflow={"hidden"}>
                  <Image
                    // transform={"translateY(-50px)"}
                    // size={"3xl"}
                    boxSize="100%"
                    objectFit="cover"
                    objectPosition={"0px -15px"}
                    src={logo_uri}
                  />
                </Box>
                <Stack p={"25px"}>
                  <Text fontSize={"1.5rem"}>{name}</Text>
                  <Stack>
                    <Flex justifyContent={"space-between"}>
                      <Text>Pool Fund</Text>
                      <Text>$ {totalFund.toLocaleString()}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"}>
                      <Text>Token Balance</Text>
                      <Flex gap={"10px"}>
                        <SubtitleText>{denom}</SubtitleText>
                        <Text>{Number(tokens).toLocaleString()} </Text>
                      </Flex>
                    </Flex>
                    {/* <Flex justifyContent={"space-between"}>
                      <Text>Total Members </Text>
                      <Text>{7}</Text>
                    </Flex> */}
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          );
        })}
      </Stack>
    </Section>
  );
};

export default PoolList;
