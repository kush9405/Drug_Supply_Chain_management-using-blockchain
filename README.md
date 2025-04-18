# Drug Supply Chain Transparency System

This project implements a blockchain-based solution to ensure transparency and traceability in the drug supply chain. It leverages smart contracts to track drug batches, their ownership, and supply chain events, providing a tamper-proof record of the drug's journey from manufacturer to end-user.

## Features

- **Drug Tracking**: Create and track drug batches with details such as batch ID, name, manufacturer, creation date, and expiry date.
- **Ownership Management**: Transfer ownership of drug batches securely on the blockchain.
- **Supply Chain Events**: Record and retrieve supply chain events associated with drug batches.
- **Transparency**: View the complete history of a drug batch, including all events and ownership changes.

## Folder Structure
bhai_BC/ ├── build/ │ ├── contracts/ │ │ ├── DrugContract.json │ │ ├── SupplyChainContract.json │ │ ├── SupplyChainTypes.json │ │ └── VerificationContract.json ├── contracts/ │ ├── DrugContract.sol │ ├── SupplyChainContract.sol │ └── SupplyChainTypes.sol ├── frontend/ │ ├── app.js │ ├── index.html │ └── style.css └── README.md

### Key Components

1. **Smart Contracts**:
   - **DrugContract.sol**: Manages drug batches, including creation, ownership transfer, and retrieval of drug details.
   - **SupplyChainContract.sol**: Handles supply chain events and maintains the history of drug batches.
   - **SupplyChainTypes.sol**: Defines shared data structures used across contracts.

2. **Frontend**:
   - **index.html**: User interface for interacting with the system.
   - **app.js**: JavaScript logic for connecting the frontend to the blockchain using Web3.js.
   - **style.css**: Styles for the frontend.

3. **Build Artifacts**:
   - JSON files in the `build/contracts/` directory contain the ABI and bytecode for the deployed smart contracts.

## Prerequisites

- **Node.js**: Install [Node.js](https://nodejs.org/).
- **Truffle**: Install Truffle globally using `npm install -g truffle`.
- **Ganache**: Use Ganache for a local Ethereum blockchain.
- **MetaMask**: Install the MetaMask browser extension for interacting with the blockchain.

## Setup and Deployment

1. Clone the repository:
   ```bash
   git clone <repository-url>


Install dependencies:

npm install
Compile the smart contracts:

truffle compile
Deploy the smart contracts:

truffle migrate
Start the frontend: Open frontend/index.html in a browser.

Usage
Verify Drug:

Enter a batch ID in the input field and click "Verify" to view drug details and supply chain history.
Create Drug:

Use the createDrug function in the DrugContract to create a new drug batch.
Transfer Ownership:

Use the transferOwnership function to transfer ownership of a drug batch.
Add Supply Chain Event:

Use the addSupplyChainEvent function to record a new event for a drug batch.
Smart Contract ABIs
The ABIs for the deployed smart contracts are located in the build/contracts/ directory. These are used by the frontend to interact with the blockchain.

Technologies Used
Solidity: For writing smart contracts.
Truffle: For development, testing, and deployment of smart contracts.
Web3.js: For connecting the frontend to the Ethereum blockchain.
HTML/CSS/JavaScript: For the user interface.
License
This project is licensed under the UNLICENSED license.

Acknowledgments
Inspired by the need for transparency and trust in the pharmaceutical supply chain.
Built using Ethereum blockchain technology.

This `README.md` provides an overview of the project, its features, folder structure, setup instructions, and usage details. Let me know if you'd like to customize it further!

