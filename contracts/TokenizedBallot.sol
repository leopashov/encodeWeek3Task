// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

interface ITokenizedVotes {
    // we need to create an interface here which lets us call 'getPastVotes'
    // from the token contract.
    // we know getPastVotes is a view function as it doesnt write
    // and also depends on state of blockchain (therefore is not pure)
    // or just check function definition
    // functions in interfaces always labelled external
    function getPastVotes(address, uint256) external view returns (uint256);
}

contract TokenizedBallot {
    uint256 public referenceBlock;
    ITokenizedVotes public tokenContract;

    struct Proposal {
        bytes32 name;
        uint256 voteCount;
    }

    Proposal[] public proposals;
    mapping(address => uint256) public votePowerSpent;

    constructor(
        bytes32[] memory proposalNames,
        address _tokenContract,
        uint256 _referenceBlock
    ) {
        // add to list of proposals 'proposals' (stored in contract memory)
        // each proposal which has been passed into the constructor
        for (uint256 i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({voteCount: 0, name: proposalNames[i]}));
        }
        // typecast _tokenContract address as ITokenizedVotes to get
        // callable contract instance
        tokenContract = ITokenizedVotes(_tokenContract);
        referenceBlock = _referenceBlock;
    }

    function votePower(address account)
        public
        view
        returns (uint256 votePower_)
    {
        votePower_ =
            tokenContract.getPastVotes(account, referenceBlock) -
            votePowerSpent[account];
    }

    function vote(uint256 proposal, uint256 amount) public {
        uint256 votePower_ = votePower(msg.sender);
        require(
            votePower_ >= amount,
            "Tokenizedballot: trying to vote more than the vote power available for this account"
        );
        votePowerSpent[msg.sender] += amount;
        proposals[proposal].voteCount += amount;
    }

    function winningProposal() public view returns (uint256 winningProposal_) {
        uint256 winningVoteCount = 0;
        for (uint256 p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function winnerName() external view returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }
}
