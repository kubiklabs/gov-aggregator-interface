import React from "react";
import { useToken } from "../../../hooks/useToken";

const RefreshBalance = ({
  token,
  onClick,
}: {
  token: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div className="refresh-balance-wrapper" onClick={onClick}>
      <span className="material-symbols-outlined">refresh</span>
    </div>
  );
};

export default RefreshBalance;
