import {
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Section from "../../components/common/layout/Section";
import { useGovernance } from "../../hooks/useGovernance";
import { useParams } from "react-router-dom";
import DAO_LIST from "../../config/dao_config.json";
import CHAIN_LIST from "../../config/chain_config.json";
import Card from "../../components/common/DataDisplay/Card";
import LoadingModal from "../../components/common/loading-modal/LoadingModal";
import { log } from "console";

const NewProposal = () => {
  const { daoId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [chains, setChain] = useState<string[]>([]);

  const { addGovProposal } = useGovernance(daoId as string);

  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const { title, description, action, amount } = e.target;

    const amounts = [];
    for (const value of amount.values()) {
      if (value.disabled) continue;
      amounts.push({ amount: value.value, chainId: value.id });
    }

    const value = {
      title: title.value,
      description: description.value,
      action: action.value,
      chainIds: chains,
      amounts,
    };
    console.log(value);
    await addGovProposal({ ...value });
    setIsLoading(false);
  };

  const onChangeChain = (e: any) => {
    console.log(e);
    setChain(e);
  };

  return (
    <Section gap="30px" heading="Create New Proposal">
      <Card padding="50px 70px">
        <form onSubmit={onFormSubmit}>
          <Stack mb={"25px"} gap={"35px"}>
            <Stack>
              <FormControl color={"white"}>
                <FormLabel fontSize={"1.5rem"} htmlFor="proposal-title">
                  Title
                </FormLabel>
                <Input required name="title" id="proposal-title" />
              </FormControl>
            </Stack>
            <Stack>
              <FormLabel fontSize={"1.5rem"} htmlFor="proposal-description">
                Description
              </FormLabel>
              <Textarea required name="description" id="proposal-description" />
            </Stack>
            <Stack>
              <FormControl isRequired>
                <FormLabel requiredIndicator={<></>} fontSize={"1.5rem"}>
                  Select Action
                </FormLabel>
                <RadioGroup
                  aria-required
                  colorScheme={"green"}
                  name="action"
                  size={"lg"}
                  id="action"
                >
                  <Stack spacing={4} direction="row">
                    <Radio value="propose_fund">Propose Fund</Radio>
                    <Radio value="bring_remote_fund">Bring Remote Fund</Radio>
                    <Radio value="send_remote_fund">Send Remote Fund</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </Stack>
            <Stack>
              <FormControl isInvalid={!chains.length}>
                <FormLabel fontSize={"1.5rem"}>Select Chain</FormLabel>
                <CheckboxGroup colorScheme="green" onChange={onChangeChain}>
                  <Stack spacing={[1, 5]} direction={["column", "row"]}>
                    {DAO_LIST[daoId as keyof typeof DAO_LIST].chains.map(
                      (chainId) => {
                        return <Checkbox value={chainId}>{chainId}</Checkbox>;
                      }
                    )}
                  </Stack>
                </CheckboxGroup>
                {chains.length ? (
                  <FormHelperText textAlign={"left"}>
                    Select at least one chain
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>Select at least one chain</FormErrorMessage>
                )}
              </FormControl>
            </Stack>
            <Stack>
              <FormLabel fontSize={"1.5rem"}>Enter Amount</FormLabel>
              {DAO_LIST[daoId as keyof typeof DAO_LIST].chains.map(
                (chainId, index) => {
                  return (
                    <NumberInput
                      isDisabled={!chains.find((chain) => chain === chainId)}
                    >
                      <NumberInputField
                        id={chainId}
                        placeholder={
                          CHAIN_LIST[chainId as keyof typeof CHAIN_LIST].denom
                        }
                        required
                        name={`amount`}
                      />
                    </NumberInput>
                  );
                }
              )}
            </Stack>
          </Stack>
          <Flex justifyContent={"space-between"}>
            {/* <ButtonGroup color={"white"}>
              <Button
                _hover={{
                  bg: "#164242",
                }}
                color={"white"}
                variant={"outline"}
              >
                Save Draft
              </Button>
              <Button
                _hover={{
                  bg: "#164242",
                }}
                color={"white"}
                variant={"outline"}
              >
                Preview
              </Button>
            </ButtonGroup> */}
            <Button
              bg={"#09a758"}
              _hover={{
                bg: "#164242",
              }}
              type="submit"
              color={"white"}
              variant={"outline"}
              borderColor={"#09a758"}
            >
              Publish
            </Button>{" "}
          </Flex>
        </form>
      </Card>
      <LoadingModal isOpen={isLoading} content={["Creating a New Proposal"]} />
    </Section>
  );
};

export default NewProposal;
