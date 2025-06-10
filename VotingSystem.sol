// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VotingSystem {
    struct Candidate {
        string name;
        uint age;
        string party;
        uint voteCount;
        address candidateAddress;
    }

    struct Voter {
        bool isRegistered;
        bool hasVoted;
    }

    address public admin;
    bool public votingStarted = false;
    bool public votingEnded = false;
    uint public winnerIndex;

    Candidate[] public candidates;
    mapping(address => Voter) public voters;
    mapping(string => uint) private candidateNameToIndex;
    mapping(address => bool) private isCandidate;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action.");
        _;
    }

    modifier onlyBeforeVoting() {
        require(!votingStarted, "Cannot perform this action during or after voting.");
        _;
    }

    modifier onlyWhenVotingActive() {
        require(votingStarted && !votingEnded, "Voting is not currently active.");
        _;
    }

    // 1. Add candidate (auto-assigns sender's address, ensures unique)
    function addCandidate(string memory _name, uint _age, string memory _party) public onlyBeforeVoting {
        require(!isCandidate[msg.sender], "You have already registered as a candidate.");
        require(bytes(_name).length > 0 && bytes(_party).length > 0, "Invalid candidate details.");

        candidates.push(Candidate({
            name: _name,
            age: _age,
            party: _party,
            voteCount: 0,
            candidateAddress: msg.sender
        }));

        candidateNameToIndex[_name] = candidates.length - 1;
        isCandidate[msg.sender] = true;
    }

    // 2. Get number of candidates
    function getCandidateCount() public view returns (uint) {
        return candidates.length;
    }

    // 3. Get candidate list
    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    // 4. Start voting (admin only)
    function startVoting() public onlyAdmin onlyBeforeVoting {
        require(candidates.length > 0, "No candidates registered.");
        votingStarted = true;
        votingEnded = false;
    }

    // 5. Register as voter (before voting starts)
    function registerAsVoter() public onlyBeforeVoting {
        require(!voters[msg.sender].isRegistered, "Already registered.");
        voters[msg.sender] = Voter(true, false);
    }

    // 6. Vote for a candidate by name (once per voter)
    function vote(string memory _name) public onlyWhenVotingActive {
        Voter storage sender = voters[msg.sender];
        require(sender.isRegistered, "Not registered as a voter.");
        require(!sender.hasVoted, "You have already voted.");

        uint index = candidateNameToIndex[_name];
        require(index < candidates.length, "Candidate not found.");

        candidates[index].voteCount += 1;
        sender.hasVoted = true;
    }

    // 7. End voting and declare winner (admin only)
    function endVoting() public onlyAdmin onlyWhenVotingActive {
        votingEnded = true;
        votingStarted = false;

        uint maxVotes = 0;
        uint winnerIdx = 0;

        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winnerIdx = i;
            }
        }

        winnerIndex = winnerIdx;
    }

    // 8. View results
    function viewResults() public view returns (string[] memory names, string[] memory parties, uint[] memory votes) {
        uint len = candidates.length;
        names = new string[](len);
        parties = new string[](len);
        votes = new uint[](len);

        for (uint i = 0; i < len; i++) {
            names[i] = candidates[i].name;
            parties[i] = candidates[i].party;
            votes[i] = candidates[i].voteCount;
        }
    }

    // 9. Get winner details
    function getWinner() public view returns (string memory name, uint votes, string memory party) {
        require(votingEnded, "Voting not yet ended.");
        Candidate memory winner = candidates[winnerIndex];
        return (winner.name, winner.voteCount, winner.party);
    }
}
