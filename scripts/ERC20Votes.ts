import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

const TOKENS_MINTED = ethers.utils.parseEther("1");

async function main() {
  const [deployer, acc1, acc2] = await ethers.getSigners();
    const myTokenContractFactory = await ethers.getContractFactory("MyToken");
    const myTokenContract = await myTokenContractFactory.deploy();
    await myTokenContract.deployed();
    console.log(`mytoken contract was deployed at ${myTokenContract.address}\n`);
    const totalSupply = await myTokenContract.totalSupply();
    console.log(`The initial total supply of this contract after deployment is ${totalSupply}`);
    console.log("minting new tokens for acc1");
    const mintTx = await myTokenContract.mint(acc1.address, TOKENS_MINTED);
    mintTx.wait();
    const totalSupplyAfterBN = await myTokenContract.totalSupply();
    console.log(`The initial total supply of this contract after minting is ${totalSupplyAfterBN}\n`);
    console.log("What is current voting power of account 1?");
    // getvotes(address account) gives the account's voting power ()
    const acc1BalanceAfterMint = await myTokenContract.balanceOf(acc1.address);
    console.log(`The token balance of acc1 after minting is ${ethers.utils.formatEther(acc1BalanceAfterMint)}\n`);
    const acc1InitialVotingPowerAfterMint = await myTokenContract.getVotes(acc1.address);
    console.log(`The initial voting power of acc1 after minting is ${ethers.utils.formatEther(acc1InitialVotingPowerAfterMint)}\n`);
    // need to delegate to ourselves in order to get voting power
    console.log(`delegating from account1 to account1... `);
    const delegateTx = await myTokenContract.connect(acc1).delegate(acc1.address);
    await delegateTx.wait();
    const acc1VotingPowerAfterDelegate = await myTokenContract.getVotes(acc1.address);
    console.log(`The voting power of acc1 after delegating is ${ethers.utils.formatEther(acc1VotingPowerAfterDelegate)}\n`);
    const currentBlock = await ethers.provider.getBlock("latest");
    console.log(`the current block number is: ${currentBlock.number}`);
    // mint some more to update blocks
    const mintTx2 = await myTokenContract.mint(acc2.address, TOKENS_MINTED);
    mintTx2.wait();
    const mintTx3 = await myTokenContract.mint(acc2.address, TOKENS_MINTED);
    mintTx3.wait();
    // await Promise.all([]) returns all promises at onces
    const pastVotes = await Promise.all([
      myTokenContract.getPastVotes(acc1.address, 4),
      myTokenContract.getPastVotes(acc1.address, 3),
      myTokenContract.getPastVotes(acc1.address, 2),
      myTokenContract.getPastVotes(acc1.address, 1),
      myTokenContract.getPastVotes(acc1.address, 0)
    ]);
    console.log({pastVotes});
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
