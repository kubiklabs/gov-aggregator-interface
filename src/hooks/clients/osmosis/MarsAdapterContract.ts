import { Contract, Coin, TxnStdFee } from "./contract";
import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";

export type ExecuteMsg = {
  deposit: {};
} | {
  update_yield_bearing_denom: {
    yield_bearing_denom: string;
  };
} | {
  withdraw: {};
};
export type Addr = string;
export interface InstantiateMsg {
  red_bank: Addr;
  underlying_denom: string;
  yield_bearing_denom: string;
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
  owner: Addr;
  red_bank: Addr;
  underlying_denom: string;
  yield_bearing_denom: string;
}
export type Decimal = string;
export type Uint128 = string;
export interface StateResponse {
  exchange_rate: Decimal;
  underlying_deposited: Uint128;
}
export interface TotalDepositResponse {
  underlying_amount: Uint128;
}
export interface UserDepositResponse {
  underlying_amount: Uint128;
}
export interface MarsAdapterReadOnlyInterface {
  userDeposit: () => Promise<any>;
  totalDeposit: () => Promise<any>;
  config: () => Promise<any>;
  state: () => Promise<any>;
}
export class MarsAdapterQueryContract extends Contract implements MarsAdapterReadOnlyInterface {
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
export interface MarsAdapterInterface extends MarsAdapterReadOnlyInterface {
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
  updateYieldBearingDenom: ({
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
    yieldBearingDenom
  }: {
    yieldBearingDenom: string;
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
}
export class MarsAdapterContract extends MarsAdapterQueryContract implements MarsAdapterInterface {
  constructor(client: SigningCosmWasmClient, contractAddress: string, contractHash?: string) {
    super(client, contractAddress, contractHash);
    this.deposit = this.deposit.bind(this);
    this.updateYieldBearingDenom = this.updateYieldBearingDenom.bind(this);
    this.withdraw = this.withdraw.bind(this);
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
  updateYieldBearingDenom = async ({
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
    yieldBearingDenom
  }: {
    yieldBearingDenom: string;
  }): Promise<any> => {
    return await this.executeMsg({
      update_yield_bearing_denom: {
        yield_bearing_denom: yieldBearingDenom
      }
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
}