import { Contract, Coin, TxnStdFee } from "./contract";
import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";

export type ExecuteMsg = {
  deposit: {};
} | {
  withdraw: {};
} | {
  advance: {};
} | {
  update_rewards_contract: {
    rewards_contract: Addr;
  };
};
export type Addr = string;
export interface InstantiateMsg {
  epoch_period: number;
  expiry_period: number;
  mars_adapter: Addr;
  principle_denom: string;
  red_bank: Addr;
  underlying_denom: string;
  yield_bearing_denom: string;
  yield_denom: string;
}
export type QueryMsg = {
  user_deposit: {};
} | {
  total_deposit: {};
} | {
  config: {};
} | {
  state: {};
};
export interface ConfigResponse {
  epoch_period: number;
  expiry_period: number;
  mars_adapter: Addr;
  owner: Addr;
  principle_denom: string;
  red_bank: Addr;
  rewards_contract: Addr;
  underlying_denom: string;
  yield_bearing_denom: string;
  yield_denom: string;
}
export type Decimal = string;
export type Uint128 = string;
export interface StateResponse {
  exchange_rate: Decimal;
  p_issued: Uint128;
  y_issued: Uint128;
  yb_deposited: Uint128;
}
export interface TotalDepositResponse {
  yb_deposited: Uint128;
}
export interface UserDepositResponse {
  yb_deposited: Uint128;
}
export interface SplitterReadOnlyInterface {
  userDeposit: () => Promise<any>;
  totalDeposit: () => Promise<any>;
  config: () => Promise<any>;
  state: () => Promise<any>;
}
export class SplitterQueryContract extends Contract implements SplitterReadOnlyInterface {
  constructor(client: CosmWasmClient, contractAddress: string, contractHash?: string) {
    super(client, contractAddress, contractHash);
    this.userDeposit = this.userDeposit.bind(this);
    this.totalDeposit = this.totalDeposit.bind(this);
    this.config = this.config.bind(this);
    this.state = this.state.bind(this);
  }

  userDeposit = async (): Promise<any> => {
    return this.queryMsg({
      user_deposit: {}
    });
  };
  totalDeposit = async (): Promise<any> => {
    return this.queryMsg({
      total_deposit: {}
    });
  };
  config = async (): Promise<any> => {
    return this.queryMsg({
      config: {}
    });
  };
  state = async (): Promise<any> => {
    return this.queryMsg({
      state: {}
    });
  };
}
export interface SplitterInterface extends SplitterReadOnlyInterface {
  deposit: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<any>;
  withdraw: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<any>;
  advance: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<any>;
  updateRewardsContract: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    rewardsContract
  }: {
    rewardsContract: Addr;
  }) => Promise<any>;
}
export class SplitterContract extends SplitterQueryContract implements SplitterInterface {
  constructor(client: SigningCosmWasmClient, contractAddress: string, contractHash?: string) {
    super(client, contractAddress, contractHash);
    this.deposit = this.deposit.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.advance = this.advance.bind(this);
    this.updateRewardsContract = this.updateRewardsContract.bind(this);
  }

  deposit = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<any> => {
    return await this.executeMsg({
      deposit: {}
    }, userAddress, customFees, memo, transferAmount);
  };
  withdraw = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<any> => {
    return await this.executeMsg({
      withdraw: {}
    }, userAddress, customFees, memo, transferAmount);
  };
  advance = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<any> => {
    return await this.executeMsg({
      advance: {}
    }, userAddress, customFees, memo, transferAmount);
  };
  updateRewardsContract = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    rewardsContract
  }: {
    rewardsContract: Addr;
  }): Promise<any> => {
    return await this.executeMsg({
      update_rewards_contract: {
        rewards_contract: rewardsContract
      }
    }, userAddress, customFees, memo, transferAmount);
  };
}