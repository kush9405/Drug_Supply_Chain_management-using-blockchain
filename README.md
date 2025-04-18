

# Drug Supply Chain Transparency System

This project implements a **blockchain-based solution** to ensure transparency and traceability in the drug supply chain. It leverages **smart contracts** to track drug batches, manage ownership, and record supply chain events, ensuring trust and transparency.

---

## Features

- **Drug Tracking**: 
  - Create and track drug batches with details such as batch ID, name, manufacturer, creation date, and expiry date.
- **Ownership Management**: 
  - Securely transfer ownership of drug batches on the blockchain.
- **Supply Chain Events**: 
  - Record and retrieve supply chain events associated with drug batches.
- **Transparency**: 
  - View the complete history of a drug batch, including all events and ownership changes.

---

## Folder Structure

```plaintext
📂 bhai_BC/
├── 📂 build/
│   ├── 📂 contracts/
│       ├── DrugContract.json
│       ├── SupplyChainContract.json
│       ├── SupplyChainTypes.json
│       └── VerificationContract.json
├── 📂 frontend/
│   ├── index.html       # User interface
│   ├── app.js           # JavaScript logic using Web3.js
│   ├── style.css        # Styles for the frontend
├── 📂 contracts/
│   ├── DrugContract.sol       # Smart contract for drug management
│   ├── SupplyChainContract.sol # Smart contract for supply chain events
│   ├── SupplyChainTypes.sol    # Shared data structures
│   └── VerificationContract.sol
└── 📂 migrations/
    └── Migration scripts for Truffle
```

---

## Smart Contracts Overview

1. **DrugContract.sol**:
   - Manages drug batches, including creation, ownership transfer, and retrieval of drug details.
   
2. **SupplyChainContract.sol**:
   - Handles supply chain events and maintains the history of drug batches.

3. **SupplyChainTypes.sol**:
   - Defines shared data structures used across contracts.

---

## Prerequisites

To run this project, ensure you have the following installed:

1. **Node.js**: [Install Node.js](https://nodejs.org/)
2. **Truffle**: Install globally using:
   ```bash
   npm install -g truffle
   ```
3. **Ganache**: Use Ganache for a local Ethereum blockchain.
4. **MetaMask**: [Install MetaMask](https://metamask.io/) browser extension.

---

## Setup and Deployment

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd Drug_Supply_Chain_management-using-blockchain
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Compile Smart Contracts**:
   ```bash
   truffle compile
   ```

4. **Deploy Smart Contracts**:
   ```bash
   truffle migrate
   ```

5. **Start the Frontend**:
   Open `frontend/index.html` in a browser.

---

## Usage Instructions

### Verify Drug
- Enter a **batch ID** in the input field and click "Verify" to view drug details and supply chain history.

### Create Drug
- Use the `createDrug` function in the **DrugContract** to create a new drug batch.

### Transfer Ownership
- Use the `transferOwnership` function to transfer ownership of a drug batch.

### Add Supply Chain Event
- Use the `addSupplyChainEvent` function to record a new event for a drug batch.

---

## Technologies Used

- **Solidity**: For writing smart contracts.
- **Truffle**: For development, testing, and deployment of smart contracts.
- **Web3.js**: For connecting the frontend to the Ethereum blockchain.
- **HTML/CSS/JavaScript**: For the user interface.

---

## License

This project is licensed under the **UNLICENSED** license.

---

## Acknowledgments

- Inspired by the need for transparency and trust in the pharmaceutical supply chain.
- Built using Ethereum blockchain technology.

---

Let me know if you'd like further refinements!
