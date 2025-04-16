// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./DrugContract.sol";
import "./SupplyChainContract.sol";
import "./SupplyChainTypes.sol";

contract VerificationContract {
    DrugContract public drugContract;
    SupplyChainContract public supplyChainContract;

    struct DrugVerificationResult {
        uint256 batchId;
        string name;
        string manufacturer;
        uint256 creationDate;
        string expiryDate;
        address owner;
        SupplyChainTypes.SupplyChainEvent[] history;
    }

    constructor(address _drugContractAddress, address _supplyChainContractAddress) {
        drugContract = DrugContract(_drugContractAddress);
        supplyChainContract = SupplyChainContract(_supplyChainContractAddress);
    }

    function getDrugInfo(uint256 _batchId) public view returns (uint256, string memory, string memory, uint256, string memory, address) {
        return drugContract.getDrug(_batchId);
    }

    function getSupplyChain(uint256 _batchId) public view returns (SupplyChainTypes.SupplyChainEvent[] memory) {
        return supplyChainContract.getSupplyChainHistory(_batchId);
    }

    function verifyDrug(uint256 _batchId) public view returns (DrugVerificationResult memory) {
        (uint256 batchId, string memory name, string memory manufacturer, uint256 creationDate, string memory expiryDate, address owner) = drugContract.getDrug(_batchId);
        SupplyChainTypes.SupplyChainEvent[] memory history = supplyChainContract.getSupplyChainHistory(_batchId);

        return DrugVerificationResult(batchId, name, manufacturer, creationDate, expiryDate, owner, history);
    }
}