import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { abi as ballotABI } from "../artifacts/contracts/TokenizedBallot.sol/TokenizedBallot.json";
dotenv.config();

const BALLOT_CONTRACT_ADDRESS = '0xc4F9E897d069b36d75a109721Fa84797f313C711';
const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function main() {
    // connect to testnet
    const options = {
        alchemy: process.env.ALCHEMY_API_KEY,
        infura: process.env.INFURA_API_KEY
    };
    const provider = ethers.getDefaultProvider("goerli", options);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY_SIGNER ?? "", provider);
    const acc1 = new ethers.Wallet(process.env.PRIVATE_KEY_ACC1 ?? "", provider);

    const ballotInstance = new ethers.Contract(BALLOT_CONTRACT_ADDRESS, ballotABI, signer);
    //console.log(await ballotInstance.referenceBlock());

    const signerVotePowerSpent = await ballotInstance.votePowerSpent(signer.address);
    console.log(`Signer vote power spent: ${ethers.utils.formatEther(signerVotePowerSpent)}`);
    const acc1VotePowerSpent = await ballotInstance.votePowerSpent(acc1.address);
    console.log(`acc1 vote power spent: ${ethers.utils.formatEther(acc1VotePowerSpent)}`);

    for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await ballotInstance.proposals(index);
        console.log(`proposal${index} name: ${ethers.utils.parseBytes32String(proposal.name)}, votes for: ${ethers.utils.formatEther(proposal.voteCount)}`);
    }

    const signerVotePowerRemaining = await ballotInstance.votePower(signer.address);
    console.log(`Signer vote power remaining: ${ethers.utils.formatEther(signerVotePowerRemaining)}`);
    const acc1VotePowerRemaining = await ballotInstance.votePower(acc1.address);
    console.log(`Signer vote power remaining: ${ethers.utils.formatEther(acc1VotePowerRemaining)}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });