import { Contract, Coin, TxnStdFee } from "./contract";
import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";

export type ExecuteMsg = {
  stake: {
    referral: number;
    [k: string]: unknown;
  };
} | {
  stake_for_bjuno: {
    referral: number;
    [k: string]: unknown;
  };
} | {
  claim: {
    [k: string]: unknown;
  };
} | {
  claim_and_stake: {
    [k: string]: unknown;
  };
} | {
  update_sejuno_addr: {
    address: Addr;
    [k: string]: unknown;
  };
} | {
  update_bjuno_addr: {
    address: Addr;
    [k: string]: unknown;
  };
} | {
  update_validator_set_addr: {
    address: Addr;
    [k: string]: unknown;
  };
} | {
  update_rewards_addr: {
    address: Addr;
    [k: string]: unknown;
  };
} | {
  receive: Cw20ReceiveMsg;
} | {
  advance_window: {
    [k: string]: unknown;
  };
} | {
  rebalance_slash: {
    [k: string]: unknown;
  };
} | {
  pause_contract: {
    [k: string]: unknown;
  };
} | {
  unpause_contract: {
    [k: string]: unknown;
  };
} | {
  vote_on_chain: {
    proposal: number;
    vote: VoteOption;
    [k: string]: unknown;
  };
} | {
  remove_validator: {
    address: string;
    redelegate?: boolean | null;
    [k: string]: unknown;
  };
} | {
  add_validator: {
    address: Addr;
    [k: string]: unknown;
  };
} | {
  redelegate: {
    from: string;
    to: string;
    [k: string]: unknown;
  };
} | {
  change_owner: {
    new_owner: Addr;
    [k: string]: unknown;
  };
} | {
  recover_token: {
    amount: Uint128;
    token: Addr;
    [k: string]: unknown;
  };
} | {
  recover_juno: {
    amount: Uint128;
    denom: string;
    to: string;
    [k: string]: unknown;
  };
} | {
  kill_switch_unbond: {
    [k: string]: unknown;
  };
} | {
  kill_switch_open_withdraws: {
    [k: string]: unknown;
  };
} | {
  change_unbonding_time: {
    new_time: number;
    [k: string]: unknown;
  };
} | {
  change_dev_fee: {
    dev_address?: Addr | null;
    dev_fee?: number | null;
    [k: string]: unknown;
  };
} | {
  change_peg_recovery_fee: {
    peg_recovery_fee: number;
    [k: string]: unknown;
  };
} | {
  change_threshold: {
    er_threshold: number;
    [k: string]: unknown;
  };
} | {
  claim_airdrop1: {
    address: Addr;
    amount: Uint128;
    proof: string[];
    stage: number;
    [k: string]: unknown;
  };
} | {
  claim_airdrop2: {
    address: Addr;
    amount: Uint128;
    proof: string[];
    [k: string]: unknown;
  };
} | {
  claim_airdrop3: {
    address: Addr;
    [k: string]: unknown;
  };
} | {
  claim_reward: {
    [k: string]: unknown;
  };
} | {
  change_referral_contract: {
    referral_contract: Addr;
    [k: string]: unknown;
  };
};
export type Addr = string;
export type Uint128 = string;
export type Binary = string;
export type VoteOption = "yes" | "no" | "abstain" | "no_with_veto";
export interface Cw20ReceiveMsg {
  amount: Uint128;
  msg: Binary;
  sender: string;
  [k: string]: unknown;
}
export interface InstantiateMsg {
  dev_address: Addr;
  dev_fee?: number | null;
  epoch_period: number;
  er_threshold: number;
  peg_recovery_fee: number;
  reward_denom: string;
  unbonding_period: number;
  underlying_coin_denom: string;
  [k: string]: unknown;
}
export interface PendingClaimsResponse {
  claim_time: number;
  juno_amount: Uint128;
  [k: string]: unknown;
}
export type QueryMsg = {
  sejuno_exchange_rate: {
    [k: string]: unknown;
  };
} | {
  bjuno_exchange_rate: {
    [k: string]: unknown;
  };
} | {
  query_dev_fee: {
    [k: string]: unknown;
  };
} | {
  info: {
    [k: string]: unknown;
  };
} | {
  undelegations: {
    address: Addr;
    [k: string]: unknown;
  };
} | {
  user_claimable: {
    address: Addr;
    [k: string]: unknown;
  };
} | {
  window: {
    [k: string]: unknown;
  };
} | {
  validator_list: {
    [k: string]: unknown;
  };
} | {
  active_unbonding: {
    address: Addr;
    [k: string]: unknown;
  };
};
export type QueryResponse = {
  info: {
    admin: Addr;
    bjuno_backing: Uint128;
    bjuno_in_contract: Uint128;
    bjuno_to_burn: Uint128;
    bjuno_token: Addr;
    dev_address: Addr;
    dev_fee: number;
    epoch_period: number;
    er_threshold: number;
    juno_under_withdraw: Uint128;
    kill_switch: number;
    peg_recovery_fee: number;
    reward_denom: string;
    rewards_contract: Addr;
    sejuno_backing: Uint128;
    sejuno_in_contract: Uint128;
    sejuno_to_burn: Uint128;
    sejuno_token: Addr;
    to_deposit: Uint128;
    top_validator_contract: Addr;
    total_staked: Uint128;
    unbonding_period: number;
    underlying_coin_denom: string;
    validator_set: ValidatorResponse[];
    [k: string]: unknown;
  };
} | {
  pending_claims: {
    pending: PendingClaimsResponse[];
    [k: string]: unknown;
  };
} | {
  active_undelegation: {
    bjuno_amount: Uint128;
    sejuno_amount: Uint128;
    [k: string]: unknown;
  };
} | {
  top_validators: {
    validators: string[];
    [k: string]: unknown;
  };
} | {
  sejuno_exchange_rate: {
    denom: string;
    rate: string;
    [k: string]: unknown;
  };
} | {
  bjuno_exchange_rate: {
    denom: string;
    rate: string;
    [k: string]: unknown;
  };
} | {
  dev_fee: {
    address: Addr;
    fee: number;
    [k: string]: unknown;
  };
} | {
  window: {
    bjuno_amount: Uint128;
    id: number;
    sejuno_amount: Uint128;
    time_to_close: number;
    [k: string]: unknown;
  };
} | {
  unbonding: {
    unbonding_amount: Uint128;
    [k: string]: unknown;
  };
} | {
  claimable: {
    claimable_amount: Uint128;
    [k: string]: unknown;
  };
};
export interface ValidatorResponse {
  address: string;
  staked: Uint128;
  [k: string]: unknown;
}
export interface TopValidatorsResponse {
  validators: string[];
  [k: string]: unknown;
}
export interface StakingContractReadOnlyInterface {
  sejunoExchangeRate: () => Promise<any>;
  bjunoExchangeRate: () => Promise<any>;
  queryDevFee: () => Promise<any>;
  info: () => Promise<any>;
  undelegations: ({
    address
  }: {
    address: string;
  }) => Promise<any>;
  userClaimable: ({
    address
  }: {
    address: string;
  }) => Promise<any>;
  window: () => Promise<any>;
  validatorList: () => Promise<any>;
  activeUnbonding: ({
    address
  }: {
    address: string;
  }) => Promise<any>;
}
export class StakingContractQueryContract extends Contract implements StakingContractReadOnlyInterface {
  constructor(client: CosmWasmClient, contractAddress: string, contractHash?: string) {
    super(client, contractAddress, contractHash);
    this.sejunoExchangeRate = this.sejunoExchangeRate.bind(this);
    this.bjunoExchangeRate = this.bjunoExchangeRate.bind(this);
    this.queryDevFee = this.queryDevFee.bind(this);
    this.info = this.info.bind(this);
    this.undelegations = this.undelegations.bind(this);
    this.userClaimable = this.userClaimable.bind(this);
    this.window = this.window.bind(this);
    this.validatorList = this.validatorList.bind(this);
    this.activeUnbonding = this.activeUnbonding.bind(this);
  }

  sejunoExchangeRate = async (): Promise<any> => {
    return this.queryMsg({
      sejuno_exchange_rate: {}
    });
  };
  bjunoExchangeRate = async (): Promise<any> => {
    return this.queryMsg({
      bjuno_exchange_rate: {}
    });
  };
  queryDevFee = async (): Promise<any> => {
    return this.queryMsg({
      query_dev_fee: {}
    });
  };
  info = async (): Promise<any> => {
    return this.queryMsg({
      info: {}
    });
  };
  undelegations = async ({
    address
  }: {
    address: string;
  }): Promise<any> => {
    return this.queryMsg({
      undelegations: {
        address
      }
    });
  };
  userClaimable = async ({
    address
  }: {
    address: string;
  }): Promise<any> => {
    return this.queryMsg({
      user_claimable: {
        address
      }
    });
  };
  window = async (): Promise<any> => {
    return this.queryMsg({
      window: {}
    });
  };
  validatorList = async (): Promise<any> => {
    return this.queryMsg({
      validator_list: {}
    });
  };
  activeUnbonding = async ({
    address
  }: {
    address: string;
  }): Promise<any> => {
    return this.queryMsg({
      active_unbonding: {
        address
      }
    });
  };
}
export interface StakingContractInterface extends StakingContractReadOnlyInterface {
  stake: ({
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
    referral
  }: {
    referral: number;
  }) => Promise<ExecuteResult>;
  stakeForBjuno: ({
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
    referral
  }: {
    referral: number;
  }) => Promise<ExecuteResult>;
  claim: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<ExecuteResult>;
  claimAndStake: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<ExecuteResult>;
  updateSejunoAddr: ({
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
    address
  }: {
    address: string;
  }) => Promise<ExecuteResult>;
  updateBjunoAddr: ({
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
    address
  }: {
    address: string;
  }) => Promise<ExecuteResult>;
  updateValidatorSetAddr: ({
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
    address
  }: {
    address: string;
  }) => Promise<ExecuteResult>;
  updateRewardsAddr: ({
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
    address
  }: {
    address: string;
  }) => Promise<ExecuteResult>;
  receive: ({
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
    amount,
    msg,
    sender
  }: {
    amount: string;
    msg: string;
    sender: string;
  }) => Promise<ExecuteResult>;
  advanceWindow: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<ExecuteResult>;
  rebalanceSlash: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<ExecuteResult>;
  pauseContract: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<ExecuteResult>;
  unpauseContract: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<ExecuteResult>;
  voteOnChain: ({
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
    proposal,
    vote
  }: {
    proposal: number;
    vote: string;
  }) => Promise<ExecuteResult>;
  removeValidator: ({
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
    address,
    redelegate
  }: {
    address: string;
    redelegate?: boolean;
  }) => Promise<ExecuteResult>;
  addValidator: ({
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
    address
  }: {
    address: string;
  }) => Promise<ExecuteResult>;
  redelegate: ({
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
    from,
    to
  }: {
    from: string;
    to: string;
  }) => Promise<ExecuteResult>;
  changeOwner: ({
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
    newOwner
  }: {
    newOwner: string;
  }) => Promise<ExecuteResult>;
  recoverToken: ({
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
    amount,
    token
  }: {
    amount: string;
    token: string;
  }) => Promise<ExecuteResult>;
  recoverJuno: ({
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
    amount,
    denom,
    to
  }: {
    amount: string;
    denom: string;
    to: string;
  }) => Promise<ExecuteResult>;
  killSwitchUnbond: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<ExecuteResult>;
  killSwitchOpenWithdraws: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<ExecuteResult>;
  changeUnbondingTime: ({
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
    newTime
  }: {
    newTime: number;
  }) => Promise<ExecuteResult>;
  changeDevFee: ({
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
    devAddress,
    devFee
  }: {
    devAddress?: Addr;
    devFee?: number;
  }) => Promise<ExecuteResult>;
  changePegRecoveryFee: ({
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
    pegRecoveryFee
  }: {
    pegRecoveryFee: number;
  }) => Promise<ExecuteResult>;
  changeThreshold: ({
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
    erThreshold
  }: {
    erThreshold: number;
  }) => Promise<ExecuteResult>;
  claimAirdrop1: ({
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
    address,
    amount,
    proof,
    stage
  }: {
    address: string;
    amount: string;
    proof: string[];
    stage: number;
  }) => Promise<ExecuteResult>;
  claimAirdrop2: ({
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
    address,
    amount,
    proof
  }: {
    address: string;
    amount: string;
    proof: string[];
  }) => Promise<ExecuteResult>;
  claimAirdrop3: ({
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
    address
  }: {
    address: string;
  }) => Promise<ExecuteResult>;
  claimReward: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<ExecuteResult>;
  changeReferralContract: ({
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
    referralContract
  }: {
    referralContract: string;
  }) => Promise<ExecuteResult>;
}
export class StakingContractContract extends StakingContractQueryContract implements StakingContractInterface {
  constructor(client: SigningCosmWasmClient, contractAddress: string, contractHash?: string) {
    super(client, contractAddress, contractHash);
    this.stake = this.stake.bind(this);
    this.stakeForBjuno = this.stakeForBjuno.bind(this);
    this.claim = this.claim.bind(this);
    this.claimAndStake = this.claimAndStake.bind(this);
    this.updateSejunoAddr = this.updateSejunoAddr.bind(this);
    this.updateBjunoAddr = this.updateBjunoAddr.bind(this);
    this.updateValidatorSetAddr = this.updateValidatorSetAddr.bind(this);
    this.updateRewardsAddr = this.updateRewardsAddr.bind(this);
    this.receive = this.receive.bind(this);
    this.advanceWindow = this.advanceWindow.bind(this);
    this.rebalanceSlash = this.rebalanceSlash.bind(this);
    this.pauseContract = this.pauseContract.bind(this);
    this.unpauseContract = this.unpauseContract.bind(this);
    this.voteOnChain = this.voteOnChain.bind(this);
    this.removeValidator = this.removeValidator.bind(this);
    this.addValidator = this.addValidator.bind(this);
    this.redelegate = this.redelegate.bind(this);
    this.changeOwner = this.changeOwner.bind(this);
    this.recoverToken = this.recoverToken.bind(this);
    this.recoverJuno = this.recoverJuno.bind(this);
    this.killSwitchUnbond = this.killSwitchUnbond.bind(this);
    this.killSwitchOpenWithdraws = this.killSwitchOpenWithdraws.bind(this);
    this.changeUnbondingTime = this.changeUnbondingTime.bind(this);
    this.changeDevFee = this.changeDevFee.bind(this);
    this.changePegRecoveryFee = this.changePegRecoveryFee.bind(this);
    this.changeThreshold = this.changeThreshold.bind(this);
    this.claimAirdrop1 = this.claimAirdrop1.bind(this);
    this.claimAirdrop2 = this.claimAirdrop2.bind(this);
    this.claimAirdrop3 = this.claimAirdrop3.bind(this);
    this.claimReward = this.claimReward.bind(this);
    this.changeReferralContract = this.changeReferralContract.bind(this);
  }

  stake = async ({
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
    referral
  }: {
    referral: number;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      stake: {
        referral
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  stakeForBjuno = async ({
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
    referral
  }: {
    referral: number;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      stake_for_bjuno: {
        referral
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  claim = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      claim: {}
    }, userAddress, customFees, memo, transferAmount);
  };
  claimAndStake = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      claim_and_stake: {}
    }, userAddress, customFees, memo, transferAmount);
  };
  updateSejunoAddr = async ({
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
    address
  }: {
    address: string;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      update_sejuno_addr: {
        address
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  updateBjunoAddr = async ({
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
    address
  }: {
    address: string;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      update_bjuno_addr: {
        address
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  updateValidatorSetAddr = async ({
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
    address
  }: {
    address: string;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      update_validator_set_addr: {
        address
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  updateRewardsAddr = async ({
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
    address
  }: {
    address: string;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      update_rewards_addr: {
        address
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  receive = async ({
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
    amount,
    msg,
    sender
  }: {
    amount: string;
    msg: string;
    sender: string;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      receive: {
        amount,
        msg,
        sender
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  advanceWindow = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      advance_window: {}
    }, userAddress, customFees, memo, transferAmount);
  };
  rebalanceSlash = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      rebalance_slash: {}
    }, userAddress, customFees, memo, transferAmount);
  };
  pauseContract = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      pause_contract: {}
    }, userAddress, customFees, memo, transferAmount);
  };
  unpauseContract = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      unpause_contract: {}
    }, userAddress, customFees, memo, transferAmount);
  };
  voteOnChain = async ({
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
    proposal,
    vote
  }: {
    proposal: number;
    vote: string;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      vote_on_chain: {
        proposal,
        vote
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  removeValidator = async ({
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
    address,
    redelegate
  }: {
    address: string;
    redelegate?: boolean;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      remove_validator: {
        address,
        redelegate
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  addValidator = async ({
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
    address
  }: {
    address: string;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      add_validator: {
        address
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  redelegate = async ({
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
    from,
    to
  }: {
    from: string;
    to: string;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      redelegate: {
        from,
        to
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  changeOwner = async ({
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
    newOwner
  }: {
    newOwner: string;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      change_owner: {
        new_owner: newOwner
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  recoverToken = async ({
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
    amount,
    token
  }: {
    amount: string;
    token: string;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      recover_token: {
        amount,
        token
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  recoverJuno = async ({
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
    amount,
    denom,
    to
  }: {
    amount: string;
    denom: string;
    to: string;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      recover_juno: {
        amount,
        denom,
        to
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  killSwitchUnbond = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      kill_switch_unbond: {}
    }, userAddress, customFees, memo, transferAmount);
  };
  killSwitchOpenWithdraws = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      kill_switch_open_withdraws: {}
    }, userAddress, customFees, memo, transferAmount);
  };
  changeUnbondingTime = async ({
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
    newTime
  }: {
    newTime: number;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      change_unbonding_time: {
        new_time: newTime
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  changeDevFee = async ({
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
    devAddress,
    devFee
  }: {
    devAddress?: Addr;
    devFee?: number;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      change_dev_fee: {
        dev_address: devAddress,
        dev_fee: devFee
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  changePegRecoveryFee = async ({
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
    pegRecoveryFee
  }: {
    pegRecoveryFee: number;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      change_peg_recovery_fee: {
        peg_recovery_fee: pegRecoveryFee
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  changeThreshold = async ({
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
    erThreshold
  }: {
    erThreshold: number;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      change_threshold: {
        er_threshold: erThreshold
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  claimAirdrop1 = async ({
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
    address,
    amount,
    proof,
    stage
  }: {
    address: string;
    amount: string;
    proof: string[];
    stage: number;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      claim_airdrop1: {
        address,
        amount,
        proof,
        stage
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  claimAirdrop2 = async ({
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
    address,
    amount,
    proof
  }: {
    address: string;
    amount: string;
    proof: string[];
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      claim_airdrop2: {
        address,
        amount,
        proof
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  claimAirdrop3 = async ({
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
    address
  }: {
    address: string;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      claim_airdrop3: {
        address
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  claimReward = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      claim_reward: {}
    }, userAddress, customFees, memo, transferAmount);
  };
  changeReferralContract = async ({
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
    referralContract
  }: {
    referralContract: string;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      change_referral_contract: {
        referral_contract: referralContract
      }
    }, userAddress, customFees, memo, transferAmount);
  };
}