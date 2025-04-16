// frontend/app.js
document.addEventListener('DOMContentLoaded', async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask!');
        return;
    }

    // Initialize Web3
    window.web3 = new Web3(window.ethereum);

    // Request account access if needed
    try {
        await window.ethereum.enable();
    } catch (error) {
        console.error("User denied account access");
        return;
    }

    // Contract addresses (replace with your deployed contract addresses)
    const drugContractAddress = "0x8B2b4Ce4f262e9e7cd923F4e813cdde7BEc2A5f5";
    const supplyChainContractAddress = "0xCEfB545dFC18aAbc6917c78281FbEC44BbFB8b1F";
    const verificationContractAddress = "0xA67D3cB8F88F60455aEF32c4D939F3aF0898adFc"; // Replace with your deployed VerificationContract address

    // ABI (replace with your contract ABIs)
    const drugContractABI = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "batchId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "manufacturer",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "DrugCreated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "batchId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "oldOwner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "DrugOwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_batchId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_manufacturer",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_creationDate",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_expiryDate",
                    "type": "string"
                }
            ],
            "name": "createDrug",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_batchId",
                    "type": "uint256"
                }
            ],
            "name": "getDrug",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "drugCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "drugs",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "batchId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "manufacturer",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "creationDate",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "expiryDate",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_batchId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    const supplyChainContractABI = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "batchId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "eventType",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "actor",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "SupplyChainEventAdded",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_batchId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_eventType",
                    "type": "string"
                }
            ],
            "name": "addSupplyChainEvent",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "supplyChainHistory",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "batchId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "eventType",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "actor",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_batchId",
                    "type": "uint256"
                }
            ],
            "name": "getSupplyChainHistory",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "batchId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "eventType",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "actor",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct SupplyChainContract.SupplyChainEvent[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const verificationContractABI = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_drugContractAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_supplyChainContractAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_batchId",
                    "type": "uint256"
                }
            ],
            "name": "getDrugInfo",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_batchId",
                    "type": "uint256"
                }
            ],
            "name": "getSupplyChain",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "batchId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "eventType",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "actor",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct SupplyChainContract.SupplyChainEvent[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_batchId",
                    "type": "uint256"
                }
            ],
            "name": "verifyDrug",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "batchId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "eventType",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "actor",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct SupplyChainContract.SupplyChainEvent[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    // Create contract instances
    const drugContract = new web3.eth.Contract(drugContractABI, drugContractAddress);
    const supplyChainContract = new web3.eth.Contract(supplyChainContractABI, supplyChainContractAddress);
    const verificationContract = new web3.eth.Contract(verificationContractABI, verificationContractAddress);

    // Get elements
    const verifyButton = document.getElementById('verifyButton');
    const batchIdInput = document.getElementById('batchId');
    const drugInfoDiv = document.getElementById('drug-info');
    const supplyChainHistoryDiv = document.getElementById('supply-chain-history');
    const historyList = document.getElementById('history-list');

    const drugBatchIdSpan = document.getElementById('drug-batchId');
    const drugNameSpan = document.getElementById('drug-name');
    const drugManufacturerSpan = document.getElementById('drug-manufacturer');
    const drugCreationDateSpan = document.getElementById('drug-creationDate');
    const drugExpiryDateSpan = document.getElementById('drug-expiryDate');
    const drugOwnerSpan = document.getElementById('drug-owner');

    // Verify button click handler
    verifyButton.addEventListener('click', async () => {
        const batchId = parseInt(batchIdInput.value);

        if (isNaN(batchId)) {
            alert('Please enter a valid batch ID.');
            return;
        }

        try {
            const result = await verificationContract.methods.verifyDrug(batchId).call();

            // Extract data from the result
            const drugBatchId = result[0];
            const drugName = result[1];
            const drugManufacturer = result[2];
            const drugCreationDate = result[3];
            const drugExpiryDate = result[4];
            const drugOwner = result[5];
            const history = result[6];

            // Display Drug Information
            drugBatchIdSpan.textContent = drugBatchId;
            drugNameSpan.textContent = drugName;
            drugManufacturerSpan.textContent = drugManufacturer;
            drugCreationDateSpan.textContent = new Date(drugCreationDate * 1000).toLocaleDateString(); // Convert timestamp to date
            drugExpiryDateSpan.textContent = drugExpiryDate;
            drugOwnerSpan.textContent = drugOwner;

            drugInfoDiv.classList.remove('hidden');

            // Display Supply Chain History
            historyList.innerHTML = ''; // Clear previous history

            history.forEach(event => {
                const listItem = document.createElement('li');
                listItem.textContent = `Event: ${event.eventType}, Actor: ${event.actor}, Timestamp: ${new Date(event.timestamp * 1000).toLocaleDateString()}`;
                historyList.appendChild(listItem);
            });

            supplyChainHistoryDiv.classList.remove('hidden');

        } catch (error) {
            console.error("Error verifying drug:", error);
            alert('Error verifying drug.  Check the console for details.');
        }
    });
});