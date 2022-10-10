// myTokenContract deployed to: 0x645d61534e1B1e18A24892C3Fadf6FB71c72CD2B
import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { TokenizedBallot__factory } from "../typechain-types";
dotenv.config();

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];
const ERC20_TOKEN_ADDRESS = '0x645d61534e1B1e18A24892C3Fadf6FB71c72CD2B';

function convertStringArrayToBytes32(array: string[]) {
    const bytes32Array = [];
    for (let index = 0; index < array.length; index++) {
      bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
    }
    return bytes32Array;
};


async function main() {
    // connect to testnet
    const options = {
        alchemy: process.env.ALCHEMY_API_KEY,
        infura: process.env.INFURA_API_KEY
    };
    const provider = ethers.getDefaultProvider("goerli", options);
    const lastBlock = await provider.getBlock("latest");
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY_SIGNER ?? "", provider);
    const balanceBN = await signer.getBalance();

    
    // get factory
    const ballotFactory = new TokenizedBallot__factory(signer); 
    const ballotContract = await ballotFactory.deploy(convertStringArrayToBytes32(PROPOSALS), ERC20_TOKEN_ADDRESS, lastBlock.number);
    console.log(`Ballot contract deployed to ${ballotContract.address} on Goerli testnet`);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });