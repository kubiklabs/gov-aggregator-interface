import React from "react";
import "./buttons.css";

export const CoinButton = ({
  id,
  logoUrl,
  displayDenom,
  coinName,
  showName,
  onClick,
}: CoinButtonProps) => {
  return (
    <div onClick={onClick} className="coin-select-input">
      <img className="coin-logo" src={logoUrl} />
      <div className="coin-info">
        <div className="coin-info-denom">{displayDenom}</div>
        {showName && <p className="coin-info-name">{coinName}</p>}
      </div>
    </div>
  );
};

export interface CoinButtonProps {
  id?: string | number;
  logoUrl: string;
  displayDenom: string;
  coinName: string;
  showName: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}
