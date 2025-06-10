let currentAccount = null;
let contractInstance = null;

// Replace with your contract address
const contractAddress = "0x0Bc037F6f9AA2CB47Fd94Bc1DCDD563Aab3a11AF"; 

// Replace with your contract ABI
const contractABI = [ {
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
 ];

async function connectWallet() {
  console.log("🔍 Checking for MetaMask...");
  if (typeof window.ethereum === 'undefined') {
    alert('🚫 MetaMask is not installed. Please install it to use this app.');
    return;
  }

  try {
    console.log("🔑 Requesting wallet access...");
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (!accounts || accounts.length === 0) {
      alert('❌ No account found. Please log into MetaMask.');
      return;
    }

    currentAccount = accounts[0];
    console.log("✅ Wallet connected:", currentAccount);
    document.getElementById("walletAddress").innerText = `Connected: ${currentAccount}`;

    // Ensure we're on Sepolia
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    console.log("🌐 Current chainId:", chainId);
 // chainId: '0xaa36a7'
    if (chainId !== '0xaa36a7') {
      console.log("🔄 Switching to Sepolia...");
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }]
      });
    }

    const web3 = new Web3(window.ethereum);
    contractInstance = new web3.eth.Contract(contractABI, contractAddress);

    console.log("📡 Contract instance loaded:", contractInstance);
    await loadCandidates();

  } catch (error) {
    console.error("❗ Wallet connection failed:", error);
    if (error.code === 4001) {
      alert('❌ Connection request rejected. Please allow access in MetaMask.');
    } else {
      alert('⚠️ Wallet connection failed. See console for details.');
    }
  }
}

function updateAdminFeatures() {
  contractInstance.methods.admin().call().then((adminAddress) => {
    const isAdmin = (currentAccount.toLowerCase() === adminAddress.toLowerCase());
    document.getElementById("adminPanel").style.display = isAdmin ? "block" : "none";
  });
}

async function registerAsVoter() {
  try {
    await contractInstance.methods.registerAsVoter().send({ from: currentAccount });
    alert("You have been registered as a voter.");
  } catch (err) {
    alert("Error registering as voter: " + err.message);
  }
}

async function addCandidate() {
  const name = document.getElementById("candidateName").value;
  const age = parseInt(document.getElementById("candidateAge").value);
  const party = document.getElementById("candidateParty").value;

  if (!name || !party || isNaN(age)) {
    alert("Please fill all candidate fields.");
    return;
  }

  try {
    await contractInstance.methods.addCandidate(name, age, party).send({ from: currentAccount });
    alert("Candidate added successfully.");
    await loadCandidates();
  } catch (err) {
    alert("Error adding candidate: " + err.message);
  }
}

async function loadCandidates() {
  try {
    const candidates = await contractInstance.methods.getCandidates().call();
    const dropdown = document.getElementById("candidateDropdown");
    dropdown.innerHTML = "";

    candidates.forEach(c => {
      const option = document.createElement("option");
      option.value = c.name;
      option.text = `${c.name} (${c.party})`;
      dropdown.appendChild(option);
    });
  } catch (err) {
    console.error("Error loading candidates:", err);
  }
}

async function vote() {
  const selected = document.getElementById("candidateDropdown").value;
  if (!selected) {
    alert("Please select a candidate.");
    return;
  }

  try {
    await contractInstance.methods.vote(selected).send({ from: currentAccount });
    alert("Vote cast successfully!");
  } catch (err) {
    alert("Voting failed: " + err.message);
  }
}

async function startVoting() {
  try {
    await contractInstance.methods.startVoting().send({ from: currentAccount });
    alert("Voting started.");
  } catch (err) {
    alert("Failed to start voting: " + err.message);
  }
}

async function endVoting() {
  try {
    await contractInstance.methods.endVoting().send({ from: currentAccount });
    alert("Voting ended.");
  } catch (err) {
    alert("Failed to end voting: " + err.message);
  }
}

async function viewResults() {
  try {
    const resultDiv = document.getElementById("resultsDiv");
    resultDiv.innerHTML = "";

    const [names, parties, votes] = await contractInstance.methods.viewResults().call();
    for (let i = 0; i < names.length; i++) {
      const line = `${names[i]} (${parties[i]}) - ${votes[i]} votes`;
      const p = document.createElement("p");
      p.innerText = line;
      resultDiv.appendChild(p);
    }

    const winner = await contractInstance.methods.getWinner().call();
    document.getElementById("winnerDiv").innerText =
      `🏆 Winner: ${winner.name} (${winner.party}) with ${winner.votes} votes`;

  } catch (err) {
    alert("Could not fetch results: " + err.message);
  }
}

// Listen for MetaMask changes
if (window.ethereum) {
  window.ethereum.on('accountsChanged', () => window.location.reload());
  window.ethereum.on('chainChanged', () => window.location.reload());
}
