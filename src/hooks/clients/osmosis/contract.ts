import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";

export interface Coin {
  readonly denom: string;
  readonly amount: string;
}
export interface TxnStdFee {
  readonly amount: Coin[];
  readonly gas: string;
}
export interface StdFee {
  readonly upload: TxnStdFee;
  readonly init: TxnStdFee;
  readonly exec: TxnStdFee;
  readonly send: TxnStdFee;
  readonly amount: Coin[];
  readonly gas: string;
}

export interface ExecArgs {
  userAddress: string;
  transferAmount: readonly Coin[] | undefined;
  customFees: TxnStdFee | undefined;
}

export class Contract {
  private client: CosmWasmClient | SigningCosmWasmClient;

  public contractCodeHash: string | undefined;
  public contractAddress: string;

  constructor(
    client: CosmWasmClient | SigningCosmWasmClient,
    contractAddress: string,
    contractHash?: string
  ) {
    this.contractCodeHash = contractHash;
    this.contractAddress = contractAddress;
    this.client = client;
  }

  async queryMsg (
    msgData: Record<string, unknown>
  ): Promise<any> {
    return await this.client.queryContractSmart(this.contractAddress, msgData);
  }

  async executeMsg (
    msgData: Record<string, unknown>,
    userAddress: string,
    customFees?: TxnStdFee,
    memo?: string,
    transferAmount?: readonly Coin[]
  ): Promise<ExecuteResult> {
    return await (this.client as SigningCosmWasmClient).execute(
      userAddress,
      this.contractAddress,
      msgData,
      customFees as TxnStdFee,
      memo === undefined ? "executing" : memo,
      transferAmount
    );
  }
}
