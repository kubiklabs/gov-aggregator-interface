import { faBug } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { useRecoilValue } from "recoil";
// import { BalanceToggleContext } from "../../context/balanceToggleContext";
// import { UserContext } from "../../context/user-context";
import Balances from "./Balances";
import { walletState } from "../../../../context/walletState";
// import WalkthroughBubble from "../walkthrough-comp/WalkthroughBubble";
import "./RightPane.css";
import { responsiveState } from "../../../../context/responsiveState";

const RightPane = (props: any) => {
  //   const { currentWTPage } = useContext(UserContext);
  const { address, shortAddress, balance } = useRecoilValue(walletState);
  const [balanceButtonToggle, setBalanceButtonToggle] = useState("");
  //   const { balanceButtonToggle } = useContext(BalanceToggleContext);
  const { first } = useRecoilValue(responsiveState);

  let toggleClass = "";
  // console.log("FIRST: ", first);
  if (
    (window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth <= 768) &&
    first
  ) {
    toggleClass = " balanceToggleClass";
  } else {
    toggleClass = " ";
  }
  return (
    <div
      className={`right-pane-container ${first ? "balanceToggleClass" : ""}`}
    >
      <Balances />
    </div>
  );
};

export default RightPane;
