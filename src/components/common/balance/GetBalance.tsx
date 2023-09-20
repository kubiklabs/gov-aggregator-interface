import React, { useEffect, useState, useRef } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useToken } from "../../../hooks/useToken";
import RefreshBalance from "./RefreshBalance";
import "./balances.css";

const GetBalance = (asset: any) => {
  const { getBalance } = useToken();
  const [isLoading, setIsLoading] = useState(false);
  const [activeCoinBalance, setActiveCoinBalance] = useState<any>();
  // const isLoading = useRef<boolean>(false);

  useEffect(() => {
    fetchBalance(false);
  }, []);

  const fetchBalance = async (isRefreshing?: boolean) => {
    setIsLoading(true);
    const balance = await getBalance(asset.token);
    setActiveCoinBalance(balance);
    setIsLoading(false);
    // console.log(activeCoinBalance);
  };

  const handleCreateViewingKey = async () => {
    setIsLoading(true);
    getBalance(asset.token);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <PulseLoader
          color="#A69CAC"
          loading={true}
          // cssOverride={override}
          size={10}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : activeCoinBalance === null ? (
        <span className="get-balance-button" onClick={handleCreateViewingKey}>
          Get Balance
        </span>
      ) : (
        <>
          <span className="wallet-balance numeric-font">
            {(activeCoinBalance * 1.0).toFixed(4)}
            {/* <RefreshBalance
              token={asset.token}
              onClick={() => fetchBalance(true)}
            /> */}
          </span>
        </>
      )}
    </>
  );
};

export default GetBalance;
