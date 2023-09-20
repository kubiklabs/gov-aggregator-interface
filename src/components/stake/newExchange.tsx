import { useState } from "react";
import { networkConstants } from "../../utils/constants";

import "./stake.css";
import NewStakeMenu from "./newStakeMenu";
import { useRecoilValue } from "recoil";
import { networkState } from "../../context/networkState";

function NewExchange() {
  const [stake, setStake] = useState<boolean>(true);
  const [unstake, setUnstake] = useState<boolean>(false);
  const [convert, setConvert] = useState<boolean>(false);
  const [inputAmount, setInputAmount] = useState<string | null>();

  const { network } = useRecoilValue(networkState);

  const stakeMenuHandler = () => {
    setStake(true);
    setUnstake(false);
    setConvert(false);
  };
  const unStakeMenuHandler = () => {
    setStake(false);
    setUnstake(true);
    setConvert(false);
  };
  const convertMenuHandler = () => {
    setStake(false);
    setUnstake(false);
    setConvert(true);
  };

  return (
    <div className="exchange-wrapper new-exchange-wrapper card">
      {/* <div className="stake-menu-btn-wrapper">
        <div
          onClick={stakeMenuHandler}
          className={
            stake ? `stake-menu-btn active-stake-btn` : `stake-menu-btn`
          }
        >
          STAKE
        </div>
        <div
          onClick={unStakeMenuHandler}
          className={
            !unstake ? `stake-menu-btn` : `stake-menu-btn active-stake-btn`
          }
        >
          UNSTAKE
        </div>
        <div
          onClick={convertMenuHandler}
          className={
            !convert ? `stake-menu-btn` : `stake-menu-btn active-stake-btn`
          }
        >
          CONVERT
        </div>
      </div> */}
      {stake ? (
        <NewStakeMenu
          isConvert={convert}
          name={`Deposit ${networkConstants[network].denomConst.tokenSymbol}`}
          placeholder={networkConstants[network].baseDenom}
          inputAmount={inputAmount}
          setInputAmount={(e) => {
            setInputAmount(e);
          }}
        />
      ) : (
        <NewStakeMenu
          isConvert={convert}
          name="Unstake"
          placeholder={networkConstants[network].baseSymbol}
          inputAmount={inputAmount}
          setInputAmount={(e) => {
            setInputAmount(e);
          }}
        />
      )}
    </div>
  );
}

export default NewExchange;
