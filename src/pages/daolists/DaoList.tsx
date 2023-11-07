import { Flex, Grid, Stack, Text } from "@chakra-ui/react";
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
            >
              <Stack>
                <Text textAlign={"left"} fontSize={"2rem"}>
                  #{id} {data.name}
                </Text>
                <SubtitleText>{data.description}</SubtitleText>
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
              </Stack>
            </Card>
          );
        })}
      </Grid>
    </Section>
  );
};

export default DaoList;
