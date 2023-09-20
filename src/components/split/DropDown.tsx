import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState, useEffect} from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useRecoilValue } from "recoil";
import { networkState } from "../../context/networkState";
import { networkConstants } from "../../utils/constants";

const DropDown = ({openbig}: any) =>{
  const ref = useDetectClickOutside({ onTriggered: () => setOpen(false) });
  const [open, setOpen] = useState(false);

  // use this when mainnet is ready too
  // const [value, setValue] = useState<any>(localStorage.getItem("networkState"));

  const { network } = useRecoilValue(networkState);
  const baseSymbol = networkConstants[network].baseSymbol;

  const [value, setValue] = useState<any>(baseSymbol);

  const handleChange = async (event: string) => {
    setValue(event);
  };
  const handleopen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    // setConfigState(readConfig());
  }, []);
  
  return (
    <>
      {open ? (
        <div className="sortby-menu">
          <div
            onClick={() => handleChange(`se${baseSymbol}`)}
            className={`sortby-input ${
              value === `see${baseSymbol}` ? "sortby-input__active" : ""
            }`}
          >
            se{baseSymbol}
          </div>
          <div
            onClick={() => handleChange(`b${baseSymbol}`)}
            className={`sortby-input ${
              value === `b${baseSymbol}` ? "sortby-input__active" : ""
            }`}
          >
            be{baseSymbol}
          </div>
        </div>
      ) : (
        <></>
      )}
      </>
  );
}

export default DropDown;