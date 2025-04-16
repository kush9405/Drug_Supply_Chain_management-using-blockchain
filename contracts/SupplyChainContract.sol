// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./SupplyChainTypes.sol";

contract SupplyChainContract {
    using SupplyChainTypes for SupplyChainTypes.SupplyChainEvent[]; // Important for array operations

    mapping(uint256 => SupplyChainTypes.SupplyChainEvent[]) public supplyChainHistory;

    event SupplyChainEventAdded(uint256 batchId, string eventType, address actor, uint256 timestamp);

    function addSupplyChainEvent(uint256 _batchId, string memory _eventType) public {
        SupplyChainTypes.SupplyChainEvent memory newEvent = SupplyChainTypes.SupplyChainEvent({
            batchId: _batchId,
            eventType: _eventType,
            actor: msg.sender,
            timestamp: block.timestamp
        });

        supplyChainHistory[_batchId].push(newEvent);
        emit SupplyChainEventAdded(_batchId, _eventType, msg.sender, block.timestamp);
    }

    function getSupplyChainHistory(uint256 _batchId) public view returns (SupplyChainTypes.SupplyChainEvent[] memory) {
        return supplyChainHistory[_batchId];
    }
}