import { Box } from "@chakra-ui/react";
import SectionHeading from "../DataDisplay/SectionHeading";

const Section = (props: any) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={props.gap || "20px"}
      position={"relative"}
      color={"white"}
    >
      <SectionHeading
        heading={props.heading}
        sideText={props.sideText}
        subtitle={props.subtitle}
      />
      {props.children}
    </Box>
  );
};

export default Section;
