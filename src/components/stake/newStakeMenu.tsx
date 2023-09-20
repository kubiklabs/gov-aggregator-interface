import { useRecoilValue } from "recoil";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useContext,
} from "react";
import "./stake.css";
import "./convert.css";

import { networkConstants } from "../../utils/constants";
import { walletState } from "../../context/walletState";
import { useConnectWallet } from "../../hooks/useTxnClient";
import CommonButton from "../../components/common/buttons/CommonButton";
import LoadingModal from "../../components/common/loading-modal/LoadingModal";
import { useAdapter } from "../../hooks/useAdapter";
// import StakeInputSlider from "./StakeInputSlider";
import { useToken } from "../../hooks/useToken";
import { queryClientState } from "../../context/queryClientState";

import OSMO from "../../assets/img/osmo.png";
import bINJ from "../../assets/img/osmo.png";
import OSMOmars from "../../assets/img/osmomars.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faCaretDown,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";
import InfoBubble from "../common/information/InfoBubble";
import { useDetectClickOutside } from "react-detect-click-outside";
import { networkState } from "../../context/networkState";
import { coinConvert } from "../../utils/common";

function NewStakeMenu(props: Props) {
  const { queryClient } = useRecoilValue(queryClientState);

  const [seBalance, setSeBalance] = useState("");
  const [bBalance, setBBalance] = useState("");
  const [rate, setRate] = useState("");
  const [bTokenRate, setBTokenRate] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const { network } = useRecoilValue(networkState);

  const denomConst = networkConstants[network].denomConst;
  const baseDenom = networkConstants[network].baseDenom;
  const baseSymbol = networkConstants[network].baseSymbol;

  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  const [eqAmountMessage, setEqAmountMessage] = useState("");
  const [sliderVisibility, setSliderVisibility] = useState(true);
  const [isCheckingAddress, setIsCheckingAddress] = useState(false);
  const [tokenUnit, setTokenUnit] = useState(baseSymbol);
  const [tokenUnitTo, setTokenUnitTo] = useState(denomConst.ybTokenSymbol);
  const [unstakeType, setUnstakeType] = useState("delayed");
  const { address, shortAddress, balance } = useRecoilValue(walletState);
  const connectWallet = useConnectWallet();
  const token = useToken();

  const { getAdapterState, doDeposit, doWithdraw } = useAdapter();

  const ref = useDetectClickOutside({ onTriggered: () => setOpen(false) });
  const [open, setOpen] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [value, setValue] = useState<any>(baseSymbol);
  const [valueTo, setValueTo] = useState<any>(denomConst.ybTokenSymbol);
  const [discarded, setDiscarded] = useState<any>(value);
  const [discardedTo, setDiscardedTo] = useState<any>(valueTo);

  const getStakeData = async () => {
    const seRate = await getAdapterState();
    console.log("seRate: ", seRate);
    setRate(seRate as string);
    setBTokenRate(seRate as string);

    const seBalance = await token.getBalance("factory/osmo1jfxslamnq8au8yz0ak2v765jthp95d5pm3e05f8yers8pdmqyxvql2uhp5/osmomars");
    const bBalance = await token.getBalance("factory/osmo1jfxslamnq8au8yz0ak2v765jthp95d5pm3e05f8yers8pdmqyxvql2uhp5/osmomars");

    setSeBalance(seBalance as string);
    setBBalance(bBalance as string);
  };

  useEffect(() => {
    setPercent(0);
    if (props.name === "Unstake" && (seBalance === "" || seBalance === "0")) {
      setSliderVisibility(false);
    } else {
      setSliderVisibility(true);
    }
    props.setInputAmount("");
    getStakeData();
  }, [queryClient, address]);

  const unstakeTypeHandler = (menu: string) => {
    setUnstakeType(menu);
  };

  const handleChangePercent = (changedPercent: number) => {
    setPercent(changedPercent);
  };

  const doConvertHandler = async () => {
    // if (props.name === "Unstake") {
    //   await doWithdraw(props.inputAmount as string, unit);
    // } else {
    //   await doDeposit(props.inputAmount as string, unit);
    // }
    setIsLoading(true);
    if (valueTo === baseSymbol) {
      const unit = tokenUnit.substring(0, 2);
      await doWithdraw(props.inputAmount as string, unit);
    } else if (value === baseSymbol) {
      const unit = tokenUnitTo.substring(0, 2);
      await doDeposit(props.inputAmount as string, unit);
    } else {
      // convert
      if(value === denomConst.ybTokenSymbol){
        await doDeposit(props.inputAmount as string, "se");
      }
      else{
        await doDeposit(props.inputAmount as string, "b");
      }
    }
    setIsLoading(false);
    getStakeData();
  };

  // const handleChangedInput = (changedInput : string | null){
  //   props.setInputAmount(changedInput)
  // }

  const handleTextInputChange = (e: any) => {
    let curCrtBalance = Number(balance?.amount);
    if (props.name === "Unstake") {
      curCrtBalance = Number(seBalance);
    }
    const val = e.target.value;
    props.setInputAmount(val);
    let percentFig = Math.floor((val * 100) / curCrtBalance);
    if (percentFig > 100) percentFig = 100;
    setPercent(percentFig);
  };

  // const handleSlideChange = (e: any) => {
  //   let curCrtBalance = Number(balance?.amount);
  //   if (props.name === "Unstake") {
  //     if (tokenUnit === denomConst.ybTokenSymbol) {
  //       curCrtBalance = Number(seBalance);
  //     } else {
  //       curCrtBalance = Number(bBalance);
  //     }
  //   }
  //   let val = e.target.valueAsNumber * 0.01 * Number(curCrtBalance);
  //   setPercent(e.target.valueAsNumber);
  //   props.setInputAmount(Number(val.toFixed(6)).toString());
  // };

  const handleMaxClick = () => {
    let curCrtBalance = Number(balance?.amount);
    if (valueTo===baseSymbol) {
      if (tokenUnit === denomConst.ybTokenSymbol) {
        curCrtBalance = Number(seBalance);
      } else {
        curCrtBalance = Number(bBalance);
      }
    }
    if(valueTo !==baseSymbol && value !== baseSymbol){
      if (tokenUnit === denomConst.ybTokenSymbol) {
        curCrtBalance = Number(seBalance);
      } else {
        curCrtBalance = Number(bBalance);
      }
    }
    props.setInputAmount(curCrtBalance.toString());
    setPercent(100);
  };

  const handleSwitchClick = () => {
    const temp = value;
    setDiscarded(valueTo);
    setDiscardedTo(value);
    setValue(valueTo);
    setValueTo(temp);
    const temp2 = tokenUnit;
    setTokenUnit(tokenUnitTo);
    setTokenUnitTo(temp2);
  };

  const getReceiveValue = (): any => {
    let value: any = "";
    if (!props.inputAmount || !Number(rate) || !Number(bTokenRate)) return value;
    if (tokenUnitTo === baseSymbol) {
      value = !(tokenUnit === denomConst.bTokenSymbol)
        ? (Number(props.inputAmount) * Number(rate)).toFixed(5)
        : (Number(props.inputAmount) * Number(bTokenRate)).toFixed(5);
    } else if (tokenUnit === baseSymbol) {
      value = !(tokenUnitTo === denomConst.bTokenSymbol)
        ? (Number(props.inputAmount) / Number(rate)).toFixed(5)
        : (Number(props.inputAmount) / Number(bTokenRate)).toFixed(5);
    } else {
      // convert
      value = !(tokenUnitTo === denomConst.bTokenSymbol)
        ? (Number(props.inputAmount) *Number(bTokenRate) / Number(rate)).toFixed(5)
        : (Number(props.inputAmount) *Number(rate) / Number(bTokenRate)).toFixed(5);
    }
    return value;
  };

  const [swapToken, setSwapToken] = useState(false);

  const handleSwitch = () => {
    handleSwitchClick();
    setSwapToken(!swapToken);
  };

  const handleSelection = () => {};

  const handleChange = async (event: string) => {
    setValue(event);
    setTokenUnit(event);
    setDiscarded(event);
  };
  const handleChangeTo = async (event: string) => {
    setValueTo(event);
    setTokenUnitTo(event);
    setDiscardedTo(event);
  };
  const handleopen = () => {
    // setOpenTo(false);
    // setOpen(!open);
  };
  const handleopenTo = () => {
    // setOpen(false);
    // setOpenTo(!openTo);
  };
  useEffect(() => {
    // setConfigState(readConfig());
  }, [value, valueTo]);

  return (
    <>
      <div className="stake-menu">
        {(
          <>
            <div className="stake-menu-header">
              <div className="stake-menu-heading stake-menu__item">
                {valueTo === baseSymbol
                  ? "Withdraw " + tokenUnit
                  : value === baseSymbol
                  ? props.name
                  : "Convert " + tokenUnit + " To "+ tokenUnitTo}
              </div>
            </div>
            {/* {props.name==='Unstake'&&<InstDelToggle inputAmount={props.inputAmount} onChange={unstakeTypeHandler}/>} */}
            <div className="input-wrapper-container">
              <div className="input-text-wrapper new-input-text-wrapper">
                <div className="stake-input-display">
                  <div
                    className="label-logo-action-wrapper"
                    onClick={handleopen}
                  >
                    <img
                      src={
                        tokenUnit === baseSymbol
                          ? OSMO
                          : tokenUnit === denomConst.ybTokenSymbol
                          ? OSMOmars
                          : bINJ
                      }
                      width={50}
                      alt="img"
                    />
                    {props.name === `Deposit ${denomConst.tokenSymbol}`
                      ? value
                      : props.name}

                    {/* <FontAwesomeIcon
                      className="coinselecticon"
                      icon={faCaretDown}
                    /> */}
                    {open ? (
                      <div className="sortby-menu">
                        {discardedTo !== denomConst.ybTokenSymbol && (
                          <div
                            onClick={() => handleChange(denomConst.ybTokenSymbol)}
                            className={`sortby-input ${
                              value === denomConst.ybTokenSymbol ? "sortby-input__active" : ""
                            }`}
                          >
                            {denomConst.ybTokenSymbol}
                          </div>
                        )}
                        {discardedTo !== denomConst.bTokenSymbol && (
                          <div
                            onClick={() => handleChange(denomConst.bTokenSymbol)}
                            className={`sortby-input ${
                              value === denomConst.bTokenSymbol ? "sortby-input__active" : ""
                            }`}
                          >
                            {denomConst.bTokenSymbol}
                          </div>
                        )}

                        {discardedTo !== baseSymbol && (
                          <div
                            onClick={() => handleChange(baseSymbol)}
                            className={`sortby-input ${
                              value === baseSymbol ? "sortby-input__active" : ""
                            }`}
                          >
                            {baseSymbol}
                          </div>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="stake-input-wrapper new-stake-input-wrapper">
                    <input
                      className="stake-input actual-value"
                      id="stake-juno-input"
                      type="text"
                      autoComplete="off"
                      placeholder={"0.00"}
                      value={props.inputAmount || ""}
                      onChange={(e) => {
                        handleTextInputChange(e);
                      }}
                    />
                    <div className="stake-input-unit">
                      {/* {props.placeholder === denomConst.tokenSymbol
                      ? props.placeholder
                      : tokenUnit} */}
                      {tokenUnit}
                      {/* {denomConst.tokenSymbol} */}
                    </div>
                    <div className="input-warning-meassages">
                      {valueTo === baseSymbol &&
                      Number(props.inputAmount) >
                        (tokenUnit === denomConst.ybTokenSymbol
                          ? Number(seBalance)
                          : Number(bBalance))
                        ? "Insufficient Balance"
                        : null}
                      {(valueTo !== baseSymbol && value !== baseSymbol) &&
                      Number(props.inputAmount) >
                        (tokenUnit === denomConst.ybTokenSymbol
                          ? Number(seBalance)
                          : Number(bBalance))
                        ? "Insufficient Balance"
                        : null}
                      {value === baseSymbol ? (
                        props.inputAmount && Number(props.inputAmount) < 1 ? (
                          `At least 1 ${baseSymbol} should be staked.`
                        ) : Number(props.inputAmount) >
                          Number(balance?.amount) ? (
                          <div>Insufficient Balance</div>
                        ) : null
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* {balance?.amount && sliderVisibility && (
                  <button
                    className="max-btn new-max-btn"
                    onClick={handleMaxClick}
                  >
                    Max
                  </button>
                )} */}
                <label
                  className="input-label stake-label new-stake-label"
                  htmlFor="stake-juno-input"
                >
                  <div className="available-balance-prompt">
                    <p>Balance: </p>
                    <span>
                      {
                        valueTo === baseSymbol
                        ? tokenUnit === denomConst.ybTokenSymbol
                          ? (seBalance ? Number(seBalance) : 0).toFixed(4)
                          : (bBalance ? Number(bBalance) : 0).toFixed(4) || 0
                        : value === baseSymbol ?
                        (balance?.amount
                            ? Number(balance?.amount)
                            : 0
                          ).toFixed(4) || 0
                          :
                          tokenUnit === denomConst.ybTokenSymbol
                          ? (seBalance ? Number(seBalance) : 0).toFixed(4)
                          : (bBalance ? Number(bBalance) : 0).toFixed(4) || 0}
                    </span>
                    <span>
                      {/* {props.placeholder === denomConst.tokenSymbol
                        ? props.placeholder
                        : tokenUnit} */}
                      {value}
                    </span>
                  </div>
                </label>
              </div>
              {/* <div className="scale-balance-wrapper">
      <FontAwesomeIcon icon={faScaleBalanced} /> 
      </div> */}

              {/* <div
                onClick={handleSwitch}
                className={`exchange-arrow-wrapper new-exchange-arrow-wrapper ${
                  swapToken === true ? "exchange-icon-rotate" : ""
                }`}
              >
                <FontAwesomeIcon color="gold" icon={faArrowUp} />
                <FontAwesomeIcon icon={faArrowDown} />
              </div> */}
              <div className="iconDiv">
                <div className="iconContainer" onClick={handleSwitch}>
                  <FontAwesomeIcon className="arrowIcon" icon={faRightLeft} />
                </div>
              </div>

              <div className="input-text-wrapper new-input-text-wrapper receive-value-wrapper">
                <label
                  className="input-label receive-label"
                  htmlFor="correspondingValue"
                ></label>
                <div className="stake-input-display">
                  <div
                    className="label-logo-action-wrapper"
                    onClick={handleopenTo}
                  >
                    <img
                      src={
                        tokenUnitTo === baseSymbol
                          ? OSMO
                          : tokenUnitTo === denomConst.ybTokenSymbol
                          ? OSMOmars
                          : bINJ
                      }
                      width={50}
                      alt="img"
                    />
                    {/* {tokenUnit == denomConst.ybTokenSymbol ? denomConst.ybTokenSymbol : denomConst.bTokenSymbol} */}
                    {valueTo}
                    {/* <FontAwesomeIcon
                      className="coinselecticon"
                      icon={faCaretDown}
                    /> */}
                    {openTo ? (
                      <div className="sortby-menu sortby-menu-To">
                        {discarded !== denomConst.ybTokenSymbol && (
                          <div
                            onClick={() => handleChangeTo(denomConst.ybTokenSymbol)}
                            className={`sortby-input ${
                              valueTo === denomConst.ybTokenSymbol ? "sortby-input__active" : ""
                            }`}
                          >
                            {denomConst.ybTokenSymbol}
                          </div>
                        )}

                        {discarded !== denomConst.bTokenSymbol && (
                          <div
                            onClick={() => handleChangeTo(denomConst.bTokenSymbol)}
                            className={`sortby-input ${
                              valueTo === denomConst.bTokenSymbol ? "sortby-input__active" : ""
                            }`}
                          >
                            {denomConst.bTokenSymbol}
                          </div>
                        )}

                        {discarded !== baseSymbol && (
                          <div
                            onClick={() => handleChangeTo(baseSymbol)}
                            className={`sortby-input ${
                              valueTo === baseSymbol ? "sortby-input__active" : ""
                            }`}
                          >
                            {baseSymbol}
                          </div>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="stake-input-wrapper new-stake-input-wrapper">
                    <input
                      className="stake-input receive-value"
                      id="correspondingValue"
                      type="text"
                      disabled
                      placeholder={"0.00"}
                      value={getReceiveValue()}
                    />
                    <div className="stake-input-unit">
                      {/* {props.name === `Deposit ${denomConst.tokenSymbol}`
                      ? tokenUnit
                      : denomConst.tokenSymbol} */}
                      {tokenUnitTo}
                    </div>
                  </div>
                </div>

                <label
                  className="input-label stake-label new-stake-label"
                  htmlFor="stake-scrt-input"
                >
                  <div className="available-balance-prompt">
                    <p>Balance: </p>
                    <span>
                      {value === baseSymbol
                        ? tokenUnitTo === denomConst.ybTokenSymbol
                          ? (seBalance ? Number(seBalance) : 0).toFixed(4)
                          : (bBalance ? Number(bBalance) : 0).toFixed(4) || 0
                        : valueTo === baseSymbol
                        ? (balance?.amount
                            ? // ? Number(balance?.amount)
                              Number(
                                  balance?.amount as string
                              )
                            : 0
                          ).toFixed(4) || 0
                        : tokenUnitTo === denomConst.ybTokenSymbol
                        ? (seBalance ? Number(seBalance) : 0).toFixed(4)
                        : (bBalance ? Number(bBalance) : 0).toFixed(4) || 0}
                    </span>
                    {/* <div className="icc-balance-wrapper">
                        <div className="wrapper-para">In Wallet</div>:{" "}
                            {!address ? (
                            "-"
                            ) : (
                            <GetBalance
                                // token={activeToken}
                                token={junoUnit}
                                fetchBal={activeCoinBalanceHandler}
                                customCss="height-get-balance"
                                // settokenBal={settoken1bal ? settoken1bal : () => {}}
                            />
                            )}
                    </div> */}
                    <span>
                      {/* {props.placeholder === denomConst.tokenDenom
                        ? props.placeholder
                        : junoUnit} */}
                      {valueTo}
                    </span>
                  </div>
                </label>

              </div>
            </div>

            {props.name === "Unstake" ? (
              <div style={{ marginTop: "10px", color: "white" }}>
                Note: Unstaking takes 28-31 days to complete.
              </div>
            ) : null}

            {/* {balance?.amount && sliderVisibility && (
              // <StakeInputSlider
              //   name={props.name}
              //   tokenUnit={tokenUnit}
              //   percent={percent}
              //   setPercent={handleChangePercent}
              //   seBalance={seBalance}
              //   bBalance={bBalance}
              //   setInputAmount={(e: string) => {
              //     props.setInputAmount(e);
              //   }}
              // />
            )} */}
            <div className="stake-rate new-stake-rate stake-menu__item">
              <div></div>
              <div className="rate-flexbox">
                { (value === baseSymbol || valueTo === baseSymbol) 
                ?
                <>
                  <div className="available-balance-prompt rate-prompt">
                  <span>1</span>{" "}
                  <span>{value === baseSymbol ? valueTo : value}</span>
                </div>
                =
                <div className="available-balance-prompt rate-prompt">
                  <span>
                    {/* {tokenUnit === denomConst.ybTokenSymbol
              ? Number(rate).toFixed(5)
              : Number(bTokenRate).toFixed(6)} */}
                    {value === baseSymbol
                      ? valueTo === denomConst.ybTokenSymbol
                        ? Number(rate).toFixed(5)
                        : Number(bTokenRate).toFixed(6)
                      : value === denomConst.ybTokenSymbol
                      ? Number(rate).toFixed(5)
                      : Number(bTokenRate).toFixed(6)}
                  </span>{" "}
                  <span>{baseSymbol}</span>
                </div>
                </>
                :
                <>
                {value === denomConst.bTokenSymbol &&
            `1 ${denomConst.bTokenSymbol} ≈ ${
              (Number(bTokenRate) / Number(rate)).toLocaleString()
            } ${denomConst.ybTokenSymbol} ≈ ${
              "$" +
              (
                (Number(bTokenRate) / Number(rate)) *
                1
              ).toFixed(5)
            }`}
          {value === denomConst.ybTokenSymbol &&
            ` 1 ${denomConst.ybTokenSymbol} ≈ ${
              (Number(rate) / Number(bTokenRate)).toLocaleString()
            } ${denomConst.bTokenSymbol} ≈ ${
              "$" +
              (
                (Number(rate) / Number(bTokenRate)) *
                1
              ).toFixed(5)
            }`}
            </>
                }
                <InfoBubble
                  style={{ right: "-20px", top: "3px" }}
                  content="Current exchange rate"
                />
              </div>
            </div>
            {address ? (
              <button
                disabled={
                  !address ||
                  !props.inputAmount ||
                  props.inputAmount === "0" ||
                  !bTokenRate ||
                  !rate ||
                  loading ||
                  isCheckingAddress ||
                  (valueTo===baseSymbol &&
                    Number(props.inputAmount) >
                      (tokenUnit === denomConst.ybTokenSymbol
                        ? Number(seBalance)
                        : Number(bBalance))) ||
                  (value===baseSymbol &&
                    Number(props.inputAmount) < 1) ||
                  (value===baseSymbol &&
                    Number(props.inputAmount) > Number(balance?.amount)) ||
                    (
                      (value !==baseSymbol && valueTo !==baseSymbol) &&
                      Number(props.inputAmount) >
                      (tokenUnit === denomConst.ybTokenSymbol
                        ? Number(seBalance)
                        : Number(bBalance))
                    )
                }
                className="stake-btn"
                onClick={doConvertHandler} // TODO
              >
                {isCheckingAddress
                  ? "Validating address..."
                  : loading
                  ? "Loading..."
                  : valueTo === baseSymbol
                  ? "Withdraw " + tokenUnit
                  : value === baseSymbol
                  ? props.name
                  : "Convert"}
                {/* {isCheckingAddress
                  ? "Validating address..."
                  : loading
                  ? "Loading..."
                  : props.name === "Unstake"
                  ? "Withdraw " + tokenUnit
                  : props.name} */}
              </button>
            ) : (
              <CommonButton
                name="Connect Wallet"
                onClick={() => connectWallet()}
                customClass=""
                // disabled={address !== undefined}
              />
            )}
          </>
        )}
      </div>
      {/* <ToastContainer style={{'textAlign':'left'}}/> */}
      <LoadingModal
        isOpen={isloading}
        content={[
          (valueTo !== "CONST" && value !=="CONST")
            ? ("Converting " + props.inputAmount + " " + value)
            : (value === "CONST"? ("Staking " + props.inputAmount+ " " + value)
            :("Unstaking "+ props.inputAmount+ " " + value)
            ),

             "(~ "+getReceiveValue() +" "+ valueTo+" )"
              ,

          eqAmountMessage,
        ]}
      />
    </>
  );
}

type Props = {
  name: string;
  placeholder: string;
  inputAmount: string | null | undefined;
  isConvert: boolean;
  setInputAmount: Dispatch<SetStateAction<string | null | undefined>>;
};

export default NewStakeMenu;
