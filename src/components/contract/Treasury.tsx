import React from "react";
import Section from "../common/layout/Section";
import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";
import Card from "../common/DataDisplay/Card";
import SubtitleText from "../common/DataDisplay/SubtitleText";

const Treasury = ({ assetList }: { assetList: any[] }) => {
  return (
    <Section heading="Treasury">
      <Stack direction={"row"} flexWrap={"wrap"} gap={"25px"}>
        {!assetList?.length ? (
          <Card fontSize={"1.3rem"} flex={"1"} p="20px" minW={"300px"}>
            There are no Assets in the treasury!
          </Card>
        ) : (
          assetList.map((asset) => {
            return (
              <Card
                key={asset.symbol}
                maxW={"500px"}
                minW={"300px"}
                padding="15px 25px"
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={"15px"}>
                    <Avatar src={asset.logo} />
                    <Text fontSize={"1.3rem"}>{asset.symbol}</Text>
                  </Flex>
                  <Stack alignItems={"flex-end"}>
                    <Text>$ {Number(asset.amountInUsd).toLocaleString()}</Text>
                    <SubtitleText>
                      {Number(asset.tokenAmount).toLocaleString()}{" "}
                      {asset.symbol}
                    </SubtitleText>
                  </Stack>
                </Flex>
              </Card>
            );
          })
        )}
      </Stack>
    </Section>
  );
};

export default Treasury;
