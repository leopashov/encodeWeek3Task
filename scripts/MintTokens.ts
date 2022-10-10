// ballot deployed at: 0x01cE50c3Aa7229C21078F0098BcC0CB8C1E4CA7d
// myTokenContract deployed to: 0x645d61534e1B1e18A24892C3Fadf6FB71c72CD2B
import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { abi } from "../artifacts/contracts/myERC20Votes.sol/MyToken.json";
dotenv.config();

const ERC20_TOKEN_ADDRESS = '0x645d61534e1B1e18A24892C3Fadf6FB71c72CD2B';
const MINT_AMOUNT = ethers.utils.parseEther("1");

async function main() {
    const options = {
        alchemy: process.env.ALCHEMY_API_KEY,
        infura: process.env.INFURA_API_KEY
    };
    const provider = ethers.getDefaultProvider("goerli", options);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY_SIGNER ?? "", provider);
    const acc1 = new ethers.Wallet(process.env.PRIVATE_KEY_ACC1 ?? "", provider);
    console.log(`signer eth balance: ${ethers.utils.formatEther(await signer.getBalance())}`);
    console.log(`acc1 eth balance: ${ethers.utils.formatEther(await acc1.getBalance())}`);
    //to interact with contract we need abi and address
    const tokenContractInstance = new ethers.Contract(ERC20_TOKEN_ADDRESS, abi, signer);
    const initialSupply = await tokenContractInstance.totalSupply();
    console.log(`initial supply: ${initialSupply}`);
    const signerMintTx = await tokenContractInstance.mint(signer.address, MINT_AMOUNT);
    const acc1MintTx = await tokenContractInstance.mint(acc1.address, MINT_AMOUNT);
    acc1MintTx.wait();
    const finalSupply = await tokenContractInstance.totalSupply();
    console.log(`final supply: ${finalSupply}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });