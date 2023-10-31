import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import Section from "../../components/common/layout/Section";

const NewProposal = () => {
  const onFormSubmit = (e: any) => {
    e.preventDefault();
    const value = {
      title: e.target.title.value,
      description: e.target.description.value,
    };
    console.log(value);
  };

  return (
    <Section heading="Create New Proposal">
      <FormControl color={"white"}>
        <form onSubmit={onFormSubmit}>
          <FormLabel fontSize={"1.5rem"} htmlFor="proposal-title">
            Title
          </FormLabel>
          <Input name="title" mt={"10px"} mb={"20px"} id="proposal-title" />
          <FormLabel fontSize={"1.5rem"} htmlFor="proposal-description">
            Description
          </FormLabel>
          <Textarea
            name="description"
            mt={"10px"}
            mb={"20px"}
            id="proposal-description"
          />
          <Flex justifyContent={"space-between"}>
            <ButtonGroup color={"white"}>
              <Button color={"white"} variant={"outline"}>
                Save Draft
              </Button>
              <Button color={"white"} variant={"outline"}>
                Preview
              </Button>
            </ButtonGroup>
            <Button type="submit" color={"white"} variant={"outline"}>
              Publish
            </Button>{" "}
          </Flex>
        </form>
      </FormControl>
    </Section>
  );
};

export default NewProposal;
