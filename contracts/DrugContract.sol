// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract DrugContract {
    struct Drug {
        uint256 batchId;
        string name;
        string manufacturer;
        uint256 creationDate; // Unix timestamp
        string expiryDate; // Expiry Date
        address owner; // Track the current owner
    }

    mapping(uint256 => Drug) public drugs;
    uint256 public drugCount;

    event DrugCreated(uint256 batchId, string name, string manufacturer, address owner);
    event DrugOwnershipTransferred(uint256 batchId, address oldOwner, address newOwner);

    constructor() {
        drugCount = 0;
    }

    function createDrug(
        uint256 _batchId,
        string memory _name,
        string memory _manufacturer,
        uint256 _creationDate,
        string memory _expiryDate
    ) public {
        require(drugs[_batchId].batchId == 0, "Drug with this batch ID already exists.");
        drugCount++; // Increment counter, can be used as internal ID if needed.

        Drug memory newDrug = Drug({
            batchId: _batchId,
            name: _name,
            manufacturer: _manufacturer,
            creationDate: _creationDate,
            expiryDate: _expiryDate,
            owner: msg.sender
        });

        drugs[_batchId] = newDrug;

        emit DrugCreated(_batchId, _name, _manufacturer, msg.sender);
    }

    function transferOwnership(uint256 _batchId, address _newOwner) public {
        require(drugs[_batchId].owner == msg.sender, "Only the current owner can transfer ownership.");
        drugs[_batchId].owner = _newOwner;
        emit DrugOwnershipTransferred(_batchId, msg.sender, _newOwner);
    }

    function getDrug(uint256 _batchId) public view returns (uint256, string memory, string memory, uint256, string memory, address) {
        Drug memory drug = drugs[_batchId];
        require(drug.batchId != 0, "Drug with this batch ID does not exist.");
        return (drug.batchId, drug.name, drug.manufacturer, drug.creationDate, drug.expiryDate, drug.owner);
    }
}