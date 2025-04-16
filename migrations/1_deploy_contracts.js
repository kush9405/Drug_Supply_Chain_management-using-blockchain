// migrations/1_deploy_contracts.js
const DrugContract = artifacts.require("DrugContract");
const SupplyChainContract = artifacts.require("SupplyChainContract");
const VerificationContract = artifacts.require("VerificationContract");

module.exports = async function (deployer) {
  await deployer.deploy(DrugContract);
  const drugContract = await DrugContract.deployed();

  await deployer.deploy(SupplyChainContract);
  const supplyChainContract = await SupplyChainContract.deployed();

  await deployer.deploy(VerificationContract, drugContract.address, supplyChainContract.address);
  const verificationContract = await VerificationContract.deployed();

  console.log("DrugContract deployed at: ", drugContract.address);
  console.log("SupplyChainContract deployed at: ", supplyChainContract.address);
  console.log("VerificationContract deployed at: ", verificationContract.address);
};