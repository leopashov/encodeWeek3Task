import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { MyToken__factory} from "../typechain-types";
dotenv.config();



async function main() {
    // connect to testnet
    const options = {
        alchemy: process.env.ALCHEMY_API_KEY,
        infura: process.env.INFURA_API_KEY
    };
    const provider = ethers.getDefaultProvider("goerli", options);
    const lastBlock = await provider.getBlock("latest");
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
    const balanceBN = await signer.getBalance();
    // get factory - 'MyToken' is the name of the contrcat to deploy
    const tokenFactory = new MyToken__factory(signer);
    const myTokenContract = await tokenFactory.deploy();
    console.log(`myTokenContract deployed to: ${myTokenContract.address}\n`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
