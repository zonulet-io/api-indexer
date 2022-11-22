const Web3 = require('web3');
const fs = require('fs');
const web3 = new Web3('https://rpc.onechain.services');


async function getNFTs() {

    var images = [];

    const zonuletAbi = [{
        "stateMutability": "nonpayable",
        "inputs": [],
        "type": "constructor"
    }, {
        "type": "event",
        "name": "Approval",
        "anonymous": false,
        "inputs": [{
            "type": "address",
            "indexed": true,
            "internalType": "address",
            "name": "owner"
        }, {
            "name": "spender",
            "indexed": true,
            "internalType": "address",
            "type": "address"
        }, {
            "indexed": false,
            "type": "uint256",
            "name": "value",
            "internalType": "uint256"
        }]
    }, {
        "type": "event",
        "anonymous": false,
        "name": "ExcludeFromFees",
        "inputs": [{
            "type": "address",
            "name": "account",
            "internalType": "address",
            "indexed": true
        }, {
            "type": "bool",
            "indexed": false,
            "name": "isExcluded",
            "internalType": "bool"
        }]
    }, {
        "type": "event",
        "name": "ExcludeMultipleAccountsFromFees",
        "inputs": [{
            "internalType": "address[]",
            "indexed": false,
            "name": "accounts",
            "type": "address[]"
        }, {
            "indexed": false,
            "name": "isExcluded",
            "type": "bool",
            "internalType": "bool"
        }],
        "anonymous": false
    }, {
        "type": "event",
        "name": "GasForProcessingUpdated",
        "inputs": [{
            "type": "uint256",
            "internalType": "uint256",
            "indexed": true,
            "name": "newValue"
        }, {
            "type": "uint256",
            "internalType": "uint256",
            "name": "oldValue",
            "indexed": true
        }],
        "anonymous": false
    }, {
        "inputs": [{
            "name": "newLiquidityWallet",
            "indexed": true,
            "type": "address",
            "internalType": "address"
        }, {
            "internalType": "address",
            "indexed": true,
            "type": "address",
            "name": "oldLiquidityWallet"
        }],
        "name": "LiquidityWalletUpdated",
        "anonymous": false,
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "name": "previousOwner",
            "type": "address",
            "internalType": "address"
        }, {
            "name": "newOwner",
            "internalType": "address",
            "type": "address",
            "indexed": true
        }],
        "name": "OwnershipTransferred",
        "type": "event"
    }, {
        "anonymous": false,
        "type": "event",
        "name": "ProcessedDividendTracker",
        "inputs": [{
            "type": "uint256",
            "name": "iterations",
            "indexed": false,
            "internalType": "uint256"
        }, {
            "internalType": "uint256",
            "type": "uint256",
            "name": "claims",
            "indexed": false
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "lastProcessedIndex",
            "type": "uint256"
        }, {
            "internalType": "bool",
            "name": "automatic",
            "type": "bool",
            "indexed": true
        }, {
            "indexed": false,
            "internalType": "uint256",
            "type": "uint256",
            "name": "gas"
        }, {
            "type": "address",
            "name": "processor",
            "indexed": true,
            "internalType": "address"
        }]
    }, {
        "type": "event",
        "anonymous": false,
        "inputs": [{
            "internalType": "uint256",
            "indexed": false,
            "type": "uint256",
            "name": "tokensSwapped"
        }, {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256",
            "indexed": false
        }],
        "name": "SendDividends"
    }, {
        "name": "SetAutomatedMarketMakerPair",
        "inputs": [{
            "type": "address",
            "internalType": "address",
            "indexed": true,
            "name": "pair"
        }, {
            "type": "bool",
            "indexed": true,
            "internalType": "bool",
            "name": "value"
        }],
        "anonymous": false,
        "type": "event"
    }, {
        "type": "event",
        "inputs": [{
            "internalType": "uint256",
            "type": "uint256",
            "name": "tokensSwapped",
            "indexed": false
        }, {
            "internalType": "uint256",
            "indexed": false,
            "name": "ethReceived",
            "type": "uint256"
        }, {
            "indexed": false,
            "name": "tokensIntoLiqudity",
            "type": "uint256",
            "internalType": "uint256"
        }],
        "anonymous": false,
        "name": "SwapAndLiquify"
    }, {
        "name": "Transfer",
        "anonymous": false,
        "inputs": [{
            "internalType": "address",
            "indexed": true,
            "name": "from",
            "type": "address"
        }, {
            "name": "to",
            "type": "address",
            "internalType": "address",
            "indexed": true
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        }],
        "type": "event"
    }, {
        "name": "UpdateDividendTracker",
        "inputs": [{
            "internalType": "address",
            "name": "newAddress",
            "indexed": true,
            "type": "address"
        }, {
            "name": "oldAddress",
            "type": "address",
            "indexed": true,
            "internalType": "address"
        }],
        "anonymous": false,
        "type": "event"
    }, {
        "type": "event",
        "name": "UpdateUniswapV2Router",
        "inputs": [{
            "name": "newAddress",
            "indexed": true,
            "type": "address",
            "internalType": "address"
        }, {
            "type": "address",
            "name": "oldAddress",
            "indexed": true,
            "internalType": "address"
        }],
        "anonymous": false
    }, {
        "outputs": [{
            "type": "address",
            "name": "",
            "internalType": "address"
        }],
        "inputs": [],
        "stateMutability": "view",
        "name": "DEZU",
        "type": "function"
    }, {
        "type": "function",
        "inputs": [],
        "outputs": [{
            "internalType": "uint256",
            "type": "uint256",
            "name": ""
        }],
        "name": "DEZURewardsFee",
        "stateMutability": "view"
    }, {
        "type": "function",
        "outputs": [{
            "type": "bool",
            "internalType": "bool",
            "name": ""
        }],
        "name": "_isBlacklisted",
        "inputs": [{
            "type": "address",
            "internalType": "address",
            "name": ""
        }],
        "stateMutability": "view"
    }, {
        "stateMutability": "view",
        "name": "_marketingWalletAddress",
        "type": "function",
        "inputs": [],
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }]
    }, {
        "outputs": [{
            "name": "",
            "internalType": "uint256",
            "type": "uint256"
        }],
        "type": "function",
        "stateMutability": "view",
        "inputs": [{
            "type": "address",
            "name": "owner",
            "internalType": "address"
        }, {
            "type": "address",
            "internalType": "address",
            "name": "spender"
        }],
        "name": "allowance"
    }, {
        "type": "function",
        "stateMutability": "nonpayable",
        "inputs": [{
            "internalType": "address",
            "type": "address",
            "name": "spender"
        }, {
            "type": "uint256",
            "name": "amount",
            "internalType": "uint256"
        }],
        "name": "approve",
        "outputs": [{
            "type": "bool",
            "internalType": "bool",
            "name": ""
        }]
    }, {
        "stateMutability": "view",
        "type": "function",
        "inputs": [{
            "internalType": "address",
            "type": "address",
            "name": ""
        }],
        "outputs": [{
            "internalType": "bool",
            "type": "bool",
            "name": ""
        }],
        "name": "automatedMarketMakerPairs"
    }, {
        "name": "balanceOf",
        "type": "function",
        "stateMutability": "view",
        "inputs": [{
            "internalType": "address",
            "name": "account",
            "type": "address"
        }],
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }]
    }, {
        "type": "function",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "name": "deadWallet",
        "inputs": []
    }, {
        "stateMutability": "view",
        "inputs": [],
        "type": "function",
        "name": "decimals",
        "outputs": [{
            "name": "",
            "type": "uint8",
            "internalType": "uint8"
        }]
    }, {
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "decreaseAllowance",
        "inputs": [{
            "internalType": "address",
            "type": "address",
            "name": "spender"
        }, {
            "internalType": "uint256",
            "type": "uint256",
            "name": "subtractedValue"
        }],
        "outputs": [{
            "name": "",
            "type": "bool",
            "internalType": "bool"
        }]
    }, {
        "outputs": [{
            "type": "address",
            "name": "",
            "internalType": "contract ZoNuletDividendTracker"
        }],
        "stateMutability": "view",
        "name": "dividendTracker",
        "type": "function",
        "inputs": []
    }, {
        "type": "function",
        "inputs": [],
        "outputs": [{
            "type": "uint256",
            "name": "",
            "internalType": "uint256"
        }],
        "stateMutability": "view",
        "name": "gasForProcessing"
    }, {
        "outputs": [{
            "internalType": "bool",
            "type": "bool",
            "name": ""
        }],
        "inputs": [{
            "internalType": "address",
            "name": "spender",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "addedValue",
            "type": "uint256"
        }],
        "type": "function",
        "stateMutability": "nonpayable",
        "name": "increaseAllowance"
    }, {
        "name": "liquidityFee",
        "outputs": [{
            "internalType": "uint256",
            "type": "uint256",
            "name": ""
        }],
        "type": "function",
        "inputs": [],
        "stateMutability": "view"
    }, {
        "name": "marketingFee",
        "type": "function",
        "stateMutability": "view",
        "inputs": [],
        "outputs": [{
            "type": "uint256",
            "name": "",
            "internalType": "uint256"
        }]
    }, {
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "name": "maxWalletTokens",
        "outputs": [{
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
        }]
    }, {
        "outputs": [{
            "internalType": "string",
            "type": "string",
            "name": ""
        }],
        "type": "function",
        "name": "name",
        "inputs": [],
        "stateMutability": "view"
    }, {
        "type": "function",
        "outputs": [{
            "name": "",
            "type": "address",
            "internalType": "address"
        }],
        "stateMutability": "view",
        "inputs": [],
        "name": "owner"
    }, {
        "stateMutability": "nonpayable",
        "outputs": [],
        "type": "function",
        "name": "renounceOwnership",
        "inputs": []
    }, {
        "stateMutability": "view",
        "outputs": [{
            "type": "uint256",
            "name": "",
            "internalType": "uint256"
        }],
        "inputs": [],
        "type": "function",
        "name": "swapTokensAtAmount"
    }, {
        "type": "function",
        "outputs": [{
            "name": "",
            "type": "string",
            "internalType": "string"
        }],
        "stateMutability": "view",
        "name": "symbol",
        "inputs": []
    }, {
        "name": "totalFees",
        "inputs": [],
        "type": "function",
        "stateMutability": "view",
        "outputs": [{
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
        }]
    }, {
        "type": "function",
        "stateMutability": "view",
        "outputs": [{
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
        }],
        "name": "totalSupply",
        "inputs": []
    }, {
        "stateMutability": "nonpayable",
        "name": "transfer",
        "inputs": [{
            "name": "recipient",
            "type": "address",
            "internalType": "address"
        }, {
            "internalType": "uint256",
            "type": "uint256",
            "name": "amount"
        }],
        "type": "function",
        "outputs": [{
            "name": "",
            "internalType": "bool",
            "type": "bool"
        }]
    }, {
        "type": "function",
        "name": "transferFrom",
        "outputs": [{
            "name": "",
            "internalType": "bool",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "inputs": [{
            "internalType": "address",
            "type": "address",
            "name": "sender"
        }, {
            "type": "address",
            "name": "recipient",
            "internalType": "address"
        }, {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }]
    }, {
        "type": "function",
        "outputs": [],
        "inputs": [{
            "type": "address",
            "name": "newOwner",
            "internalType": "address"
        }],
        "stateMutability": "nonpayable",
        "name": "transferOwnership"
    }, {
        "type": "function",
        "outputs": [{
            "type": "address",
            "name": "",
            "internalType": "address"
        }],
        "stateMutability": "view",
        "name": "uniswapV2Pair",
        "inputs": []
    }, {
        "type": "function",
        "inputs": [],
        "stateMutability": "view",
        "name": "uniswapV2Router",
        "outputs": [{
            "type": "address",
            "name": "",
            "internalType": "contract IUniswapV2Router02"
        }]
    }, {
        "stateMutability": "payable",
        "type": "receive"
    }, {
        "type": "function",
        "stateMutability": "nonpayable",
        "inputs": [{
            "name": "newAddress",
            "type": "address",
            "internalType": "address"
        }],
        "outputs": [],
        "name": "updateDividendTracker"
    }, {
        "stateMutability": "nonpayable",
        "outputs": [],
        "name": "updateUniswapV2Router",
        "type": "function",
        "inputs": [{
            "type": "address",
            "internalType": "address",
            "name": "newAddress"
        }]
    }, {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [],
        "inputs": [{
            "type": "address",
            "internalType": "address",
            "name": "account"
        }, {
            "type": "bool",
            "internalType": "bool",
            "name": "excluded"
        }],
        "name": "excludeFromFees"
    }, {
        "type": "function",
        "stateMutability": "nonpayable",
        "name": "excludeMultipleAccountsFromFees",
        "inputs": [{
            "type": "address[]",
            "internalType": "address[]",
            "name": "accounts"
        }, {
            "internalType": "bool",
            "type": "bool",
            "name": "excluded"
        }],
        "outputs": []
    }, {
        "name": "setMarketingWallet",
        "type": "function",
        "inputs": [{
            "internalType": "address payable",
            "type": "address",
            "name": "wallet"
        }],
        "stateMutability": "nonpayable",
        "outputs": []
    }, {
        "type": "function",
        "inputs": [{
            "type": "uint256",
            "name": "value",
            "internalType": "uint256"
        }],
        "outputs": [],
        "stateMutability": "nonpayable",
        "name": "setDEZURewardsFee"
    }, {
        "outputs": [],
        "name": "setLiquidityFee",
        "stateMutability": "nonpayable",
        "inputs": [{
            "internalType": "uint256",
            "type": "uint256",
            "name": "value"
        }],
        "type": "function"
    }, {
        "stateMutability": "nonpayable",
        "name": "setMarketingFee",
        "outputs": [],
        "type": "function",
        "inputs": [{
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        }]
    }, {
        "stateMutability": "nonpayable",
        "inputs": [{
            "name": "pair",
            "type": "address",
            "internalType": "address"
        }, {
            "internalType": "bool",
            "name": "value",
            "type": "bool"
        }],
        "outputs": [],
        "name": "setAutomatedMarketMakerPair",
        "type": "function"
    }, {
        "type": "function",
        "name": "blacklistAddress",
        "inputs": [{
            "type": "address",
            "internalType": "address",
            "name": "account"
        }, {
            "type": "bool",
            "internalType": "bool",
            "name": "value"
        }],
        "stateMutability": "nonpayable",
        "outputs": []
    }, {
        "name": "updateMaxWallet",
        "type": "function",
        "outputs": [],
        "inputs": [{
            "name": "maxWallet",
            "type": "uint256",
            "internalType": "uint256"
        }],
        "stateMutability": "nonpayable"
    }, {
        "name": "updateGasForProcessing",
        "outputs": [],
        "stateMutability": "nonpayable",
        "inputs": [{
            "type": "uint256",
            "name": "newValue",
            "internalType": "uint256"
        }],
        "type": "function"
    }, {
        "stateMutability": "nonpayable",
        "inputs": [{
            "type": "uint256",
            "internalType": "uint256",
            "name": "claimWait"
        }],
        "name": "updateClaimWait",
        "type": "function",
        "outputs": []
    }, {
        "stateMutability": "view",
        "name": "getClaimWait",
        "inputs": [],
        "type": "function",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }]
    }, {
        "type": "function",
        "name": "getTotalDividendsDistributed",
        "stateMutability": "view",
        "outputs": [{
            "type": "uint256",
            "internalType": "uint256",
            "name": ""
        }],
        "inputs": []
    }, {
        "type": "function",
        "stateMutability": "view",
        "outputs": [{
            "type": "bool",
            "name": "",
            "internalType": "bool"
        }],
        "name": "isExcludedFromFees",
        "inputs": [{
            "internalType": "address",
            "type": "address",
            "name": "account"
        }]
    }, {
        "name": "withdrawableDividendOf",
        "stateMutability": "view",
        "type": "function",
        "inputs": [{
            "internalType": "address",
            "name": "account",
            "type": "address"
        }],
        "outputs": [{
            "type": "uint256",
            "internalType": "uint256",
            "name": ""
        }]
    }, {
        "inputs": [{
            "type": "address",
            "internalType": "address",
            "name": "account"
        }],
        "type": "function",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "name": "dividendTokenBalanceOf"
    }, {
        "stateMutability": "nonpayable",
        "name": "excludeFromDividends",
        "inputs": [{
            "name": "account",
            "internalType": "address",
            "type": "address"
        }],
        "outputs": [],
        "type": "function"
    }, {
        "inputs": [{
            "type": "address",
            "internalType": "address",
            "name": "account"
        }],
        "outputs": [{
            "internalType": "address",
            "type": "address",
            "name": ""
        }, {
            "name": "",
            "internalType": "int256",
            "type": "int256"
        }, {
            "name": "",
            "internalType": "int256",
            "type": "int256"
        }, {
            "type": "uint256",
            "name": "",
            "internalType": "uint256"
        }, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }, {
            "type": "uint256",
            "internalType": "uint256",
            "name": ""
        }, {
            "type": "uint256",
            "name": "",
            "internalType": "uint256"
        }, {
            "type": "uint256",
            "name": "",
            "internalType": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "name": "getAccountDividendsInfo"
    }, {
        "type": "function",
        "name": "getAccountDividendsInfoAtIndex",
        "inputs": [{
            "name": "index",
            "internalType": "uint256",
            "type": "uint256"
        }],
        "outputs": [{
            "type": "address",
            "name": "",
            "internalType": "address"
        }, {
            "name": "",
            "internalType": "int256",
            "type": "int256"
        }, {
            "internalType": "int256",
            "type": "int256",
            "name": ""
        }, {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
        }, {
            "type": "uint256",
            "name": "",
            "internalType": "uint256"
        }, {
            "internalType": "uint256",
            "type": "uint256",
            "name": ""
        }, {
            "name": "",
            "internalType": "uint256",
            "type": "uint256"
        }, {
            "type": "uint256",
            "name": "",
            "internalType": "uint256"
        }],
        "stateMutability": "view"
    }, {
        "outputs": [],
        "name": "processDividendTracker",
        "inputs": [{
            "internalType": "uint256",
            "type": "uint256",
            "name": "gas"
        }],
        "type": "function",
        "stateMutability": "nonpayable"
    }, {
        "name": "claim",
        "outputs": [],
        "type": "function",
        "inputs": [],
        "stateMutability": "nonpayable"
    }, {
        "type": "function",
        "name": "getLastProcessedIndex",
        "outputs": [{
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
        }],
        "stateMutability": "view",
        "inputs": []
    }, {
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "type": "function",
        "name": "getNumberOfDividendTokenHolders",
        "stateMutability": "view",
        "inputs": []
    }];

    const nftBaseAbi = [{
        "type": "constructor",
        "inputs": [],
        "stateMutability": "nonpayable"
    }, {
        "inputs": [{
            "type": "address",
            "indexed": true,
            "name": "owner",
            "internalType": "address"
        }, {
            "name": "approved",
            "internalType": "address",
            "indexed": true,
            "type": "address"
        }, {
            "name": "tokenId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
        }],
        "name": "Approval",
        "type": "event",
        "anonymous": false
    }, {
        "type": "event",
        "anonymous": false,
        "name": "ApprovalForAll",
        "inputs": [{
            "type": "address",
            "indexed": true,
            "internalType": "address",
            "name": "owner"
        }, {
            "type": "address",
            "internalType": "address",
            "name": "operator",
            "indexed": true
        }, {
            "type": "bool",
            "name": "approved",
            "internalType": "bool",
            "indexed": false
        }]
    }, {
        "name": "Transfer",
        "inputs": [{
            "type": "address",
            "indexed": true,
            "internalType": "address",
            "name": "from"
        }, {
            "type": "address",
            "name": "to",
            "internalType": "address",
            "indexed": true
        }, {
            "name": "tokenId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
        }],
        "type": "event",
        "anonymous": false
    }, {
        "type": "function",
        "outputs": [],
        "stateMutability": "nonpayable",
        "name": "approve",
        "inputs": [{
            "name": "to",
            "type": "address",
            "internalType": "address"
        }, {
            "type": "uint256",
            "internalType": "uint256",
            "name": "tokenId"
        }]
    }, {
        "stateMutability": "view",
        "inputs": [{
            "internalType": "address",
            "type": "address",
            "name": "owner"
        }],
        "outputs": [{
            "type": "uint256",
            "internalType": "uint256",
            "name": ""
        }],
        "type": "function",
        "name": "balanceOf"
    }, {
        "type": "function",
        "name": "categories",
        "inputs": [{
            "type": "uint256",
            "internalType": "uint256",
            "name": ""
        }],
        "stateMutability": "view",
        "outputs": [{
            "type": "string",
            "name": "",
            "internalType": "string"
        }]
    }, {
        "name": "getApproved",
        "inputs": [{
            "type": "uint256",
            "internalType": "uint256",
            "name": "tokenId"
        }],
        "stateMutability": "view",
        "type": "function",
        "outputs": [{
            "type": "address",
            "name": "",
            "internalType": "address"
        }]
    }, {
        "name": "imageData",
        "type": "function",
        "inputs": [{
            "type": "uint256",
            "name": "",
            "internalType": "uint256"
        }],
        "outputs": [{
            "name": "name",
            "type": "string",
            "internalType": "string"
        }, {
            "internalType": "string",
            "name": "mimeType",
            "type": "string"
        }, {
            "type": "string",
            "name": "nftData",
            "internalType": "string"
        }, {
            "name": "category",
            "type": "string",
            "internalType": "string"
        }, {
            "internalType": "string",
            "name": "description",
            "type": "string"
        }, {
            "internalType": "string",
            "type": "string",
            "name": "url"
        }, {
            "name": "price",
            "type": "uint256",
            "internalType": "uint256"
        }],
        "stateMutability": "view"
    }, {
        "name": "images",
        "inputs": [{
            "name": "",
            "internalType": "uint256",
            "type": "uint256"
        }],
        "outputs": [{
            "name": "",
            "internalType": "string",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "stateMutability": "view",
        "inputs": [{
            "type": "address",
            "internalType": "address",
            "name": "owner"
        }, {
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }],
        "outputs": [{
            "type": "bool",
            "name": "",
            "internalType": "bool"
        }],
        "type": "function",
        "name": "isApprovedForAll"
    }, {
        "inputs": [{
            "name": "",
            "internalType": "uint256",
            "type": "uint256"
        }],
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "type": "function",
        "stateMutability": "view",
        "name": "mimetypes"
    }, {
        "name": "name",
        "outputs": [{
            "name": "",
            "internalType": "string",
            "type": "string"
        }],
        "type": "function",
        "stateMutability": "view",
        "inputs": []
    }, {
        "name": "ownerOf",
        "inputs": [{
            "name": "tokenId",
            "type": "uint256",
            "internalType": "uint256"
        }],
        "outputs": [{
            "name": "",
            "internalType": "address",
            "type": "address"
        }],
        "type": "function",
        "stateMutability": "view"
    }, {
        "type": "function",
        "outputs": [],
        "inputs": [{
            "internalType": "address",
            "name": "from",
            "type": "address"
        }, {
            "name": "to",
            "internalType": "address",
            "type": "address"
        }, {
            "type": "uint256",
            "name": "tokenId",
            "internalType": "uint256"
        }],
        "stateMutability": "nonpayable",
        "name": "safeTransferFrom"
    }, {
        "outputs": [],
        "type": "function",
        "stateMutability": "nonpayable",
        "name": "safeTransferFrom",
        "inputs": [{
            "type": "address",
            "name": "from",
            "internalType": "address"
        }, {
            "name": "to",
            "internalType": "address",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }, {
            "type": "bytes",
            "internalType": "bytes",
            "name": "_data"
        }]
    }, {
        "name": "setApprovalForAll",
        "inputs": [{
            "type": "address",
            "name": "operator",
            "internalType": "address"
        }, {
            "type": "bool",
            "internalType": "bool",
            "name": "approved"
        }],
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": []
    }, {
        "stateMutability": "view",
        "name": "supportsInterface",
        "inputs": [{
            "type": "bytes4",
            "internalType": "bytes4",
            "name": "interfaceId"
        }],
        "outputs": [{
            "name": "",
            "type": "bool",
            "internalType": "bool"
        }],
        "type": "function"
    }, {
        "stateMutability": "view",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "inputs": [],
        "type": "function",
        "name": "symbol"
    }, {
        "inputs": [{
            "type": "uint256",
            "internalType": "uint256",
            "name": "index"
        }],
        "outputs": [{
            "type": "uint256",
            "internalType": "uint256",
            "name": ""
        }],
        "type": "function",
        "name": "tokenByIndex",
        "stateMutability": "view"
    }, {
        "name": "tokenOfOwnerByIndex",
        "inputs": [{
            "internalType": "address",
            "type": "address",
            "name": "owner"
        }, {
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "outputs": [{
            "internalType": "uint256",
            "type": "uint256",
            "name": ""
        }],
        "type": "function"
    }, {
        "stateMutability": "view",
        "outputs": [{
            "name": "",
            "type": "string",
            "internalType": "string"
        }],
        "inputs": [{
            "type": "uint256",
            "name": "tokenId",
            "internalType": "uint256"
        }],
        "type": "function",
        "name": "tokenURI"
    }, {
        "name": "totalSupply",
        "outputs": [{
            "type": "uint256",
            "internalType": "uint256",
            "name": ""
        }],
        "type": "function",
        "inputs": [],
        "stateMutability": "view"
    }, {
        "inputs": [{
            "type": "address",
            "internalType": "address",
            "name": "from"
        }, {
            "type": "address",
            "internalType": "address",
            "name": "to"
        }, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }],
        "type": "function",
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable"
    }, {
        "type": "function",
        "inputs": [{
            "type": "string",
            "name": "_name",
            "internalType": "string"
        }, {
            "type": "string",
            "internalType": "string",
            "name": "_mimeType"
        }, {
            "internalType": "string",
            "type": "string",
            "name": "_nftData"
        }, {
            "type": "string",
            "name": "_category",
            "internalType": "string"
        }, {
            "type": "string",
            "internalType": "string",
            "name": "_description"
        }, {
            "internalType": "string",
            "name": "_url",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
        }],
        "name": "mint",
        "stateMutability": "nonpayable",
        "outputs": [{
            "internalType": "uint256",
            "type": "uint256",
            "name": ""
        }]
    }, {
        "name": "approveNFT",
        "type": "function",
        "stateMutability": "nonpayable",
        "inputs": [{
            "name": "_to",
            "type": "address",
            "internalType": "address"
        }, {
            "internalType": "uint256",
            "type": "uint256",
            "name": "_tokenId"
        }],
        "outputs": []
    }, {
        "type": "function",
        "stateMutability": "nonpayable",
        "name": "isApprovedOrOwner",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "inputs": [{
            "name": "_address",
            "type": "address",
            "internalType": "address"
        }, {
            "internalType": "uint256",
            "type": "uint256",
            "name": "_tokenId"
        }]
    }, {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [{
            "internalType": "uint256",
            "name": "_id",
            "type": "uint256"
        }, {
            "name": "_price",
            "internalType": "uint256",
            "type": "uint256"
        }],
        "outputs": [{
            "name": "",
            "internalType": "bool",
            "type": "bool"
        }],
        "name": "updatePrice"
    }, {
        "name": "approveForSale",
        "inputs": [{
            "name": "_to",
            "type": "address",
            "internalType": "address"
        }, {
            "internalType": "uint256",
            "type": "uint256",
            "name": "_tokenId"
        }, {
            "type": "uint256",
            "name": "_price",
            "internalType": "uint256"
        }],
        "outputs": [],
        "type": "function",
        "stateMutability": "nonpayable"
    }, {
        "stateMutability": "nonpayable",
        "outputs": [],
        "name": "approveForAuction",
        "type": "function",
        "inputs": [{
            "internalType": "address",
            "name": "_to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "type": "uint256",
            "name": "_tokenId"
        }, {
            "internalType": "uint256",
            "type": "uint256",
            "name": "_price"
        }, {
            "type": "uint256",
            "name": "_time",
            "internalType": "uint256"
        }]
    }, {
        "stateMutability": "nonpayable",
        "outputs": [],
        "type": "function",
        "name": "nftSold",
        "inputs": [{
            "type": "uint256",
            "internalType": "uint256",
            "name": "_tokenId"
        }]
    }];

    const nftLikeAbi = [{
        "inputs": [{
            "internalType": "contract ZonuletNFT",
            "name": "_zonuletNFT",
            "type": "address"
        }],
        "stateMutability": "nonpayable",
        "type": "constructor"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }, {
            "indexed": false,
            "internalType": "address",
            "name": "_liker",
            "type": "address"
        }],
        "name": "LikedNFT",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }, {
            "indexed": false,
            "internalType": "address",
            "name": "_pacmaniser",
            "type": "address"
        }],
        "name": "PacmanedNFT",
        "type": "event"
    }, {
        "inputs": [],
        "name": "ZONU",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "name": "likers",
        "outputs": [{
            "internalType": "uint256",
            "name": "totallikes",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "nftLikes",
        "outputs": [{
            "internalType": "uint256",
            "name": "likes",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "nftId",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "nftPacmans",
        "outputs": [{
            "internalType": "uint256",
            "name": "pacmans",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "nftId",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "owner",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "name": "pacmanisers",
        "outputs": [{
            "internalType": "uint256",
            "name": "totalpacman",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [],
        "name": "zonuletNFT",
        "outputs": [{
            "internalType": "contract ZonuletNFT",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "_owner",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "LikeNFT",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "_minter",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }],
        "name": "PacmanNFT",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_pacmanprice",
            "type": "uint256"
        }],
        "name": "setPacmanPrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getPacmanPrice",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }];

    const nftBlacklistAbi = [{
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "hashAddress",
            "type": "address"
        }, {
            "indexed": false,
            "internalType": "bool",
            "name": "blacklisted",
            "type": "bool"
        }],
        "name": "SetBlackListedAddress",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "uint256",
            "name": "nftID",
            "type": "uint256"
        }, {
            "indexed": false,
            "internalType": "bool",
            "name": "blacklisted",
            "type": "bool"
        }],
        "name": "SetBlackListedNFT",
        "type": "event"
    }, {
        "inputs": [],
        "name": "AddyCount",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "IDCount",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "blAddress",
            "type": "address"
        }],
        "name": "getBlackListedAddress",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "nftID",
            "type": "uint256"
        }],
        "name": "getBlackListedNFT",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "idupdates",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "owner",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "addy",
            "type": "address"
        }, {
            "internalType": "bool",
            "name": "blacklisted",
            "type": "bool"
        }],
        "name": "setBlackListedAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "nftID",
            "type": "uint256"
        }, {
            "internalType": "bool",
            "name": "blacklisted",
            "type": "bool"
        }],
        "name": "setBlackListedNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "updates",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    }];

    const zonuletContract = new web3.eth.Contract(zonuletAbi, "0xA499cE35fc84C6EA6ACb1F8864C4D9F975B306bd");

    const nftBaseContract = new web3.eth.Contract(nftBaseAbi, "0x0da73fE6b2f69342453C745040fB8FF087de30DA");

    const nftLikeContract = new web3.eth.Contract(nftLikeAbi, "0xCba129797b457b2Dbb2044AFd62cbD9dFb7117ac");

    const nftBlacklistContract = new web3.eth.Contract(nftBlacklistAbi, "0xbE40C5586edFAB7D296d1BF0fBd8bB56Ca4436CC");

    const totalSupply = await nftBaseContract.methods.totalSupply().call();
    // console.log(totalSupply-1);


    var notBL = 0;
    var removed = 0;

    console.log('Start Indexing the JSON Data');

    var total = totalSupply;

    console.log(total);
    // Load NFTs Data 
    for (var i = total; i--;) {

        // const ownerNft = await zonuletContract.methods.ownerOf(i).call();
        const ownerNft = await nftBaseContract.methods.ownerOf(i).call();
        const nftBase = await nftBaseContract.methods.imageData(i).call();
        const likecount = await nftLikeContract.methods.nftLikes(i).call();
        const pacmancount = await nftLikeContract.methods.nftPacmans(i).call();
        const blacklisted = await nftBlacklistContract.methods.getBlackListedNFT(i).call();

        if (!blacklisted) {
            notBL++;
            images.push({
                name: nftBase.name,
                nftData: nftBase.nftData,
                mimeType: nftBase.mimeType,
                category: nftBase.category,
                price: nftBase.price,
                likecount: likecount.likes,
                pacmancount: pacmancount.pacmans,
                ownerNft: ownerNft,
                id: i
            });

            if (Number(notBL) == Number(total - removed)) {
                console.log('Loaded all ' + notBL);
                let data = JSON.stringify(images);
                fs.writeFileSync('harmony.json', data);
                console.log('Wrote Data to harmony.json');
                getNFTs();
            }
        } else if (blacklisted == true) {
            removed++;
        }
    }

}

getNFTs();