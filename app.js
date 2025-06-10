const contractAddress =  "0x0Bc037F6f9AA2CB47Fd94Bc1DCDD563Aab3a11AF";

const abi = [
	{
		"inputs": [
			{"internalType": "string", "name": "_name", "type": "string"},
			{"internalType": "uint256", "name": "_age", "type": "uint256"},
			{"internalType": "string", "name": "_party", "type": "string"}
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
		"inputs": [
			{"internalType": "string", "name": "_name", "type": "string"}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCandidates",
		"outputs": [
			{
				"components": [
					{"internalType": "string", "name": "name", "type": "string"},
					{"internalType": "uint256", "name": "age", "type": "uint256"},
					{"internalType": "string", "name": "party", "type": "string"},
					{"internalType": "uint256", "name": "voteCount", "type": "uint256"},
					{"internalType": "address", "name": "candidateAddress", "type": "address"}
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
		"name": "viewResults",
		"outputs": [
			{"internalType": "string[]", "name": "names", "type": "string[]"},
			{"internalType": "string[]", "name": "parties", "type": "string[]"},
			{"internalType": "uint256[]", "name": "votes", "type": "uint256[]"}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWinner",
		"outputs": [
			{"internalType": "string", "name": "name", "type": "string"},
			{"internalType": "uint256", "name": "votes", "type": "uint256"},
			{"internalType": "string", "name": "party", "type": "string"}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let contract;
let signer;

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      currentAccount = accounts[0];
      document.getElementById("walletAddress").innerText = `Connected: ${currentAccount}`;
      await loadCandidates(); // Load candidate list after connection
    } catch (error) {
      console.error("User denied wallet connection:", error);
      alert("Wallet connection failed. Please allow access in MetaMask.");
    }
  } else {
    alert("MetaMask not detected! Please install MetaMask.");
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
