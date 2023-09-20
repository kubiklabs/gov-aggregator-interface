import React from "react";
import { useRecoilValue } from "recoil";
import { responsiveState } from "../../../context/responsiveState";
import NewExchange from "../newExchange";

function SplitComponent() {
  const { first } = useRecoilValue(responsiveState);
  return (
    <div className={first ? "wrapper-none" : "wrapper"}>
      <div className="stake-child">
        <NewExchange />
      </div>
    </div>
  );
}

export default SplitComponent;
