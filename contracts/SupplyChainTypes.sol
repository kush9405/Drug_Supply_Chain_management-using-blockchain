pragma solidity ^0.8.0;

library SupplyChainTypes {
    struct SupplyChainEvent {
        uint256 batchId;
        string eventType;
        address actor;
        uint256 timestamp;
    }
}