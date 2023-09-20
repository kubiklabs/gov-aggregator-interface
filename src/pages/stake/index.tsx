import { useRecoilValue } from "recoil";
import { useContext, useEffect } from "react";
// import { BalanceToggleContext } from "../../context/balanceToggleContext";

import StakeComponent from "../../components/stake/StakeComponent/StakeComponent";
import { themeState } from "../../context/themeState";

import "../pages.css";

function Stake() {
  // const { balanceButtonToggle } = useContext(BalanceToggleContext);
  let toggleClass = "";
  const root = document.querySelector(':root');
  const theme = useRecoilValue(themeState);
  useEffect(()=>{
    if(theme === "Light"){
      root?.classList.add('lighttheme')
    }
  },[])

  return (
    <>
      <StakeComponent />
    </>
  );
}

export default Stake;
