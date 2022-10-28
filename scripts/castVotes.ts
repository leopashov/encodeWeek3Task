//TokenizedBallot deployed to 0xc4F9E897d069b36d75a109721Fa84797f313C711
import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { abi as ballotABI } from "../artifacts/contracts/TokenizedBallot.sol/TokenizedBallot.json";
import { abi as tokenABI } from "../artifacts/contracts/myERC20Votes.sol/MyToken.json";
dotenv.config();

const BALLOT_CONTRACT_ADDRESS = '0xc4F9E897d069b36d75a109721Fa84797f313C711';
const ERC20_TOKEN_ADDRESS = '0x645d61534e1B1e18A24892C3Fadf6FB71c72CD2B';

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
    const tokenInstance = new ethers.Contract(ERC20_TOKEN_ADDRESS, tokenABI, signer);

    // get current vote power of each account
    const signerVotePower = await ballotInstance.votePower(signer.address);
    const acc1VotePower = await ballotInstance.votePower(acc1.address);
    // signer votes for proposal 2 (at index 1) with (floor) half of their votes
    const signerVoteTX = await ballotInstance.connect(signer).vote(1, signerVotePower.div(2));
    signerVoteTX.wait();
    // acc1 votes for proposal 3 (index 2) with (floor) half their votes
    const acc1VoteTx = await ballotInstance.connect(acc1).vote(2, acc1VotePower.div(2));
    acc1VoteTx.wait(); 

    const signerRemainingVotePower = 

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });