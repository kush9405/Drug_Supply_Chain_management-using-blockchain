// demonstrateEndpoints.js

module.exports = async function(callback) {
    try {
      const DrugContract = artifacts.require("DrugContract");
      const SupplyChainContract = artifacts.require("SupplyChainContract");
      const VerificationContract = artifacts.require("VerificationContract");
  
      const drugContract = await DrugContract.deployed();
      const supplyChainContract = await SupplyChainContract.deployed();
      const verificationContract = await VerificationContract.deployed();
  
      const accounts = await web3.eth.getAccounts();
  
      // --- Create Drugs ---
      console.log("\n--- Creating Drugs ---");
      const batchId1 = 2001;
      const batchId2 = 2002;
      const timestamp = Math.floor(Date.now() / 1000);
  
      await drugContract.createDrug(batchId1, "DrugX", "ManufacturerA", timestamp, "2025-01-01", { from: accounts[0] });
      console.log(`Drug created with batch ID: ${batchId1}`);
  
      await drugContract.createDrug(batchId2, "DrugY", "ManufacturerB", timestamp, "2024-12-31", { from: accounts[0] });
      console.log(`Drug created with batch ID: ${batchId2}`);
  
      // --- Transfer Ownership ---
      console.log("\n--- Transferring Ownership of Drug 2001 to account[1] ---");
      await drugContract.transferOwnership(batchId1, accounts[1], { from: accounts[0] });
      console.log(`Ownership of drug ${batchId1} transferred to ${accounts[1]}`);
  
      // --- Add Supply Chain Events ---
      console.log("\n--- Adding Supply Chain Events ---");
      await supplyChainContract.addSupplyChainEvent(batchId1, "Created", { from: accounts[0] });
      console.log(`Event 'Created' added for drug ${batchId1}`);
  
      await supplyChainContract.addSupplyChainEvent(batchId1, "Shipped to Distributor", { from: accounts[1] }); // Account 1 is now the "owner"
      console.log(`Event 'Shipped to Distributor' added for drug ${batchId1}`);
  
      await supplyChainContract.addSupplyChainEvent(batchId2, "Created", { from: accounts[0] });
      console.log(`Event 'Created' added for drug ${batchId2}`);
  
      // --- Get Drug Info ---
      console.log("\n--- Getting Drug Info for Drug 2001 ---");
      const drugInfo = await drugContract.getDrug(batchId1);
      console.log(`Drug Info for ${batchId1}:`, drugInfo);
  
      // --- Get Supply Chain History ---
      console.log("\n--- Getting Supply Chain History for Drug 2001 ---");
      const history = await supplyChainContract.getSupplyChainHistory(batchId1);
      console.log(`Supply Chain History for ${batchId1}:`, history);
  
      // --- Verify Drug (Combination) ---
      console.log("\n--- Verifying Drug 2001 (Combining Drug Info and History) ---");
      const verificationInfo = await verificationContract.verifyDrug(batchId1);
      console.log(`Verification Info for ${batchId1}:`, verificationInfo);
  
      console.log("\n--- Verifying Drug 2002 (Combination Drug Info and History) ---");
      const verificationInfo2 = await verificationContract.verifyDrug(batchId2);
      console.log(`Verification Info for ${batchId2}:`, verificationInfo2);
  
      callback();
    } catch (error) {
      console.error("Error:", error);
      callback(error);
    }
  };