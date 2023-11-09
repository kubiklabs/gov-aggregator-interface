import { Avatar, Flex, Grid, Stack, Text } from "@chakra-ui/react";
import Card from "../../components/common/DataDisplay/Card";
import Section from "../../components/common/layout/Section";
import DAO_DATA from "../../config/dao_config.json";
import { getShortHandAddress } from "../../utils/common";
import { useNavigate } from "react-router-dom";
import SubtitleText from "../../components/common/DataDisplay/SubtitleText";
const DaoList = () => {
  const navigate = useNavigate();
  return (
    <Section heading="Overview">
      <Grid
        gap={"20px"}
        // justifyContent={"space-evenly"}
        // gridAutoFlow={"column"}
        gridTemplateColumns={"repeat(auto-fit, minmax(350px, 1fr))"}
      >
        {Object.keys(DAO_DATA).map((id) => {
          const data = DAO_DATA[id as keyof typeof DAO_DATA];
          return (
            <Card
              onClick={() => navigate("/dao/" + id)}
              maxW={"400px"}
              p={"20px"}
              cursor={"pointer"}
              _hover={{
                bg: "#ffffff20",
              }}
            >
              <Stack
                justifyContent={"space-between"}
                height={"100%"}
                gap={"25px"}
              >
                <Stack gap={"5px"}>
                  <Flex justifyContent={"space-between"}>
                    <Flex>
                      {data["chain-logo-uris"].map((src, index) => {
                        return (
                          <Avatar
                            transform={`translateX(${index * -20}px)`}
                            key={index}
                            zIndex={10 - index}
                            size={"md"}
                            src={src}
                          />
                        );
                      })}
                    </Flex>
                    <Text textAlign={"left"} fontSize={"1.5rem"}>
                      #{id} {data.name}
                    </Text>
                  </Flex>
                  <SubtitleText>{data.description}</SubtitleText>
                </Stack>
                <Stack>
                  <Flex justifyContent={"space-between"}>
                    <Text>Dao Core</Text>
                    <Text
                      onClick={() =>
                        navigator.clipboard.writeText(data.core_module)
                      }
                    >
                      {getShortHandAddress(data.core_module)}
                    </Text>
                  </Flex>
                  <Flex justifyContent={"space-between"}>
                    <Text>Voting Module</Text>
                    <Text
                      onClick={() =>
                        navigator.clipboard.writeText(data.voting_module)
                      }
                    >
                      {getShortHandAddress(data.voting_module)}
                    </Text>
                  </Flex>
                  <Flex justifyContent={"space-between"}>
                    <Text>Single Proposal</Text>
                    <Text
                      onClick={() =>
                        navigator.clipboard.writeText(data.single_proposal)
                      }
                    >
                      {getShortHandAddress(data.single_proposal)}
                    </Text>
                  </Flex>
                  <Flex justifyContent={"space-between"}>
                    <Text>ICA Helper</Text>
                    <Text
                      onClick={() =>
                        navigator.clipboard.writeText(data["ica-helper"])
                      }
                    >
                      {getShortHandAddress(data["ica-helper"])}
                    </Text>
                  </Flex>
                </Stack>
              </Stack>
            </Card>
          );
        })}
      </Grid>
    </Section>
  );
};

export default DaoList;
