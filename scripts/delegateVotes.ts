import { BigNumber, ethers } from "ethers";
import * as dotenv from "dotenv";
import { abi } from "../artifacts/contracts/myERC20Votes.sol/MyToken.json";
dotenv.config();

const ERC20_TOKEN_ADDRESS = '0x645d61534e1B1e18A24892C3Fadf6FB71c72CD2B';


async function main() {
    const options = {
        alchemy: process.env.ALCHEMY_API_KEY,
        infura: process.env.INFURA_API_KEY
    };
    const provider = ethers.getDefaultProvider("goerli", options);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY_SIGNER ?? "", provider);
    const acc1 = new ethers.Wallet(process.env.PRIVATE_KEY_ACC1 ?? "", provider);

    const tokenInstance = new ethers.Contract(ERC20_TOKEN_ADDRESS, abi, signer);
    
    const signerDelegateTx = await tokenInstance.connect(signer).delegate(signer.address);
    signerDelegateTx.wait();

    const acc1DelegateTx = await tokenInstance.connect(acc1).delegate(acc1.address);
    acc1DelegateTx.wait();
    
    console.log(`signer voting power: ${await tokenInstance.getVotes(signer.address)}`);
    console.log(`acc1 voting power: ${await tokenInstance.getVotes(acc1.address)}`);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });