import { Buffer } from "buffer";
import { osmosis } from "osmojs";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { Coin, SecretNetworkClient } from "secretjs";

// const main = async () => {
//    const client = await osmosis.ClientFactory.createLCDClient({ restEndpoint: REST_ENDPOINT });

//    // now you can query the modules
//    const poolInfo = await client.osmosis.gamm.v1beta1.pool({ poolId: "1" });
//    const balance = await client.cosmos.bank.v1beta1.allBalances({ address: 'osmo1addresshere' });
// };

import { useToken } from "./useToken";
import { useConfig } from "./useConfig";
import { defaultGas } from "../utils/constants";
import { coinConvert, sleep } from "../utils/common";
import { walletState } from "../context/walletState";
import { useMessageToaster } from "./useMessageToaster";
import { queryClientState } from "../context/queryClientState";

export const useLiquidity = () => {
  const token = useToken();
  const config = useConfig();
  const toaster = useMessageToaster();
  const { queryClient, osmoClient } = useRecoilValue(queryClientState);
  const { client, address } = useRecoilValue(walletState);

  // const osmoClient = await osmosis.ClientFactory.createLCDClient({ restEndpoint: REST_ENDPOINT });

  const checkQueryClient = async () => {
    console.log("checking", queryClient);
    while (true) {
      if (queryClient === undefined) {
        await sleep(0.2);
      } else {
        break;
      }
    }
  }
  
  const checkTxnClient = async () => {
    while (true) {
      if (client === undefined) {
        await sleep(0.2);
      } else {
        break;
      }
    }
  }
  
  const checkAddressClient = async () => {
    while (true) {
      if (address === undefined) {
        await sleep(0.2);
      } else {
        break;
      }
    }
  }

  /*
   * Returns info of given pool using pool contract
   */
  const getPoolInfo = async (poolName: string) => {
    // console.log("by getpoolinfo", poolName);
    await checkQueryClient();
    const pairQueryClient = new PairQueryContract(
      queryClient as SecretNetworkClient,
      config.getPool(poolName).contract_addr,
      config.getPool(poolName).contract_code_hash
    );
    try {
      const cumulativePrices = await pairQueryClient.cumulativePrices();
      const share = await pairQueryClient.share({amount: "35355"});
      const poolResponse = await pairQueryClient.pool();

      return poolResponse;
    } catch (error) {
      console.debug(error);
      return;
    }
  };

  /*
   * Returns total amount in given pool using pool contract
   */
  const getPoolTotalAmount = async (
    poolName: string
  ): Promise<{
    firstTokenAmount: string,
    secondTokenAmount: string,
    totalAmount: string,
    lpTokenAmount: string,
  }> => {
    // console.log("by getpooltotalamount", poolName);
    await checkQueryClient();
    const pairQueryClient = new PairQueryContract(
      queryClient as SecretNetworkClient,
      config.getPool(poolName).contract_addr,
      config.getPool(poolName).contract_code_hash
    );
    const { lpAddress, lpCodeHash } = config.getPoolsLPAsset(poolName);
    try {
      const poolResponse = await pairQueryClient.pool();
      
      const firstTokenAmount  = coinConvert(poolResponse.assets[0].amount, 6, "human");
      const secondTokenAmount = coinConvert(poolResponse.assets[1].amount, 6, "human");
      const lpTokenAmount = await token.getSupplyByAddress(lpAddress, lpCodeHash) as string;

      let totalAmount = 0;
      try {
        const firstTokenPrice = parseFloat(await config.getAssetPrice(
          config.getPoolsFirstAsset(poolName).display_denom
        ));
        totalAmount += (parseFloat(firstTokenAmount)*firstTokenPrice);
      } catch (error) {
        console.debug(error);
      }
      try {
        const secondTokenPrice = parseFloat(await config.getAssetPrice(
          config.getPoolsSecondAsset(poolName).display_denom
        ));
        totalAmount += (parseFloat(secondTokenAmount)*secondTokenPrice);
      } catch (error) {
        console.debug(error);
      }

      return {
        firstTokenAmount: firstTokenAmount,
        secondTokenAmount: secondTokenAmount,
        totalAmount: (totalAmount.toFixed(4)),
        lpTokenAmount: lpTokenAmount,
      };
    } catch (error) {
      console.debug(error);
      return {
        firstTokenAmount: "0",
        secondTokenAmount: "0",
        totalAmount: "0",
        lpTokenAmount: "0",
      };
    }
  };

  /*
   * Returns user's amount in given pool using pool contract
   */
  const getPoolUserAmount = async (
    poolName: string,
  ): Promise<{
    firstTokenAmountUser: string,
    secondTokenAmountUser: string,
    userAmount: string,
    lpBalance: string,
    lpSupply: string,
  }> => {
    // console.log("by getpooluseramount", poolName);
    await checkQueryClient();
    await checkAddressClient();
    try {
      const { lpAddress, lpCodeHash } = config.getPoolsLPAsset(poolName);

      const lpBalance = parseFloat(
        await token.getBalanceByAddress(lpAddress, lpCodeHash) as string
      );
      const lpSupply = parseFloat(
        await token.getSupplyByAddress(lpAddress, lpCodeHash) as string
      );
      const {userLpBonded} = await getPoolUserBonded(poolName);

      const lpRatio = (lpBalance+Number(userLpBonded))/lpSupply;
      const { firstTokenAmount, secondTokenAmount, totalAmount } = await getPoolTotalAmount(poolName);

      // add the bonded LP to wallet balance LP if non-zero
      let totalHolding = Number(totalAmount);
      const userAmount = lpRatio*totalHolding;

      const firstTokenAmountUser = lpRatio*parseFloat(firstTokenAmount as string);
      const secondTokenAmountUser = lpRatio*parseFloat(secondTokenAmount as string);

      return {
        firstTokenAmountUser: firstTokenAmountUser.toFixed(4),
        secondTokenAmountUser: secondTokenAmountUser.toFixed(4),
        userAmount: (userAmount.toFixed(4)),
        lpBalance: lpBalance.toFixed(4),
        lpSupply: lpSupply.toFixed(4),
      };
    } catch (error) {
      console.debug(error);
      return {
        firstTokenAmountUser: "0",
        secondTokenAmountUser: "0",
        userAmount: "0",
        lpBalance: "0",
        lpSupply: "0"
      };
    }
  };

  // /*
  //  * Returns reward APR of given pool using generator contract
  //  */
  // const getPoolAPR = async (poolName: string): Promise<{
  //   apr: string,
  // }> => {
  //   // console.log("by getpoolapr", poolName);
  //   await checkQueryClient();

  //   try {
  //     // (reward_tokens_per_block)*(blocks_per_year)*(usd_value_of_token)

  //     const poolInfoResponse = await generatorQueryClient.poolInfo({
  //       lpToken: [
  //         config.getPoolsLPAsset(poolName).lpAddress,
  //         config.getPoolsLPAsset(poolName).lpCodeHash,
  //       ],
  //     });

  //     const rewardTokensPerBlock = coinConvert(
  //       poolInfoResponse.astro_tokens_per_block,
  //       6,
  //       "human",
  //     );
  //     const blocksPerYr = blocksPerYear();
  //     const usdValueOfToken = 1.0;

  //     const interest = parseFloat(rewardTokensPerBlock)*blocksPerYr*usdValueOfToken;

  //     // TODO: get bonded LP amount instead of deposit amount
  //     const poolTotalBonded = await getPoolTotalBonded(poolName);

  //     const firstToken = config.getPoolsFirstAsset(poolName);
  //     const secondToken = config.getPoolsSecondAsset(poolName);
  //     const firstTokenPrice = await config.getAssetPrice(firstToken.display_denom);
  //     const secondTokenPrice = await config.getAssetPrice(secondToken.display_denom);

  //     const totalValueBonded = (
  //       (parseFloat(poolTotalBonded.firstTokenAmount)*parseFloat(firstTokenPrice))
  //       + (parseFloat(poolTotalBonded.secondTokenAmount)*parseFloat(secondTokenPrice))
  //     );

  //     // console.log("interest: ", poolName, rewardTokensPerBlock, blocksPerYr, usdValueOfToken);
  //     // console.log("totalValueBonded: ", poolName, interest, totalValueBonded);

  //     return {
  //       apr: ((interest/totalValueBonded)*100.0).toFixed(2),
  //     };
  //   } catch (error) {
  //     console.debug(error);
  //     return {
  //       apr: "0",
  //     };
  //   }
  // }

  /*
   * Adds user's liquidity to pair contract
   */
  const doAddLiquidity = async (
    poolName: string,
    token1Amount: string,
    token2Amount: string,
    slippagePercentage: string,
    gasValue?: string | undefined,
  ) => {
    await checkTxnClient();
    const tid = "Request Rejected";
    const pairClient = new PairContract(
      client as SecretNetworkClient,
      config.getPool(poolName).contract_addr,
      config.getPool(poolName).contract_code_hash
    );

    const firstToken = config.getPoolsFirstAsset(poolName);
    const secondToken = config.getPoolsSecondAsset(poolName);

    try {
      let transferAmounts: Coin[] = [];
      if (firstToken.native_denom !== null) {
        // native token
        transferAmounts.push({
          amount: coinConvert(token1Amount, 6, "machine"),
          denom: firstToken.native_denom as string,
        });
      } else {
        // snip token
        const firstAllowanceResponse = await token.doIncreaseAllowance(
          firstToken.display_denom,
          token1Amount,
          pairClient.contractAddress
        );
      }

      if (secondToken.native_denom !== null) {
        // native token
        transferAmounts.push({
          amount: coinConvert(token2Amount, 6, "machine"),
          denom: secondToken.native_denom as string,
        });
      } else {
        // snip token
        const secondAllowanceResponse = await token.doIncreaseAllowance(
          secondToken.display_denom,
          token2Amount,
          pairClient.contractAddress
        );
      }
      const addLiquidityResponse = await pairClient.provideLiquidity(
        {
          userAddress: address as string,
          customFees: {
            gas: (gasValue !== undefined)? gasValue: defaultGas.add_liquidity,
            amount: [],
          },
          transferAmount: transferAmounts,
        },
        {
          assets: [
            {
              amount: coinConvert(token1Amount, 6, "machine"),
              info: {
                contract_addr: firstToken.contract_addr,
                contract_code_hash: firstToken.contract_code_hash,
                denom: firstToken.native_denom,
              },
            },
            {
              amount: coinConvert(token2Amount, 6, "machine"),
              info: {
                contract_addr: secondToken.contract_addr,
                contract_code_hash: secondToken.contract_code_hash,
                denom: secondToken.native_denom,
              },
            },
          ],
          autoStake: false,
          slippageTolerance: slippagePercentage,
        }
      );
      if(addLiquidityResponse.code || addLiquidityResponse===undefined){
          toaster.Error("Failed to add liquidity.");
          toaster.Error((addLiquidityResponse.rawLog).substr(0,100) + "...");
        }
      else toast.success(`Added ${token1Amount} ${firstToken.display_denom} and ${token2Amount} ${secondToken.display_denom} to the ${poolName} pool`,{
        type: "success",
      });
      // console.log("addliq res", addLiquidityResponse);
      return addLiquidityResponse;
    } catch (error) {
      console.debug(error);
      toaster.Error("Failed to add liquidity.");
      toast.info(tid, {
        type: "error",
        closeOnClick: true,
        // render: "Request rejected",
        autoClose: 5000,
        isLoading: false,
      });
      if (error instanceof Error) {
        toaster.Error(error.message);
      }
      // return;
    }
  };

  /*
   * Removes user's liquidity from pair contract
   */
  const doRemoveLiquidity = async (
    poolName: string,
    lpTokenAmount: string,
    gasValue?: string | undefined,
  ) => {
    await checkTxnClient();
    const tid = "Request Rejected";
    const pairClient = new PairContract(
      client as SecretNetworkClient,
      config.getPool(poolName).contract_addr,
      config.getPool(poolName).contract_code_hash
    );

    const firstToken = config.getPoolsFirstAsset(poolName);
    const secondToken = config.getPoolsSecondAsset(poolName);

    const totalLiq = await getPoolTotalAmount(poolName);
    const firstTokenRatio = parseFloat(totalLiq.firstTokenAmount)/parseFloat(totalLiq.lpTokenAmount);
    const secondTokenRatio = parseFloat(totalLiq.secondTokenAmount)/parseFloat(totalLiq.lpTokenAmount);

    const firstTokenAmount = firstTokenRatio*parseFloat(lpTokenAmount);
    const secondTokenAmount = secondTokenRatio*parseFloat(lpTokenAmount);

    const { lpAddress, lpCodeHash } = config.getPoolsLPAsset(poolName);
    const withdrawMsg = {
      withdraw_liquidity: {
        assets: [
          {
            amount: (parseInt(coinConvert(firstTokenAmount, 6, "machine"))-2).toString(),
            info: {
              contract_addr: firstToken.contract_addr,
              contract_code_hash: firstToken.contract_code_hash,
              denom: firstToken.native_denom,
            },
          },
          {
            amount: (parseInt(coinConvert(secondTokenAmount, 6, "machine"))-2).toString(),
            info: {
              contract_addr: secondToken.contract_addr,
              contract_code_hash: secondToken.contract_code_hash,
              denom: secondToken.native_denom,
            },
          },
        ],
      },
    };

    try {
      const removeLiquidityResponse = await token.doSendByAddress(
        lpAddress,
        lpCodeHash,
        lpTokenAmount,
        pairClient.contractAddress,
        pairClient.contractCodeHash as string,
        Buffer.from(JSON.stringify(withdrawMsg)).toString("base64"),
        (gasValue !== undefined)? gasValue: defaultGas.remove_liquidity,
      );

      if(removeLiquidityResponse.code || removeLiquidityResponse===undefined){
        toaster.Error("Failed to remove liquidity.");
        toaster.Error((removeLiquidityResponse.rawLog).substr(0,100) + "...");
      }
    else toast.success(`Removed Successfully`,{
      type: "success",
    });

      return removeLiquidityResponse;
    } catch (error) {
      console.debug(error);
      toaster.Error("Failed to remove liquidity.");
      toast.info(tid, {
        type: "error",
        closeOnClick: true,
        // render: "Request rejected",
        autoClose: 5000,
        isLoading: false,
      });
      if (error instanceof Error) {
        toaster.Error(error.message);
      }
      // return;
    }
  };

  return {
    getPoolInfo,
    getPoolTotalAmount,
    getPoolUserAmount,
    // getPoolAPR,
    doAddLiquidity,
    doRemoveLiquidity,
  };
};