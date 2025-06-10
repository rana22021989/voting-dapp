const contractAddress =  "0x0Bc037F6f9AA2CB47Fd94Bc1DCDD563Aab3a11AF";

const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_party",
				"type": "string"
			}
		],
		"name": "addCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endVoting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "registerAsVoter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startVoting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "party",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "candidateAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCandidateCount",
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
		"inputs": [],
		"name": "getCandidates",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "age",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "party",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "voteCount",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "candidateAddress",
						"type": "address"
					}
				],
				"internalType": "struct VotingSystem.Candidate[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWinner",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "votes",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "party",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewResults",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "names",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "parties",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "votes",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"internalType": "bool",
				"name": "isRegistered",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "hasVoted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "votingEnded",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "votingStarted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winnerIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
] ;


let contract;
let signer;

let currentAccount = null;
let contractInstance;

async function connectWallet() {
  if (typeof window.ethereum === 'undefined') {
    alert('MetaMask is not installed. Please install it to use this app.');
    return;
  }

  try {
    // Request account access
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    currentAccount = accounts[0];
    document.getElementById("walletAddress").innerText = `Connected: ${currentAccount}`;

    // Connect to Sepolia (chainId: 11155111 or 0xaa36a7)
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    if (chainId !== '0xaa36a7') {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }] // Sepolia
      });
    }

    // Load contract
    const web3 = new Web3(window.ethereum);
    contractInstance = new web3.eth.Contract(contractABI, contractAddress);

    await loadCandidates();
  } catch (error) {
    console.error(error);
    alert('Wallet connection failed. Please allow access in MetaMask.');
  }
}
async function registerAsVoter() {
  await contract.registerAsVoter();
  alert("Registered successfully!");
}

async function addCandidate() {
  const name = document.getElementById("candidateName").value;
  const age = parseInt(document.getElementById("candidateAge").value);
  const party = document.getElementById("candidateParty").value;
  await contract.addCandidate(name, age, party);
  alert("Candidate added!");
  populateCandidates();
}

async function startVoting() {
  await contract.startVoting();
  alert("Voting started!");
}

async function endVoting() {
  await contract.endVoting();
  alert("Voting ended!");
}

async function voteCandidate() {
  const dropdown = document.getElementById("candidateDropdown");
  const name = dropdown.value.split(" - ")[0];
  await contract.vote(name);
  alert("Vote casted!");
}

async function viewResults() {
  const resultDiv = document.getElementById("results");
  const [names, parties, votes] = await contract.viewResults();
  let html = "<table><tr><th>Name</th><th>Party</th><th>Votes</th></tr>";
  for (let i = 0; i < names.length; i++) {
    html += `<tr><td>${names[i]}</td><td>${parties[i]}</td><td>${votes[i]}</td></tr>`;
  }
  html += "</table>";
  resultDiv.innerHTML = html;
}

async function viewWinner() {
  const winner = await contract.getWinner();
  document.getElementById("winner").innerText = `Winner: ${winner.name} (${winner.party}) with ${winner.votes} votes`;
}

async function populateCandidates() {
  const candidates = await contract.getCandidates();
  const dropdown = document.getElementById("candidateDropdown");
  dropdown.innerHTML = "";
  candidates.forEach(c => {
    const option = document.createElement("option");
    option.value = `${c.name} - ${c.party}`;
    option.innerText = `${c.name} - ${c.party}`;
    dropdown.appendChild(option);
  });
}
