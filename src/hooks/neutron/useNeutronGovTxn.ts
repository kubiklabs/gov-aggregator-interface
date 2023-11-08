import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { getNeutronOption, sleep } from "../../utils/common";
// import { neutronSingleProposal } from "../../../config/chains/Neutron/contracts/SingleProposalModule";
import { toast } from "react-toastify";
import Long from "long";
import { StdFee } from "@cosmjs/stargate";
import DAO_DATA from "../../config/dao_config.json";
import CHAIN_DATA from "../../config/chain_config.json";
import { useRecoilValue } from "recoil";
import { walletState } from "../../context/walletState";
import { log } from "console";
import { useState } from "react";

enum Vote {
  Yes,
  No,
  Abstain,
}

const defaultFee: StdFee = {
  amount: [
    {
      amount: "75000",
      denom: "untrn",
    },
  ],
  gas: "300000",
};

export const useNeutronGovTxn = (daoId: string) => {
  const [txnClient, setTxnClient] = useState<
    SigningCosmWasmClient | undefined
  >();

  const { address } = useRecoilValue(walletState);

  const createTxnClient = async () => {
    try {
      while (
        !(window as any).keplr ||
        !(window as any).getEnigmaUtils ||
        !(window as any).getOfflineSignerOnlyAmino
      ) {
        await sleep(0.5);
      }

      // Enable Keplr and request access to the wallet
      await (window as any).keplr.enable("neutron-test-1");
      const offlineSigner = await (
        window as any
      ).keplr.getOfflineSignerOnlyAmino("neutron-test-1");
      const client = await SigningCosmWasmClient.connectWithSigner(
        "http://45.250.253.23:26657",
        offlineSigner
      );
      return client;
    } catch (error) {
      console.log(error);
    }
  };

  const { single_proposal, voting_module } =
    DAO_DATA[daoId as keyof typeof DAO_DATA];

  // const getNeutronAddressSigner = async () => {
  //   while (
  //     !(window as any).keplr ||
  //     !(window as any).getEnigmaUtils ||
  //     !(window as any).getOfflineSignerOnlyAmino
  //   ) {
  //     await sleep(0.5);
  //   }

  //   // Enable Keplr and request access to the wallet
  //   await (window as any).keplr.enable("neutron-test-1");
  //   const offlineSigner = await (window as any).keplr.getOfflineSignerOnlyAmino(
  //     "neutron-test-1"
  //   );
  //   const address = (await offlineSigner.getAccounts())[0]?.address;

  //   return { address, offlineSigner };
  // };

  const sendNeutronVote = async (proposalId: string, voteOption: string) => {
    let client = txnClient;
    if (!client) {
      client = await createTxnClient();
    }
    try {
      if (!client) return;
      const { transactionHash } = await client.execute(
        address as string,
        single_proposal,
        {
          vote: {
            proposal_id: Number(proposalId),
            vote: getNeutronOption(voteOption),
          },
        },
        { amount: [], gas: "1500000" }
      );

      toast.success(
        `Transaction successfully broadcasted with hash ${transactionHash}`
      );
    } catch (error) {
      toast.error(
        `Transaction failed with message ${(error as Error).message}`
      );
      console.log(error);
    }
  };

  const addNeutronProposal = async (
    title: string,
    description: string,
    action: string,
    chainId: string,
    amount: string
  ) => {
    // const { address, offlineSigner } = await getNeutronAddressSigner();
    console.log(CHAIN_DATA[chainId as keyof typeof CHAIN_DATA]);
    let client = txnClient;
    if (!client) {
      client = await createTxnClient();
    }

    try {
      if (!client) return;
      const { transactionHash } = await client.execute(
        address as string,
        single_proposal,
        {
          propose: {
            title,
            description,
            msgs: [
              {
                custom: {
                  [action]: {
                    demand_info: [
                      {
                        chain_id: chainId,
                        amount: amount as string,
                        denom:
                          CHAIN_DATA[chainId as keyof typeof CHAIN_DATA].denom,
                      },
                    ],
                  },
                },
              },
            ],
            proposer: null,
          },
        },
        defaultFee
      );

      toast.success(
        `Transaction successfully broadcasted with hash ${transactionHash}`
      );
    } catch (error) {
      toast.error(
        `Transaction failed with message ${(error as Error).message}`
      );
      console.log(error);
    }
  };

  return { sendNeutronVote, addNeutronProposal };
};
