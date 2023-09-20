import Modal from "react-modal";
import { useRecoilValue } from "recoil";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

// import GetLpViewing from "./GetLpViewing";
// import ManageBondingModal from "./ManageBondingModal";
import { useLiquidity } from "../../hooks/useLiquidity";
import { walletState } from "../../context/walletState";
import { formatCompactNumber } from "../../utils/common";
import ManageLiquidityModal from "./ManageLiquidityModal";
import { queryClientState } from "../../context/queryClientState";

import secretLogo from "../../assets/images/secret_swap_2_logo3.png";

import "./pools.css";

const Poolinfo = () => {
  const location = useLocation();
  const { queryClient } = useRecoilValue(queryClientState);
  const { client, address } = useRecoilValue(walletState);
  const { pairs, token1, token2 } = location.state;
  const [liquidityModal, setliquidityModal] = useState(false);
  const [bondingModal, setBondingModal] = useState(false);

  const {
    getPoolUserAmount,
    getPoolTotalAmount,
    getPoolUserBonded,
    getPoolAPR,
  } = useLiquidity();
  // console.log("am i being called again and again(poolinfo)", pairs.pair_name);
  const [totalLiq, setTotalLiq] = useState("");
  const [userLiq, setUserLiq] = useState("");
  const [firstTAmount, setFirstTokenAmount] = useState("");
  const [firstTAmountUser, setFirstTokenAmountUser] = useState("");
  const [secondTAmount, setSecondTokenAmount] = useState("");
  const [secondTAmountUser, setSecondTokenAmountUser] = useState("");
  const [userBondedAmount, setUserBondedAmount] = useState("");
  const [poolAPR, setPoolAPR] = useState("");
  const [isTotalLoading, setIsTotalLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isBondLoading, setIsBondLoading] = useState(false);
  const [isaprLoading, setIsaprLoading] = useState(false);

  const display = pairs.pair_type === "stable";

  const getUserAmt = async () => {
    setIsUserLoading(true);
    setIsBondLoading(true);
    const { firstTokenAmountUser, secondTokenAmountUser, userAmount } =
      await getPoolUserAmount(pairs.pair_name);
    setUserLiq(userAmount);
    setFirstTokenAmountUser(firstTokenAmountUser);
    setSecondTokenAmountUser(secondTokenAmountUser);
    setIsUserLoading(false);
    setIsBondLoading(false);
  };

  const getUserBondAmt = async () => {
    setIsBondLoading(true);
    const { userDollarBonded } = await getPoolUserBonded(pairs.pair_name);
    if(userLiq){
      if(Number(userDollarBonded)){
        setUserBondedAmount(userDollarBonded);
      }
    }
    setIsBondLoading(false);
  };

  const getaprPool = async () => {
    setIsaprLoading(true);
    const poolAPR = await getPoolAPR(pairs.pair_name);
    // console.log("apr ", poolAPR);
    if(Number(poolAPR.apr)){
      setPoolAPR(poolAPR.apr);
    }
    setIsaprLoading(false);
  };

  const getPools = async () => {
    setIsTotalLoading(true);
    const { firstTokenAmount, secondTokenAmount, totalAmount } =
      await getPoolTotalAmount(pairs.pair_name);
      if(Number(totalAmount)){
        setTotalLiq(totalAmount);
      }
    setFirstTokenAmount(firstTokenAmount);
    setSecondTokenAmount(secondTokenAmount);
    // console.log("total", firstTokenAmount, secondTokenAmount, totalAmount, "end");

    setIsTotalLoading(false);
  };

  useEffect(() => {
    // console.log("reached hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    // getUserAmt();
    // getUserBondAmt();
    // getPools();
    // getaprPool();
  }, []);
  // }, [queryClient]);

  useEffect(()=>{
    getUserBondAmt();
  }, [userLiq])

  useEffect(()=>{
    getUserAmt();
    getUserBondAmt();
    getPools();
    getaprPool();
  }, [address])

  const handlelpViewing = () => {
    getPools();
    getUserAmt();
    getUserBondAmt();
  };

  return (
    <div className="pool-info-page">
      <div className="pool-header-container">
        All Pools {">"}
        {/* <img src={token1?.logo_URIs.png} alt="" height={50}/>
        <img src={token2?.logo_URIs.png} alt="" height={50}/> */}
        {pairs.pair_name}
      </div>
      {display ? (
        <div className="display-tag">
          <span>stable</span>
        </div>
      ) : (
        <></>
      )}
      <div className="poolinfo-container poolinfo-container-image-2 image-container-properties">
        <div>
          <span>Pool Liquidity</span>
          <p>
            {" "}
            $
            {isTotalLoading ? (
              <PulseLoader
                color="#1790FF"
                loading={true}
                // cssOverride={override}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              (formatCompactNumber(totalLiq))
            )}
          </p>
        </div>
        <div>
          <span>Swap Fee</span>
          <p>
            {display ? 0.05 : 0.3}<p className="article-font">%</p>
          </p>
        </div>
        <div>
          <span>Bonding Reward</span>
          <p>
            {isaprLoading ? (
              <PulseLoader
                color="#1790FF"
                loading={true}
                // cssOverride={override}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              Number(poolAPR) ?
              poolAPR :
              "0.00"
            )}
            <p className="article-font">% APR</p>
          </p>
        </div>
        <div>
          <span>Reward Tokens</span>
          <p>
            <img className="text-logo-img" src={secretLogo} />
          </p>
        </div>
      </div>

      <div className="liquidity-asset">
        <div className="poolasset-wrapper">
          <div className="token_info">
            <div>
              {<img src={token1?.logo_URIs.png} alt="NOimg" height={70} />}
            </div>
            <span>{token1.display_denom}</span>
          </div>
          <div className="token1_input pool-asset_info">
            <span>Total amount</span>
            <p>
              {isTotalLoading ? (
                <PulseLoader
                  color="#1790FF"
                  loading={true}
                  // cssOverride={override}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                Number(firstTAmount).toLocaleString("en-US")
              )}{" "}
              <span className="token-unit">{" " + token1.display_denom}</span>
            </p>
            <span>My amount</span>
            <p>
              {isUserLoading ? (
                <PulseLoader
                  color="#1790FF"
                  loading={true}
                  // cssOverride={override}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : 
              (!Number(userLiq) && Number(userLiq) === 0) ||
              Number(userLiq) ?
              (!Number(firstTAmountUser) ? (
                "0.0000"
              ) : (
                Number(firstTAmountUser).toLocaleString("en-US")
              ))
              :
              "-"}
              <span className="token-unit">{" " + token1.display_denom}</span>
            </p>
          </div>
        </div>

        <div className="poolasset-wrapper">
          <div className="token_info">
            <div>
              {<img src={token2?.logo_URIs.png} alt="NOimg" height={70} />}
            </div>
            <span>{token2.display_denom}</span>
          </div>
          <div className="token1_input pool-asset_info">
            <span>Total amount</span>
            <p>
              {isUserLoading ? (
                <PulseLoader
                  color="#1790FF"
                  loading={true}
                  // cssOverride={override}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                Number(secondTAmount).toLocaleString("en-US")
              )}{" "}
              <span className="token-unit">{" " + token2.display_denom}</span>
            </p>
            <span>My amount</span>
            <p>
              {isUserLoading ? (
                <PulseLoader
                  color="#1790FF"
                  loading={true}
                  // cssOverride={override}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : 
              (!Number(userLiq) && Number(userLiq) === 0) ||
                Number(userLiq)?
              (!Number(secondTAmountUser) ? (
                "0.0000"
              ) : (
                Number(secondTAmountUser).toLocaleString("en-US")
              ))
              :
              "-"
              }
              <span className="token-unit">{" " + token2.display_denom}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="pool-info-liquidity">
        <div className="pool-info-holding">
          <div className="pool-info-holding-Top">
            <div className="pool-price-Top">Holdings</div>
            <div className="pool-price">
              {isUserLoading ? (
                <PulseLoader
                  color="#1790FF"
                  loading={true}
                  // cssOverride={override}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (!Number(userLiq) && Number(userLiq) === 0) ||
                Number(userLiq) ? (
                "$ " + Number(userLiq).toLocaleString("en-US")
              ) : (
                // <GetLpViewing
                //   pair={pairs.pair_name}
                //   handlelpViewing={handlelpViewing}
                // />
              )}
            </div>
            <div className="pool-price-below">
              $
              {Number(userLiq)
                ? userBondedAmount
                  ? (Number(userLiq) - Number(userBondedAmount)).toFixed(5)
                  : userLiq
                : "-"}{" "}
              available to bond
            </div>
          </div>
          <div className="pool-info-holding-Bottom">
            {/* <div className="pool-price-Top">Underlying assets</div>
          <div className="pool-token1">
          <img src={token1?.logo_URIs.png} alt="NoImg" height={50}/>
            {token1.display_denom}
            </div>
          <div className="pool-token1">
          <img src={token2?.logo_URIs.png} alt="NoImg" height={50}/>
            {token2.display_denom}
            </div> */}
          </div>
          <div
            className="pool-holding-button"
            onClick={() => {
              setliquidityModal(true);
            }}
          >
            Manage Liquidity
          </div>
        </div>

        <div className="pool-info-holding">
          <div className="pool-info-holding-Top">
            <div className="pool-price-Top">Bonded tokens</div>
            <div className="pool-price">
              {isBondLoading ? (
                <PulseLoader
                  color="#1790FF"
                  loading={true}
                  // cssOverride={override}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              // ) : (!Number(userBondedAmount) &&
              //     Number(userBondedAmount) === 0) ? "$ 0.00" :
              //   Number(userBondedAmount) ? (
              ) : (!Number(userLiq) && Number(userLiq) === 0) ||
              Number(userLiq) ? (
                userBondedAmount ?
                "$ " + Number(userBondedAmount).toLocaleString("en-US")
                :
                "$ 0.0000"
              ) : (
                // <GetLpViewing
                //   pair={pairs.pair_name}
                //   handlelpViewing={handlelpViewing}
                // />
              )}
            </div>
            <div className="pool-price-below">
              Expected interest with {poolAPR}% APR
            </div>
          </div>
          <div className="pool-info-holding-Bottom"></div>
          <div
            className="pool-holding-button"
            onClick={() => {
              setBondingModal(true);
            }}
          >
            Bond Liquidity
          </div>
        </div>
      </div>

      {/* <div className="bottom-container">
          <p>Bond your tokens and start collecting some pooling rewards.</p>
          <p>Rewards every 6 seconds</p>
      </div> */}
      <Modal
        isOpen={liquidityModal}
        onRequestClose={() => setliquidityModal(false)}
        contentLabel="Select Coin"
        className="custom-modal"
      >
        <div className="modal-close-wrapper">
          <span
            onClick={() => setliquidityModal(false)}
            className="material-symbols-outlined modal-close-button"
          >
            close
          </span>
        </div>
        <ManageLiquidityModal setIsModalOpen={setliquidityModal}  isLpLoading1={isUserLoading} userLiq1={userLiq} getUserAmt= {getUserAmt}/>
      </Modal>

      <Modal
        isOpen={bondingModal}
        onRequestClose={() => setBondingModal(false)}
        contentLabel="Select Coin"
        className="custom-modal"
      >
        <div className="modal-close-wrapper">
          <span
            onClick={() => setBondingModal(false)}
            className="material-symbols-outlined modal-close-button"
          >
            close
          </span>
        </div>
        {/* <ManageBondingModal setIsModalOpen={setBondingModal} isLpLoading1={isUserLoading} userLiq1={userLiq} getUserAmt= {getUserAmt} getUserBondAmt={getUserBondAmt}/> */}
      </Modal>
    </div>
  );
};

export default Poolinfo;
