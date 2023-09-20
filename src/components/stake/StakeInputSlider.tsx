import React from "react";
import { networkConstants } from "../../utils/constants";
import { useRecoilValue } from "recoil";
import { walletState } from "../../context/walletState";
import "./StakeInputSlider.css";
import { networkState } from "../../context/networkState";

function StakeInputSlider(props: any) {
  const { balance } = useRecoilValue(walletState);
  const percent = props.percent;

  const { network } = useRecoilValue(networkState);
  const denomConst = networkConstants[network].denomConst;

  const handleNodeClick = (e: any) => {
    let curCrtBalance = Number(balance?.amount);
    if (props.name === "Unstake") {
      if (props.junoUnit === denomConst.ybTokenSymbol) {
        curCrtBalance = Number(props.seBalance);
      } else {
        curCrtBalance = Number(props.bBalance);
      }
    }
    const id = Number(e.target.id);
    props.setPercent(id);
    let val = id * 0.01 * Number(curCrtBalance);
    props.setInputAmount(Number(val.toFixed(6)).toString());
  };

  const handleSlideChange = (e: any) => {
    let curCrtBalance = Number(balance?.amount);
    if (props.name === "Unstake") {
      if (props.junoUnit === denomConst.ybTokenSymbol) {
        curCrtBalance = Number(props.seBalance);
      } else {
        curCrtBalance = Number(props.bBalance);
      }
    }
    let val = e.target.valueAsNumber * 0.01 * Number(curCrtBalance);
    console.log(curCrtBalance);
    // console.log(e.target.valueAsNumber);
    props.setPercent(e.target.valueAsNumber);
    // console.log(Number(val.toFixed(6)).toString());
    props.setInputAmount(Number(val.toFixed(6)).toString());
  };

  return (
    <div className="input-slider-wrapper">
      <div className="slider-wrapper">
        <div
          id="0"
          className="slider-node node-0"
          onClick={(e) => {
            handleNodeClick(e);
          }}
          style={{
            background: `${percent > 0 ? "rgb(198, 208, 221)" : "grey"}`,
          }}
        ></div>
        <div
          id="25"
          className="slider-node node-25"
          onClick={(e) => {
            handleNodeClick(e);
          }}
          style={{
            background: `${percent > 25 ? "rgb(198, 208, 221)" : "grey"}`,
          }}
        ></div>
        <div
          id="50"
          className="slider-node node-50"
          onClick={(e) => {
            handleNodeClick(e);
          }}
          style={{
            background: `${percent > 50 ? "rgb(198, 208, 221)" : "grey"}`,
          }}
        ></div>
        <div
          id="75"
          className="slider-node node-75"
          onClick={(e) => {
            handleNodeClick(e);
          }}
          style={{
            background: `${percent > 75 ? "rgb(198, 208, 221)" : "grey"}`,
          }}
        ></div>
        <div
          id="100"
          className="slider-node node-100"
          onClick={(e) => {
            handleNodeClick(e);
          }}
          style={{
            background: `${percent > 100 ? "rgb(198, 208, 221)" : "grey"}`,
          }}
        ></div>
      </div>
      <input
        name="percent"
        className="stake-input input-slider"
        value={percent}
        type="range"
        min="0"
        max="100"
        step="1"
        onChange={(e) => {
          handleSlideChange(e);
        }}
        style={{
          background: `linear-gradient(90deg,#f2545b ${percent}%, #a69cac ${percent}%)`,
        }}
      />
      <div className="slider-wrapper">
        <output
          style={{ left: `${percent}%` }}
          className="slider-bubble"
          htmlFor="percent"
        >
          {percent}%
        </output>
      </div>
    </div>
  );
}

export default StakeInputSlider;
