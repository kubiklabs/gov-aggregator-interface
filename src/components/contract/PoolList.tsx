import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Card from "../common/DataDisplay/Card";
import Section from "../common/layout/Section";

const DATA = [
  {
    poolName: "Osmosis",
    fund: "$102,100",
    balance: "9,202,200",
    memberCount: 40,
  },
  {
    poolName: "Osmosis",
    fund: "$102,100",
    balance: "9,202,200",
    memberCount: 40,
  },
  {
    poolName: "Osmosis",
    fund: "$102,100",
    balance: "9,202,200",
    memberCount: 40,
  },
  {
    poolName: "Osmosis",
    fund: "$102,100",
    balance: "9,202,200",
    memberCount: 40,
  },
  {
    poolName: "Osmosis",
    fund: "$102,100",
    balance: "9,202,200",
    memberCount: 40,
  },
];

//Provide a data array in the above format as props

const PoolList = () => {
  return (
    <Section heading="Community Pools">
      <Flex gap={"25px"} maxW={"100%"} overflowX={"auto"}>
        {DATA.map((item) => {
          return (
            <Card minW={"450px"} width={"500px"}>
              <Stack>
                <Box height={"200px"} width={"100%"} overflow={"hidden"}>
                  <Avatar size={"3xl"} />
                </Box>
                <Stack p={"15px"}>
                  <Text size={"1.5rem"}>{item.poolName}</Text>
                  <Stack>
                    <Flex justifyContent={"space-between"}>
                      <Text>Pool Fund</Text>
                      <Text>{item.fund}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"}>
                      <Text>Token Balance</Text>
                      <Text>{item.balance}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"}>
                      <Text>Total Members </Text>
                      <Text>{item.memberCount}</Text>
                    </Flex>
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          );
        })}
      </Flex>
    </Section>
  );
};

export default PoolList;
