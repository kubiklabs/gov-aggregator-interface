import { Contract, Coin, TxnStdFee } from "./contract";
import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";

export type ExecuteMsg = {
  swap_yb_to_y: {};
} | {
  swap_yb_to_p: {};
} | {
  swap_y_to_yb: {};
} | {
  swap_p_to_yb: {};
} | {
  swap_pto_y: {};
} | {
  swap_yto_p: {};
};
export type Addr = string;
export interface InstantiateMsg {
  mars_adapter: Addr;
  principle_denom: string;
  red_bank: Addr;
  splitter: Addr;
  underlying_denom: string;
  yield_bearing_denom: string;
  yield_denom: string;
}
export type QueryMsg = {
  config: {};
} | {
  state: {};
};
export interface ConfigResponse {
  mars_adapter: Addr;
  owner: Addr;
  principle_denom: string;
  red_bank: Addr;
  splitter: Addr;
  underlying_denom: string;
  yield_bearing_denom: string;
  yield_denom: string;
}
export type Uint128 = string;
export interface StateResponse {
  p_in_pool: Uint128;
  pool_id: number;
  scaling_factor: number;
  yb_in_pool: Uint128;
}
export interface MarketReadOnlyInterface {
  config: () => Promise<any>;
  state: () => Promise<any>;
}
export class MarketQueryContract extends Contract implements MarketReadOnlyInterface {
  constructor(client: CosmWasmClient, contractAddress: string, contractHash?: string) {
    super(client, contractAddress, contractHash);
    this.config = this.config.bind(this);
    this.state = this.state.bind(this);
  }

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
export interface MarketInterface extends MarketReadOnlyInterface {
  swapYbToY: ({
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
  swapYbToP: ({
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
  swapYToYb: ({
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
  swapPToYb: ({
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
  swapPtoY: ({
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
  swapYtoP: ({
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
export class MarketContract extends MarketQueryContract implements MarketInterface {
  constructor(client: SigningCosmWasmClient, contractAddress: string, contractHash?: string) {
    super(client, contractAddress, contractHash);
    this.swapYbToY = this.swapYbToY.bind(this);
    this.swapYbToP = this.swapYbToP.bind(this);
    this.swapYToYb = this.swapYToYb.bind(this);
    this.swapPToYb = this.swapPToYb.bind(this);
    this.swapPtoY = this.swapPtoY.bind(this);
    this.swapYtoP = this.swapYtoP.bind(this);
  }

  swapYbToY = async ({
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
      swap_yb_to_y: {}
    }, userAddress, customFees, memo, transferAmount);
  };
  swapYbToP = async ({
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
      swap_yb_to_p: {}
    }, userAddress, customFees, memo, transferAmount);
  };
  swapYToYb = async ({
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
      swap_y_to_yb: {}
    }, userAddress, customFees, memo, transferAmount);
  };
  swapPToYb = async ({
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
      swap_p_to_yb: {}
    }, userAddress, customFees, memo, transferAmount);
  };
  swapPtoY = async ({
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
      swap_pto_y: {}
    }, userAddress, customFees, memo, transferAmount);
  };
  swapYtoP = async ({
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
      swap_yto_p: {}
    }, userAddress, customFees, memo, transferAmount);
  };
}