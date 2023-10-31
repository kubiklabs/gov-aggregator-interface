import React from "react";
import logoTextLight from "../../../assets/img/fixedFiTextLight.png";
import logoTextDark from "../../../assets/img/fixedFiTextDark.png";
import flatwhite from "../../../assets/img/adao-logo.png";
import flatblack from "../../../assets/img/fixedFiLogo.png";
import "./logo.css";
import { useRecoilValue } from "recoil";
import { themeState } from "../../../context/themeState";
import { Text } from "@chakra-ui/react";

const TextLogo = () => {
  const theme = useRecoilValue(themeState);
  return (
    <div className="text-logo-container">
      <img className="text-logo-img" src={flatwhite} />
      <Text fontSize={"1.5rem"}>Interchain DAOs</Text>
      {/* <h3>StakeEasy 2.0</h3> */}
    </div>
  );
};

export default TextLogo;
