import React from "react";
import logoTextLight from "../../../assets/img/fixedFiTextLight.png";
import logoTextDark from "../../../assets/img/fixedFiTextDark.png";
import flatwhite from "../../../assets/img/fixedFiLogoDark.png";
import flatblack from "../../../assets/img/fixedFiLogo.png";
import "./logo.css";
import { useRecoilValue } from "recoil";
import { themeState } from "../../../context/themeState";

const TextLogo = () => {
  const theme = useRecoilValue(themeState);
  return (
    <div className="text-logo-container">
      <img className="text-logo-img" src={theme === "Dark"?flatblack:flatwhite} />
      <img className="text-logo-title" src={theme === "Dark"?logoTextLight:logoTextDark} />
      {/* <h3>StakeEasy 2.0</h3> */}
    </div>
  );
};

export default TextLogo;
