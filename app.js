
const contractAddress = "0x0Bc037F6f9AA2CB47Fd94Bc1DCDD563Aab3a11AF";
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
		"name": "admin",
		"outputs": [
			{"internalType": "address", "name": "", "type": "address"}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
		"name": "candidates",
		"outputs": [
			{"internalType": "string", "name": "name", "type": "string"},
			{"internalType": "uint256", "name": "age", "type": "uint256"},
			{"internalType": "string", "name": "party", "type": "string"},
			{"internalType": "uint256", "name": "voteCount", "type": "uint256"},
			{"internalType": "address", "name": "candidateAddress", "type": "address"}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCandidateCount",
		"outputs": [
			{"internalType": "uint256", "name": "", "type": "uint256"}
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
		"name": "getWinner",
		"outputs": [
			{"internalType": "string", "name": "name", "type": "string"},
			{"internalType": "uint256", "name": "votes", "type": "uint256"},
			{"internalType": "string", "name": "party", "type": "string"}
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
		"inputs": [{"internalType": "address", "name": "", "type": "address"}],
		"name": "voters",
		"outputs": [
			{"internalType": "bool", "name": "isRegistered", "type": "bool"},
			{"internalType": "bool", "name": "hasVoted", "type": "bool"}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "votingEnded",
		"outputs": [
			{"internalType": "bool", "name": "", "type": "bool"}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "votingStarted",
		"outputs": [
			{"internalType": "bool", "name": "", "type": "bool"}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winnerIndex",
		"outputs": [
			{"internalType": "uint256", "name": "", "type": "uint256"}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; // ABI omitted here for brevity, will be added below
// JS functions (same as previous message)
