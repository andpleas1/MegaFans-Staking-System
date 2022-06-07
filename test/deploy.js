const hre = require("hardhat");
const fs = require('fs');

async function main() {
  // const Minter = await hre.ethers.getContractFactory("Minter");
  // const minter = await Minter.deploy();
  const RewardToken = await hre.ethers.getContractFactory("RewardToken");
  const rewardtoken = await RewardToken.deploy();

  const MegaFansNFT = await hre.ethers.getContractFactory("MegaFansNFT");
  const megafansnft = await MegaFansNFT.deploy();

  const StakingSystem = await hre.ethers.getContractFactory("StakingSystem");
  const stakingsystem = await StakingSystem.deploy(`${megafansnft.address}`, `${rewardtoken.address}`);

  await minter.deployed();
  await rewardtoken.deployed();
  await megafansnft.deployed();  
  await stakingsystem.deployed();

  console.log("Minter deployed to:", minter.address);
  console.log("RewardToken deployed to:", rewardtoken.address);
  console.log("MegaFansNFT deployed to:", megafansnft.address);
  console.log("StakingSystem deployed to:", stakingsystem.address);
  

  fs.writeFileSync('./config.js', `
    export const MinterAddress = "${minter.address}"
    export const RewardTokenAddress = "${rewardtoken.address}"
    export const MegaFansNFTAddress = "${megafansnft.address}"
    export const StakingSystemAddress = "${stakingsystem.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
