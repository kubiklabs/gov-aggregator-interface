import { Box, Heading, Text } from "@chakra-ui/react";

const SectionHeading = ({
  heading,
  subtitle,
  sideText,
}: {
  heading: string;
  subtitle: string;
  sideText: string;
}) => {
  return (
    <Box
      px={"10px"}
      flexDirection={"column"}
      display={"flex"}
      textAlign={"left"}
      padding={0}
    >
      <Box display={"flex"} gap={"10px"} alignItems={"end"}>
        <Heading size={"xl"} padding={0} margin={"0px"}>
          {heading}
        </Heading>
        <Text margin={"0"} fontSize={"1.5rem"} color={"gray"}>
          {sideText}
        </Text>
      </Box>
      <Box>
        <Text color={"gray"} margin={"0"}>
          {subtitle}
        </Text>
      </Box>
    </Box>
  );
};

export default SectionHeading;
