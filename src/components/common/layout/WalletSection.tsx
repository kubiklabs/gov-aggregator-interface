import React, { useState, useEffect } from "react";
import { networkState } from "../../../context/networkState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import "./netswitch.css";
import { useNavigate } from "react-router-dom";
import { configState } from "../../../context/configState";

import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ChainInfo,
  contractInfo,
  PoolInfo,
  TokenInfo,
} from "../../../types/configTypes";
import ThemeToggle from "./ThemeToggle";
import WalletAddress from "./walletAddress";
import ConnectWalletButton from "../buttons/ConnectWalletButton";

// import ThemeToggle from "./themeToggle";

const WalletSection = () => {
  const setNetworkState = useSetRecoilState(networkState);
  const navigate = useNavigate();
  const [config, setConfigState] = useRecoilState(configState);
  let { network } = useRecoilValue(networkState);
  const [open, setOpen] = useState(false);

  // use this when mainnet is ready too
  // const [value, setValue] = useState<string>(
  //   (localStorage.getItem("networkState") !== null)
  //     ? localStorage.getItem("networkState") as string: "OsmosisTestnet"
  // );
  const [value, setValue] = useState<string>("Testnet");

  const handleChange = async (event: string) => {
    setValue(event);
    localStorage.setItem("networkState", event);
    setNetworkState({
      network: event,
    });

    navigate("/");
    window.location.reload();
  };
  const handleopen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    // setConfigState(readConfig());
  }, [network]);
  // console.log(value);

  return (
    <div className="dropdown-div">
      {/* <WalletAddress /> */}
      <div className="">
        <ConnectWalletButton />
      </div>
      <ThemeToggle />
      <div className="poolSort network-button disabled-btn-testnet" onClick={()=>{}}>
        <div>
          <FontAwesomeIcon icon={faSort} />
        </div>

        <div>{value}</div>
        {open ? (
          <div className="sortby-menu">
            {/* <div
              onClick={() => handleChange("JunoMainnet")}
              className={`sortby-input ${
                value === "JunoMainnet" ? "sortby-input__active" : ""
              }`}
            >
              JunoMainnet
            </div> */}
            {/* <div
              onClick={() => handleChange("JunoTestnet")}
              className={`sortby-input ${
                value === "JunoTestnet" ? "sortby-input__active" : ""
              }`}
            >
              JunoTestnet
            </div> */}
            <div
              onClick={() => handleChange("OsmosisTestnet")}
              className={`sortby-input ${
                value === "OsmosisTestnet" ? "sortby-input__active" : ""
              }`}
            >
              OsmosisTestnet
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default WalletSection;
