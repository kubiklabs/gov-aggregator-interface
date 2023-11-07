import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { getNeutronOption, sleep } from "../../utils/common";
// import { neutronSingleProposal } from "../../../config/chains/Neutron/contracts/SingleProposalModule";
import { toast } from "react-toastify";
import Long from "long";
import { StdFee } from "@cosmjs/stargate";
import DAO_DATA from "../../config/dao_config.json";

enum Vote {
  Yes,
  No,
  Abstain,
}

const defaultFee: StdFee = {
  amount: [{ amount: "200000", denom: "umlg" }],
  gas: "200000",
};

export const useNeutronGovTxn = (daoId: string) => {
  const { single_proposal, voting_module } =
    DAO_DATA[daoId as keyof typeof DAO_DATA];

  const getNeutronAddressSigner = async () => {
    while (
      !(window as any).keplr ||
      !(window as any).getEnigmaUtils ||
      !(window as any).getOfflineSignerOnlyAmino
    ) {
      await sleep(0.5);
    }

    // Enable Keplr and request access to the wallet
    await (window as any).keplr.enable("neutron-1");
    const offlineSigner = await (window as any).keplr.getOfflineSignerOnlyAmino(
      "neutron-1"
    );
    const address = (await offlineSigner.getAccounts())[0]?.address;

    return { address, offlineSigner };
  };

  const sendNeutronVote = async (proposalId: string, voteOption: string) => {
    const { address, offlineSigner } = await getNeutronAddressSigner();
    try {
      const client = await SigningCosmWasmClient.connectWithSigner(
        "http://45.250.253.23:26657",
        offlineSigner
      );

      const { transactionHash } = await client.execute(
        address,
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

  return { sendNeutronVote, getNeutronAddressSigner };
};
