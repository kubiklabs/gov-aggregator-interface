import React from "react";
import NavigationLink from "../buttons/NavigationLink";
import NavigationButton from "../buttons/NavigationButton";
import {
  faDroplet,
  faRightLeft,
  faPlug,
  faArrowsSplitUpAndLeft
} from "@fortawesome/free-solid-svg-icons";

const NavLinks = () => {
  return (
    <div className="navlinks-container">
      <NavigationButton
        icon={faPlug}
        name={"Mars adapter"}
        pathName="/"
      />
      {/* <NavigationButton
        icon={faMoneyBill}
        name={"Withdraw"}
        pathName="/withdraw"
      />
      <NavigationButton
        icon={faAward}
        name={"Claim rewards"}
        pathName="/rewards"
      /> */}
      <NavigationButton
        icon={faArrowsSplitUpAndLeft}
        name={"Split/merge"}
        pathName="/split"
      />
      <NavigationButton
        icon={faDroplet}
        name={"Liquidity"}
        pathName="/stats"
      />
      <NavigationButton
        icon={faRightLeft}
        name={"Swap"}
        pathName="/stats"
      />
    </div>
  );
};

export default NavLinks;
