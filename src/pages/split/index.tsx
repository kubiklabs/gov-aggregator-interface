import { useRecoilValue } from "recoil";
import { useContext, useEffect } from "react";
// import { BalanceToggleContext } from "../../context/balanceToggleContext";

import SplitComponent from "../../components/split/SplitComponent/SplitComponent";
import { themeState } from "../../context/themeState";

import "../pages.css";

function Split() {
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
      <SplitComponent />
    </>
  );
}

export default Split;
