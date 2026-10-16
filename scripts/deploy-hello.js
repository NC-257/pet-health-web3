const hre = require("hardhat");

async function main() {
  const factory = await hre.ethers.getContractFactory("Hello");
  const contract = await factory.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("Contract address:", address);
  console.log("Message:", await contract.message());
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});