import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
// import logo from "../../../assets/images/secret_swap_2.png";
import { useConnectWallet } from "../../../hooks/useTxnClient";
import ConnectWalletButton from "../buttons/ConnectWalletButton";
import HeaderSocials from "./socials/socials";
import "./navigation.css";
import TextLogo from "../logo/TextLogo";
import NavLinks from "./NavLinks";
import { useQueryClient } from "../../../hooks/useQueryClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { responsiveState } from "../../../context/responsiveState";
import RightPane from "./rightPane/RightPane";

const NavigationSidebar = () => {
  const [route, setRoute] = useState("");
  const [scroll, setScroll] = useState(0);
  const connectWallet = useConnectWallet();
  const queryClient = useQueryClient();
  const [balanceView, setBalanceView] = useState(false);
  const [active, setActive] = useState(false);

  const setResponsiveState = useSetRecoilState(responsiveState);

  const location = useLocation().pathname;

  useEffect(() => {
    setRoute(location);
    setScroll(window.scrollY);
  }, [location]);

  // Initialising the clients

  useEffect(() => {
    queryClient();
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn || isLoggedIn === "true") {
      connectWallet();
    }
  }, []);

  const balanceToggleHandler = () => {
    setBalanceView(!balanceView);
    // console.log(balanceView);
    setResponsiveState({ first: balanceView });
  };

  return (
    <>
      <div
        className="menuIcon"
        onClick={() => {
          setActive(!active);
        }}
      >
        <div className="menuIcon-icon">
          <FontAwesomeIcon icon={active ? faXmark : faBars} />
        </div>
      </div>
      <div
        className={active ? "ns-outer-container active" : "ns-outer-container"}
      >
        <div className="ns-wrapper">
          <TextLogo />
          {/* <div className="nav-border"></div> */}
          {/* <ConnectWalletButton /> */}
          <div className="nav-border"></div>
          {/* <div className={`balance-button-wrapper`}>
            <div
              className="common-button balance-button"
              onClick={balanceToggleHandler}
            >
              Balances
            </div>
          </div> */}
          <NavLinks />
        </div>
        <div className="ns-wrapper">
          {/* <RightPane /> */}
          <HeaderSocials />
        </div>
      </div>
    </>
  );
};

export default NavigationSidebar;
