import { useContext, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useRecoilValue } from "recoil";
import bjuno from "../../../../assets/img/bjuno.png";

import juno from "../../../../assets/img/juno.png";
import sejuno from "../../../../assets/img/sejuno.png";
// import seArch from "../../../../assets/img/seARCH_logo.png";
// import bArch from "../../../../assets/img/bconst_logo.png";
// import arch from "../../../../assets/img/Archway_logo.png";
import seINJ from "../../../../assets/img/seINJ.png";
import bINJ from "../../../../assets/img/bINJ.png";
import INJ from "../../../../assets/img/INJ.png";
// import WalkthroughBubble from "../../components/walkthrough-comp/WalkthroughBubble";
// import { UserContext } from "../../context/user-context";
import { networkConstants } from "../../../../utils/constants";
import InfoBubble from "../../information/InfoBubble";
import { walletState } from "../../../../context/walletState";
import "./Balances.css";
import { queryClientState } from "../../../../context/queryClientState";
import { useToken } from "../../../../hooks/useToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { networkState } from "../../../../context/networkState";
import GetBalance from "../../balance/GetBalance";
import { coinConvert } from "../../../../utils/common";

function Balances() {
  const { address, balance } = useRecoilValue(walletState);

  const [unstakingAmount, setUnstakingAmount] = useState<string | undefined>(
    ""
  );
  const [unstakedAmount, setUnstakedAmount] = useState<string | undefined>("");

  const [seTokenBalance, setSeTokenBalance] = useState("");
  const [bTokenBalance, setBTokenBalance] = useState("");
  const [rate, setRate] = useState(1);
  const [TokenBalance, setTokenBalance] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [totalPending, setTotalPending] = useState("");
  const [activeWindowAmount, setActiveWindowAmount] = useState("");
  const [bTokenClaimAmount, setTokenClaimAmount] = useState("");
  const { queryClient } = useRecoilValue(queryClientState);
  const token = useToken();
  const currentWTPage = 11;
  const [selected, setSelected] = useState(null);

  const { network } = useRecoilValue(networkState);

  const baseDenom = networkConstants[network].baseDenom;
  const baseSymbol = networkConstants[network].baseSymbol;

  const getStakeData = async () => {
    const seBalance = await token.getBalance("se_token");
    const bBalance = await token.getBalance("b_token");
    setSeTokenBalance(seBalance as string);
    setBTokenBalance(bBalance as string);
  };

  const handleSelected = (i: any) =>{
    if(selected === i){
      return setSelected(null);
    }
    setSelected(i);
  }

  useEffect(() => {
    getStakeData();
  }, [queryClient, address]);

  const handleTakeTour = () => {
    //   setIsWalkingThrough(true);
    // setIsModalOpen(false);
  };

  return (
    // <WalkthroughBubble
    //   isOpen={currentWTPage === (address ? 11 : 8)}
    //   placement="left"
    //   content="Enquire your Balances here. This section shows all of the different credits in your account."
    // >
    <div
      className={`balance-container card new-balance-show${
        currentWTPage === (address ? 11 : 8) ? "" : ""
      }`}
    >
      <div>
      <div className="balance-heading " onClick={()=>handleSelected(1)}>
        <div className="balance-asset">
        Assets in Wallet
        {/* make a good css for infoBubble */}
        {/* <InfoBubble edge={true} content="Wallet Balances" /> */}
        </div>
        <div>
        <FontAwesomeIcon icon={faAngleRight} className={selected ===1 ? "angle-down": "angle-right"}/>
        </div>
      </div>
      {/* <div className="balance-logo-wrapper">
      </div> */}
      {!(selected===1) ? <></> : <div >
      <div className="balance-wrapper">
        <div className="logo-balance">
          <div className="stk-balance-wrapper dull">
            <div className="stk-balance">
              {/* {seTokenBalance ? (
                seTokenBalance
              ) : !address ? (
                // <InfoBubble
                //   edge={true}
                //   style={{ right: "0px", top: "-10px" }}
                //   content={`Connect Keplr wallet to see se${baseSymbol} balance`}
                // />
                <></>
              ) : (
                "-"
              )} */}
              <GetBalance token="se_token" fetchBal={()=>{}}/>
            </div>

            <div className="token-name">
            <img src={seINJ} alt="search"/>
              {`se${baseSymbol}`}

              {/* {seTokenBalance && (
                <InfoBubble
                  conversion={true}
                  style={{ right: "-25px", top: "-20px" }}
                  // content={`${Number(seTokenBalance * rate).toFixed(4)} ${baseSymbol}`}
                  content={`${balance?.amount} ${baseSymbol}`}
                />
              )} */}
            </div>
          </div>
        </div>
        <div className="logo-balance">
          <div className="stk-balance-wrapper dull">
            <div className="stk-balance">
              {/* {bTokenBalance ? (
                bTokenBalance
              ) : !address ? (
                // <InfoBubble
                //   edge={true}
                //   style={{ right: "0px", top: "-10px" }}
                //   content={`Connect Keplr wallet to see b${baseSymbol} balance`}
                // />
                <></>
              ) : (
                "-"
              )} */}
              <GetBalance token="b_token" fetchBal={()=>{}}/>
            </div>

            <div className="token-name">
            <img src={bINJ} alt="barch" width={35}/>
              {`b${baseSymbol}`}
              {/* {bTokenBalance && (
                  <InfoBubble
                    conversion={true}
                    style={{ right: "-27px", top: "-20px" }}
                    content={`${Number(bTokenBalance * bTokenRate).toFixed(
                    )} ${baseSymbol}`}
                  />
                )} */}
            </div>
          </div>
        </div>
        <div className="logo-balance">
          <div className="stk-balance-wrapper dull">
            <div className="stk-balance">
              {/* {balance ? (
                balance.amount
              ) : !address ? (
                <InfoBubble
                  edge={true}
                  style={{ right: "0px", top: "-10px" }}
                  content={`Connect Keplr wallet to see ${networkConstants[network].denomConst.tokenSymbol} balance`}
                />
              ) : (
                "-"
              )} */}
              <GetBalance token={baseDenom} fetchBal={()=>{}}/>
            </div>
            <div className="token-name"><img src={INJ} alt="juno" />
            {networkConstants[network].denomConst.tokenSymbol}</div>
          </div>
        </div>
        
        
      </div>
      </div>}
      </div>

      <div className="balance-section">
      <div className="balance-heading " onClick={()=>handleSelected(2)}>
        <div className="balance-asset">
        Unstaking
        {/* make a good css for infoBubble */}
        {/* <InfoBubble edge={true} content="Wallet Balances" /> */}
        </div>
        <div>
        <FontAwesomeIcon icon={faAngleRight} className={selected===2? "angle-down": "angle-right"}/>
        </div>
      </div>
      {/* <div className="balance-logo-wrapper">
      </div> */}
      {!(selected===2) ? <></> : <div >
      <div className="balance-wrapper">
        <div className="logo-balance logo-balance__ready">
          <div className="stk-balance-wrapper dull">
            <div className="stk-balance">
              {unstakingAmount ??
                (!address ? (
                  <InfoBubble
                    edge={true}
                    style={{ right: "0px", top: "-10px" }}
                    content="Connect Keplr wallet to see this balance"
                  />
                ) : (
                  "-"
                ))}
            </div>
            <div className="token-name"><img src={INJ} alt="juno" />
            {networkConstants[network].denomConst.tokenSymbol}</div>
          </div>
        </div>
        <div className="logo-balance logo-balance__ready">
          <div className="stk-balance-wrapper dull">
            <div className="stk-balance">
              {unstakedAmount ??
                (!address ? (
                  <InfoBubble
                    edge={true}
                    style={{ right: "0px", top: "-10px" }}
                    content="Connect Keplr wallet to see this balance"
                  />
                ) : (
                  "-"
                ))}
            </div>
            <div className="token-name"><img src={INJ} alt="juno" />
            Unstaked {networkConstants[network].denomConst.tokenSymbol}</div>
          </div>
        </div>
        {/* <div className="logo-balance logo-balance__ready">
          <div className="stk-balance-wrapper dull">
            <div className="stk-balance">
              {rewards ??
                (!address ? (
                  <InfoBubble
                    edge={true}
                    style={{ right: "0px", top: "-10px" }}
                    content="Connect Keplr wallet to see this balance"
                  />
                ) : (
                  "-"
                ))}
            </div>
            <div className="token-name">b${baseSymbol} rewards</div>
          </div>
        </div> */}
      </div>
      </div>}
      </div>




      <div className="balance-section">
      <div className="balance-heading " onClick={()=>handleSelected(3)}>
        <div className="balance-asset">
        Rewards
        {/* make a good css for infoBubble */}
        {/* <InfoBubble edge={true} content="Wallet Balances" /> */}
        </div>
        <div>
        <FontAwesomeIcon icon={faAngleRight} className={selected===3? "angle-down": "angle-right"}/>
        </div>
      </div>
      {/* <div className="balance-logo-wrapper">
      </div> */}
      </div>
      <ToastContainer style={{ textAlign: "left" }} />
      {/* <button onClick={handleTakeTour} className="tour-btn">
        Take a tour
      </button> */}
    </div>
    // </WalkthroughBubble>
  );
}

export default Balances;
