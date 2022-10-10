Week3 weekend project

1. Deploy myERC20Votes.sol
   a. Tx hash: 0x3b688bd6dd6f1e14b39af773adb509307d91aa90492bea75bc1b01642e7f2216
   b. ERC20 deployed at address: 0x645d61534e1B1e18A24892C3Fadf6FB71c72CD2B
2. Mint tokens:
   a. Tx hashes: 0x5be0e6e04d9291c7df810616b9e41b13bcd1fb136007de96b27de74feaca266d, 0xc7081814567c79fd920e2c8db5848be7739213ffcaaf5f8f544853c7a076e19a
3. Delegate votes:
   a. Tx hash: 0xe34263b34a655c82b7ca0688d50ce65437d062c2286ec8e34959c5815ca016a7, 0xd26c226d509d383bf5bc77caffe23a02a554139d448d26840e5ff38fbd90e776
4. Deploy TokenizedBallot.sol
   a. Tx hash: 0x8278d1ba1072a85b4e65984a3ee62080ffbf541e27dccf12236674a9b9e8fba3
   b. Deployed to address: 0xc4F9E897d069b36d75a109721Fa84797f313C711
5. Vote
   a. Tx hashes: 0x6cd659fd6efed793bcab0484e242142e8f05832df756ebfba6b30239af500e29, 0xdef88d0e17225b58b65f7623a94c452da05425b6df60124eb86a51a37f028989
   Script says vote using half of each voting power but the script was run > twice therefore almost all voting power 98.4375% was used. I believe this is not 100% due to the rounding errors, but (10^18)/2 should resolve fine so I don’t see where the rounding occurs?
