/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  Dungeon3Minter,
  Dungeon3MinterInterface,
} from "../Dungeon3Minter";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "olootAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "mlootAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "glootAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "relicAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "riftAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "imageBaseURL",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_bestRaiderLastIdsByRank",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_bestRaiderRelicNextIdsByRank",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_claims",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_imageBaseURL",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_isXpRewardsEnabled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "_relayAddresses",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_riftAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_runnerUpRelicLastIdsByRank",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_runnerUpRelicNextIdsByRank",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "dungeonId",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "dungeonRank",
        type: "uint8",
      },
      {
        internalType: "uint64",
        name: "raidTokenId",
        type: "uint64",
      },
      {
        internalType: "uint8",
        name: "raidTokenType",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "raidRank",
        type: "uint8",
      },
      {
        internalType: "bytes",
        name: "claimCoupon",
        type: "bytes",
      },
    ],
    name: "claimReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8[]",
        name: "dungeonIds",
        type: "uint8[]",
      },
      {
        internalType: "uint8[]",
        name: "dungeonRanks",
        type: "uint8[]",
      },
      {
        internalType: "uint64[]",
        name: "raidTokenIds",
        type: "uint64[]",
      },
      {
        internalType: "uint8[]",
        name: "raidTokenTypes",
        type: "uint8[]",
      },
      {
        internalType: "uint8[]",
        name: "raidRanks",
        type: "uint8[]",
      },
      {
        internalType: "bytes[]",
        name: "claimCoupons",
        type: "bytes[]",
      },
    ],
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
    ],
    name: "enableXpRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes12",
        name: "",
        type: "bytes12",
      },
    ],
    name: "getAdditionalAttributes",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getImageBaseURL",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "dungeonId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "raidTokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "raidTokenType",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "getRaidDungeonRequest",
    outputs: [
      {
        internalType: "bool",
        name: "isOwner",
        type: "bool",
      },
      {
        internalType: "uint256[8]",
        name: "itemIds",
        type: "uint256[8]",
      },
      {
        internalType: "string",
        name: "order",
        type: "string",
      },
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "raiderType",
        type: "uint8",
      },
    ],
    name: "getRaidId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes12",
        name: "data",
        type: "bytes12",
      },
    ],
    name: "getTokenOrderIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes12",
        name: "",
        type: "bytes12",
      },
    ],
    name: "getTokenProvenance",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "raidTokenType",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "raidTokenId",
        type: "uint256",
      },
    ],
    name: "isClaimed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "raidTokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "raidTokenType",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "isOwnerOf",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "dungeonId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "dungeonRank",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "raidTokenId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "raidTokenType",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "raidRank",
        type: "uint8",
      },
      {
        internalType: "bytes",
        name: "claimCoupon",
        type: "bytes",
      },
    ],
    name: "isVerifiedClaimRequest",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newImageBaseURL",
        type: "string",
      },
    ],
    name: "setImageBaseURL",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "relayAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "active",
        type: "bool",
      },
    ],
    name: "setRelayAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "sig",
        type: "bytes",
      },
    ],
    name: "splitSignature",
    outputs: [
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x61028060405260fc608090815261034860a05261039c60c0526107e060e05261083461010052610888610120526108dc6101405261111061016052611164610180526111b86101a05261120c6101c0526112606101e0526112b4610200526113086102205261135c610240526191b061026052620000829060099060106200036f565b50604080516102008101825261014f815261039b60208201526103ef91810191909152610833606082015261088760808201526108db60a082015261092f60c082015261116360e08201526111b761010082015261120b61012082015261125f6101408201526112b361016082015261130761018082015261135b6101a08201526113af6101c08201526192036101e0820152620001259060199060106200036f565b506040805161020081018252619204815261934e6020820152619498918101919091526195e2606082015261972c608082015261987660a08201526199c060c0820152619b0a60e0820152619c54610100820152619d9e610120820152619ee861014082015261a03261016082015261a17c61018082015261a2c66101a082015261a4106101c082015261a55a6101e0820152620001c89060299060106200036f565b50604080516102008101825261934d815261949760208201526195e19181019190915261972b606082015261987560808201526199bf60a0820152619b0960c0820152619c5360e0820152619d9d610100820152619ee761012082015261a03161014082015261a17b61016082015261a2c561018082015261a40f6101a082015261a5596101c082015261a6a36101e08201526200026b9060399060106200036f565b503480156200027957600080fd5b50604051620025eb380380620025eb8339810160408190526200029c9162000469565b620002a7336200031f565b600180546001600160a01b03199081166001600160a01b038981169190911790925560028054821688841617905560038054821687841617905560048054821686841617905560088054909116918416919091179055805162000312906005906020840190620003b8565b50505050505050620005f1565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b8260108101928215620003a6579160200282015b82811115620003a6578251829061ffff1690559160200191906001019062000383565b50620003b492915062000435565b5090565b828054620003c6906200059e565b90600052602060002090601f016020900481019282620003ea5760008555620003a6565b82601f106200040557805160ff1916838001178555620003a6565b82800160010185558215620003a6579182015b82811115620003a657825182559160200191906001019062000418565b5b80821115620003b4576000815560010162000436565b80516001600160a01b03811681146200046457600080fd5b919050565b60008060008060008060c0878903121562000482578182fd5b6200048d876200044c565b955060206200049e8189016200044c565b9550620004ae604089016200044c565b9450620004be606089016200044c565b9350620004ce608089016200044c565b60a08901519093506001600160401b0380821115620004eb578384fd5b818a0191508a601f830112620004ff578384fd5b815181811115620005145762000514620005db565b604051601f8201601f19908116603f011681019083821181831017156200053f576200053f620005db565b816040528281528d8684870101111562000557578687fd5b8693505b828410156200057a57848401860151818501870152928501926200055b565b828411156200058b57868684830101525b8096505050505050509295509295509295565b600181811c90821680620005b357607f821691505b60208210811415620005d557634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b611fea80620006016000396000f3fe608060405234801561001057600080fd5b50600436106101a95760003560e01c80634833c8d2116100f957806393e62d7311610097578063d1ec330d11610071578063d1ec330d14610442578063d8db091e14610455578063f0ea01ed14610468578063f2fde38b1461047b57600080fd5b806393e62d73146103ea578063a7bb5803146103fe578063b6cc65fb1461042f57600080fd5b80636c663259116100d35780636c663259146103ab578063715018a6146103be5780638da5cb5b146103c6578063915fd419146103d757600080fd5b80634833c8d21461036257806357f42510146103805780636b7881d51461038857600080fd5b8063213e6e2011610166578063399dde7611610140578063399dde76146102e25780633b7afad2146102f55780633efbac131461033c5780633f2743371461034f57600080fd5b8063213e6e201461029c5780632abc55f6146102a45780632b5b962c146102b757600080fd5b806301194049146101ae578063018315df146101e65780630a14c279146102195780630c8f55041461023c5780631e7517a6146102515780631eb697661461027b575b600080fd5b6101d06101bc366004611a0d565b505060408051602081019091526000815290565b6040516101dd9190611d13565b60405180910390f35b6102096101f43660046116c4565b60076020526000908152604090205460ff1681565b60405190151581526020016101dd565b61022c610227366004611a80565b61048e565b6040516101dd9493929190611cb2565b61024f61024a36600461193e565b6107e5565b005b61020961025f366004611b9d565b60081b60ff918216176000908152600660205260409020541690565b61028e6102893660046119f5565b610826565b6040519081526020016101dd565b6101d061083d565b61028e6102b2366004611a0d565b6108cb565b6008546102ca906001600160a01b031681565b6040516001600160a01b0390911681526020016101dd565b61024f6102f03660046116fc565b6108f3565b6101d0610303366004611a0d565b505060408051808201909152601881527f5468652043727970743a20436861707465722054687265650000000000000000602082015290565b61024f61034a366004611bc6565b610948565b61028e61035d3660046119f5565b610e1f565b61028e610370366004611b47565b60ff8116600883901b1792915050565b6101d0610e2f565b6102096103963660046119f5565b60066020526000908152604090205460ff1681565b61024f6103b93660046117b4565b610ec1565b61024f61102b565b6000546001600160a01b03166102ca565b61028e6103e53660046119f5565b611061565b60085461020990600160a01b900460ff1681565b61041161040c366004611904565b611071565b60408051938452602084019290925260ff16908201526060016101dd565b61020961043d366004611a48565b61115b565b61028e6104503660046119f5565b611279565b61024f6104633660046118ea565b611289565b610209610476366004611ad0565b6112d1565b61024f6104893660046116c4565b61143e565b6000610498611529565b60408051608060208201819052600b60a08301526a3930b4b2223ab733b2b7b760a91b60c08301529181018a905260608181018a9052918101889052600090819060e00160408051601f198184030181529082905280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000091830191909152603c820152605c0160408051601f1981840301815282825280516020918201206000845290830180835281905260ff8b16918301919091526060820189905260808201889052915060019060a0016020604051602081039080840390855afa15801561058d573d6000803e3d6000fd5b5050506020604051035191506105a48a8a8461115b565b94508861060f576040518061010001604052808b81526020018b81526020018b81526020018b81526020018b81526020018b81526020018b81526020018b81525093506040518060400160405280600881526020016737379037b93232b960c11b81525092506107d7565b886001141561067c576040518061010001604052808b81526020018b81526020018b81526020018b81526020018b81526020018b81526020018b81526020018b81525093506040518060400160405280600881526020016737379037b93232b960c11b81525092506107d7565b886002141561078a576003546040516309957b2760e01b8152600481018c90526001600160a01b03909116906309957b27906024016101006040518083038186803b1580156106ca57600080fd5b505afa1580156106de573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107029190611730565b60035460405163d09ef24160e01b8152600481018d90529195506001600160a01b03169063d09ef2419060240160006040518083038186803b15801561074757600080fd5b505afa15801561075b573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526107839190810190611983565b92506107d7565b60405162461bcd60e51b815260206004820152601760248201527f696e76616c6964207261696420746f6b656e207479706500000000000000000060448201526064015b60405180910390fd5b509650965096509692505050565b6000546001600160a01b0316331461080f5760405162461bcd60e51b81526004016107ce90611d26565b8051610822906005906020840190611548565b5050565b6039816010811061083657600080fd5b0154905081565b6005805461084a90611ee6565b80601f016020809104026020016040519081016040528092919081815260200182805461087690611ee6565b80156108c35780601f10610898576101008083540402835291602001916108c3565b820191906000526020600020905b8154815290600101906020018083116108a657829003601f168201915b505050505081565b600060a082901c6108dd601082611f3c565b6bffffffffffffffffffffffff16949350505050565b6000546001600160a01b0316331461091d5760405162461bcd60e51b81526004016107ce90611d26565b6001600160a01b03919091166000908152600760205260409020805460ff1916911515919091179055565b61099b8760ff168760ff16876001600160401b0316878787878080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506112d192505050565b6109e75760405162461bcd60e51b815260206004820152601760248201527f636c61696d20766572696669636174696f6e206661696c00000000000000000060448201526064016107ce565b60ff848116600887901b68ffffffffffffffff00161760008181526006602052604090205490911615610a4e5760405162461bcd60e51b815260206004820152600f60248201526e185b1c9958591e4818db185a5b5959608a1b60448201526064016107ce565b610a65866001600160401b03168660ff163361115b565b610ab15760405162461bcd60e51b815260206004820152601860248201527f72616964657220646f6573206e6f74206f776e206c6f6f74000000000000000060448201526064016107ce565b60008560ff1660021415610ac5575062988c945b600060ff8616610c2a5760098960ff1660108110610af357634e487b7160e01b600052603260045260246000fd5b0154905060198960ff1660108110610b1b57634e487b7160e01b600052603260045260246000fd5b0154811115610b3c5760405162461bcd60e51b81526004016107ce90611d5b565b60098960ff1660108110610b6057634e487b7160e01b600052603260045260246000fd5b018054906000610b6f83611f21565b9091555050600854600160a01b900460ff1615610c25576008546001600160a01b0316635146ea0e610ba28b6010611e93565b610bb09060ff166014611e74565b610bbb9060c8611e37565b610bce856001600160401b038d16611e37565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401600060405180830381600087803b158015610c0c57600080fd5b505af1158015610c20573d6000803e3d6000fd5b505050505b610d80565b60298960ff1660108110610c4e57634e487b7160e01b600052603260045260246000fd5b0154905060398960ff1660108110610c7657634e487b7160e01b600052603260045260246000fd5b0154811115610c975760405162461bcd60e51b81526004016107ce90611d5b565b60298960ff1660108110610cbb57634e487b7160e01b600052603260045260246000fd5b018054906000610cca83611f21565b9091555050600854600160a01b900460ff1615610d80576008546001600160a01b0316635146ea0e610cfd8b6010611e93565b610d0b9060ff16600a611e74565b610d169060c8611e37565b610d29856001600160401b038d16611e37565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401600060405180830381600087803b158015610d6757600080fd5b505af1158015610d7b573d6000803e3d6000fd5b505050505b60008381526006602052604090819020805460ff19166001179055600480549151630ec7bebb60e31b815233918101919091526024810183905260ff60a01b60a08d901b1660448201819052916001600160a01b03169063763df5d890606401600060405180830381600087803b158015610dfa57600080fd5b505af1158015610e0e573d6000803e3d6000fd5b505050505050505050505050505050565b6009816010811061083657600080fd5b606060058054610e3e90611ee6565b80601f0160208091040260200160405190810160405280929190818152602001828054610e6a90611ee6565b8015610eb75780601f10610e8c57610100808354040283529160200191610eb7565b820191906000526020600020905b815481529060010190602001808311610e9a57829003601f168201915b5050505050905090565b60005b8781101561101c5761100a8d8d83818110610eef57634e487b7160e01b600052603260045260246000fd5b9050602002016020810190610f049190611b83565b8c8c84818110610f2457634e487b7160e01b600052603260045260246000fd5b9050602002016020810190610f399190611b83565b8b8b85818110610f5957634e487b7160e01b600052603260045260246000fd5b9050602002016020810190610f6e9190611b69565b8a8a86818110610f8e57634e487b7160e01b600052603260045260246000fd5b9050602002016020810190610fa39190611b83565b898987818110610fc357634e487b7160e01b600052603260045260246000fd5b9050602002016020810190610fd89190611b83565b888888818110610ff857634e487b7160e01b600052603260045260246000fd5b905060200281019061034a9190611d9c565b8061101481611f21565b915050610ec4565b50505050505050505050505050565b6000546001600160a01b031633146110555760405162461bcd60e51b81526004016107ce90611d26565b61105f60006114d9565b565b6029816010811061083657600080fd5b600080600083516041146110c75760405162461bcd60e51b815260206004820152601860248201527f696e76616c6964207369676e6174757265206c656e677468000000000000000060448201526064016107ce565b50505060208101516040820151606083015160001a601b8110156110f3576110f0601b82611e4f565b90505b8060ff16601b148061110857508060ff16601c145b6111545760405162461bcd60e51b815260206004820152601960248201527f696e76616c6964207369676e61747572652076657273696f6e0000000000000060448201526064016107ce565b9193909250565b6000826111fa576001546040516331a9108f60e11b8152600481018690526001600160a01b0390911690636352211e906024015b60206040518083038186803b1580156111a757600080fd5b505afa1580156111bb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111df91906116e0565b6001600160a01b0316826001600160a01b0316149050611272565b8260011415611234576002546040516331a9108f60e11b8152600481018690526001600160a01b0390911690636352211e9060240161118f565b826002141561126e576003546040516331a9108f60e11b8152600481018690526001600160a01b0390911690636352211e9060240161118f565b5060005b9392505050565b6019816010811061083657600080fd5b6000546001600160a01b031633146112b35760405162461bcd60e51b81526004016107ce90611d26565b60088054911515600160a01b0260ff60a01b19909216919091179055565b6000806000806112e085611071565b60408051602081018f90529081018d9052606081018c905260ff808c1660808301528a1660a0820152929550909350915060009060019060c00160408051601f198184030181529082905280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000091830191909152603c820152605c0160408051601f198184030181528282528051602091820120600084529083018083525260ff851690820152606081018690526080810185905260a0016020604051602081039080840390855afa1580156113c1573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166114155760405162461bcd60e51b815260206004820152600e60248201526d34b73b30b634b21039b4b3b732b960911b60448201526064016107ce565b6001600160a01b031660009081526007602052604090205460ff169a9950505050505050505050565b6000546001600160a01b031633146114685760405162461bcd60e51b81526004016107ce90611d26565b6001600160a01b0381166114cd5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016107ce565b6114d6816114d9565b50565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6040518061010001604052806008906020820280368337509192915050565b82805461155490611ee6565b90600052602060002090601f01602090048101928261157657600085556115bc565b82601f1061158f57805160ff19168380011785556115bc565b828001600101855582156115bc579182015b828111156115bc5782518255916020019190600101906115a1565b506115c89291506115cc565b5090565b5b808211156115c857600081556001016115cd565b60006115f46115ef84611e10565b611de0565b905082815283838301111561160857600080fd5b828260208301376000602084830101529392505050565b60008083601f840112611630578182fd5b5081356001600160401b03811115611646578182fd5b6020830191508360208260051b850101111561166157600080fd5b9250929050565b8035801515811461167857600080fd5b919050565b600082601f83011261168d578081fd5b611272838335602085016115e1565b80356001600160401b038116811461167857600080fd5b803560ff8116811461167857600080fd5b6000602082840312156116d5578081fd5b813561127281611f9f565b6000602082840312156116f1578081fd5b815161127281611f9f565b6000806040838503121561170e578081fd5b823561171981611f9f565b915061172760208401611668565b90509250929050565b6000610100808385031215611743578182fd5b83601f840112611751578182fd5b6040518181018181106001600160401b038211171561177257611772611f89565b6040528084838101871015611785578485fd5b8493505b60088410156117a957805182526001939093019260209182019101611789565b509095945050505050565b60008060008060008060008060008060008060c08d8f0312156117d5578788fd5b6001600160401b038d3511156117e9578788fd5b6117f68e8e358f0161161f565b909c509a506001600160401b0360208e01351115611812578788fd5b6118228e60208f01358f0161161f565b909a5098506001600160401b0360408e0135111561183e578788fd5b61184e8e60408f01358f0161161f565b90985096506001600160401b0360608e0135111561186a578586fd5b61187a8e60608f01358f0161161f565b90965094506001600160401b0360808e01351115611896578384fd5b6118a68e60808f01358f0161161f565b90945092506001600160401b0360a08e013511156118c2578081fd5b6118d28e60a08f01358f0161161f565b81935080925050509295989b509295989b509295989b565b6000602082840312156118fb578081fd5b61127282611668565b600060208284031215611915578081fd5b81356001600160401b0381111561192a578182fd5b6119368482850161167d565b949350505050565b60006020828403121561194f578081fd5b81356001600160401b03811115611964578182fd5b8201601f81018413611974578182fd5b611936848235602084016115e1565b600060208284031215611994578081fd5b81516001600160401b038111156119a9578182fd5b8201601f810184136119b9578182fd5b80516119c76115ef82611e10565b8181528560208385010111156119db578384fd5b6119ec826020830160208601611eb6565b95945050505050565b600060208284031215611a06578081fd5b5035919050565b60008060408385031215611a1f578182fd5b8235915060208301356001600160a01b031981168114611a3d578182fd5b809150509250929050565b600080600060608486031215611a5c578081fd5b83359250602084013591506040840135611a7581611f9f565b809150509250925092565b60008060008060008060c08789031215611a98578384fd5b863595506020870135945060408701359350611ab6606088016116b3565b92506080870135915060a087013590509295509295509295565b60008060008060008060c08789031215611ae8578384fd5b863595506020870135945060408701359350611b06606088016116b3565b9250611b14608088016116b3565b915060a08701356001600160401b03811115611b2e578182fd5b611b3a89828a0161167d565b9150509295509295509295565b60008060408385031215611b59578182fd5b82359150611727602084016116b3565b600060208284031215611b7a578081fd5b6112728261169c565b600060208284031215611b94578081fd5b611272826116b3565b60008060408385031215611baf578182fd5b611bb8836116b3565b946020939093013593505050565b600080600080600080600060c0888a031215611be0578081fd5b611be9886116b3565b9650611bf7602089016116b3565b9550611c056040890161169c565b9450611c13606089016116b3565b9350611c21608089016116b3565b925060a08801356001600160401b0380821115611c3c578283fd5b818a0191508a601f830112611c4f578283fd5b813581811115611c5d578384fd5b8b6020828501011115611c6e578384fd5b60208301945080935050505092959891949750929550565b60008151808452611c9e816020860160208601611eb6565b601f01601f19169290920160200192915050565b60006101608615158352602080840187845b6008811015611ce157815183529183019190830190600101611cc4565b5050505080610120840152611cf881840186611c86565b91505060018060a01b03831661014083015295945050505050565b6020815260006112726020830184611c86565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60208082526021908201527f6e6f206d6f72652072656c69637320617661696c61626c6520666f722072616e6040820152606b60f81b606082015260800190565b6000808335601e19843603018112611db2578283fd5b8301803591506001600160401b03821115611dcb578283fd5b60200191503681900382131561166157600080fd5b604051601f8201601f191681016001600160401b0381118282101715611e0857611e08611f89565b604052919050565b60006001600160401b03821115611e2957611e29611f89565b50601f01601f191660200190565b60008219821115611e4a57611e4a611f73565b500190565b600060ff821660ff84168060ff03821115611e6c57611e6c611f73565b019392505050565b6000816000190483118215151615611e8e57611e8e611f73565b500290565b600060ff821660ff841680821015611ead57611ead611f73565b90039392505050565b60005b83811015611ed1578181015183820152602001611eb9565b83811115611ee0576000848401525b50505050565b600181811c90821680611efa57607f821691505b60208210811415611f1b57634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415611f3557611f35611f73565b5060010190565b60006bffffffffffffffffffffffff80841680611f6757634e487b7160e01b83526012600452602483fd5b92169190910692915050565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146114d657600080fdfea26469706673582212200a4dbd8bca27d3f520c574fb6d9ba43b96bc4b0df297b8eb7ad195329e6accdc64736f6c63430008040033";

type Dungeon3MinterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Dungeon3MinterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Dungeon3Minter__factory extends ContractFactory {
  constructor(...args: Dungeon3MinterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    olootAddress: string,
    mlootAddress: string,
    glootAddress: string,
    relicAddress: string,
    riftAddress: string,
    imageBaseURL: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Dungeon3Minter> {
    return super.deploy(
      olootAddress,
      mlootAddress,
      glootAddress,
      relicAddress,
      riftAddress,
      imageBaseURL,
      overrides || {}
    ) as Promise<Dungeon3Minter>;
  }
  getDeployTransaction(
    olootAddress: string,
    mlootAddress: string,
    glootAddress: string,
    relicAddress: string,
    riftAddress: string,
    imageBaseURL: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      olootAddress,
      mlootAddress,
      glootAddress,
      relicAddress,
      riftAddress,
      imageBaseURL,
      overrides || {}
    );
  }
  attach(address: string): Dungeon3Minter {
    return super.attach(address) as Dungeon3Minter;
  }
  connect(signer: Signer): Dungeon3Minter__factory {
    return super.connect(signer) as Dungeon3Minter__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Dungeon3MinterInterface {
    return new utils.Interface(_abi) as Dungeon3MinterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Dungeon3Minter {
    return new Contract(address, _abi, signerOrProvider) as Dungeon3Minter;
  }
}