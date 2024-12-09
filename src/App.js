import React, { useEffect, useState } from "react";
import Web3 from "web3"; // Keep the import

const contractAddress = "0x857BD20437C22e2600bABE51C5BcA4907deD0a56";
const ADDRESS_HOZINFT = "0x857BD20437C22e2600bABE51C5BcA4907deD0a56";
//const ADDRESS_FRACTIONALNFT = "0x4bb40eCEd00124566dC75c0BBF951d8fd628d124"; // Replace with your contract address
const ABI_HOZINFT = [
  {
    constant: false,
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    payable: false,
    type: "error",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    payable: false,
    type: "error",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    payable: false,
    type: "error",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    payable: false,
    type: "error",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    payable: false,
    type: "error",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    payable: false,
    type: "error",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    payable: false,
    type: "error",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    payable: false,
    type: "error",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    payable: false,
    type: "error",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    payable: false,
    type: "error",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    payable: false,
    type: "event",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    payable: false,
    type: "event",
  },
  {
    constant: false,
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
    payable: false,
    type: "event",
  },
  {
    constant: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    payable: false,
    type: "event",
  },
  {
    constant: false,
    inputs: [
      { indexed: false, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { indexed: false, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeMint",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      { indexed: false, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      { indexed: false, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      { indexed: false, internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      { indexed: false, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

// const ABI_FRACTIONALNFT = [
//   {
//     inputs: [],
//     stateMutability: "nonpayable",
//     type: "constructor",
//   },
//   {
//     inputs: [],
//     name: "ECDSAInvalidSignature",
//     type: "error",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "length",
//         type: "uint256",
//       },
//     ],
//     name: "ECDSAInvalidSignatureLength",
//     type: "error",
//   },
//   {
//     inputs: [
//       {
//         internalType: "bytes32",
//         name: "s",
//         type: "bytes32",
//       },
//     ],
//     name: "ECDSAInvalidSignatureS",
//     type: "error",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "spender",
//         type: "address",
//       },
//       {
//         internalType: "uint256",
//         name: "allowance",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "needed",
//         type: "uint256",
//       },
//     ],
//     name: "ERC20InsufficientAllowance",
//     type: "error",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "sender",
//         type: "address",
//       },
//       {
//         internalType: "uint256",
//         name: "balance",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "needed",
//         type: "uint256",
//       },
//     ],
//     name: "ERC20InsufficientBalance",
//     type: "error",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "approver",
//         type: "address",
//       },
//     ],
//     name: "ERC20InvalidApprover",
//     type: "error",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "receiver",
//         type: "address",
//       },
//     ],
//     name: "ERC20InvalidReceiver",
//     type: "error",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "sender",
//         type: "address",
//       },
//     ],
//     name: "ERC20InvalidSender",
//     type: "error",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "spender",
//         type: "address",
//       },
//     ],
//     name: "ERC20InvalidSpender",
//     type: "error",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "deadline",
//         type: "uint256",
//       },
//     ],
//     name: "ERC2612ExpiredSignature",
//     type: "error",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "signer",
//         type: "address",
//       },
//       {
//         internalType: "address",
//         name: "owner",
//         type: "address",
//       },
//     ],
//     name: "ERC2612InvalidSigner",
//     type: "error",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "account",
//         type: "address",
//       },
//       {
//         internalType: "uint256",
//         name: "currentNonce",
//         type: "uint256",
//       },
//     ],
//     name: "InvalidAccountNonce",
//     type: "error",
//   },
//   {
//     inputs: [],
//     name: "InvalidShortString",
//     type: "error",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "owner",
//         type: "address",
//       },
//     ],
//     name: "OwnableInvalidOwner",
//     type: "error",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "account",
//         type: "address",
//       },
//     ],
//     name: "OwnableUnauthorizedAccount",
//     type: "error",
//   },
//   {
//     inputs: [
//       {
//         internalType: "string",
//         name: "str",
//         type: "string",
//       },
//     ],
//     name: "StringTooLong",
//     type: "error",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "owner",
//         type: "address",
//       },
//       {
//         indexed: true,
//         internalType: "address",
//         name: "spender",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "value",
//         type: "uint256",
//       },
//     ],
//     name: "Approval",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [],
//     name: "EIP712DomainChanged",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "previousOwner",
//         type: "address",
//       },
//       {
//         indexed: true,
//         internalType: "address",
//         name: "newOwner",
//         type: "address",
//       },
//     ],
//     name: "OwnershipTransferred",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "from",
//         type: "address",
//       },
//       {
//         indexed: true,
//         internalType: "address",
//         name: "to",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "value",
//         type: "uint256",
//       },
//     ],
//     name: "Transfer",
//     type: "event",
//   },
//   {
//     inputs: [],
//     name: "DOMAIN_SEPARATOR",
//     outputs: [
//       {
//         internalType: "bytes32",
//         name: "",
//         type: "bytes32",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "owner",
//         type: "address",
//       },
//       {
//         internalType: "address",
//         name: "spender",
//         type: "address",
//       },
//     ],
//     name: "allowance",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "spender",
//         type: "address",
//       },
//       {
//         internalType: "uint256",
//         name: "value",
//         type: "uint256",
//       },
//     ],
//     name: "approve",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "account",
//         type: "address",
//       },
//     ],
//     name: "balanceOf",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "collection",
//     outputs: [
//       {
//         internalType: "contract IERC721",
//         name: "",
//         type: "address",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "decimals",
//     outputs: [
//       {
//         internalType: "uint8",
//         name: "",
//         type: "uint8",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "eip712Domain",
//     outputs: [
//       {
//         internalType: "bytes1",
//         name: "fields",
//         type: "bytes1",
//       },
//       {
//         internalType: "string",
//         name: "name",
//         type: "string",
//       },
//       {
//         internalType: "string",
//         name: "version",
//         type: "string",
//       },
//       {
//         internalType: "uint256",
//         name: "chainId",
//         type: "uint256",
//       },
//       {
//         internalType: "address",
//         name: "verifyingContract",
//         type: "address",
//       },
//       {
//         internalType: "bytes32",
//         name: "salt",
//         type: "bytes32",
//       },
//       {
//         internalType: "uint256[]",
//         name: "extensions",
//         type: "uint256[]",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "forSale",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "_collection",
//         type: "address",
//       },
//       {
//         internalType: "uint16",
//         name: "_tokenId",
//         type: "uint16",
//       },
//       {
//         internalType: "uint256",
//         name: "_amount",
//         type: "uint256",
//       },
//     ],
//     name: "initialize",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "initialized",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "name",
//     outputs: [
//       {
//         internalType: "string",
//         name: "",
//         type: "string",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "owner",
//         type: "address",
//       },
//     ],
//     name: "nonces",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//       {
//         internalType: "bytes",
//         name: "",
//         type: "bytes",
//       },
//     ],
//     name: "onERC721Received",
//     outputs: [
//       {
//         internalType: "bytes4",
//         name: "",
//         type: "bytes4",
//       },
//     ],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "owner",
//     outputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "owner",
//         type: "address",
//       },
//       {
//         internalType: "address",
//         name: "spender",
//         type: "address",
//       },
//       {
//         internalType: "uint256",
//         name: "value",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "deadline",
//         type: "uint256",
//       },
//       {
//         internalType: "uint8",
//         name: "v",
//         type: "uint8",
//       },
//       {
//         internalType: "bytes32",
//         name: "r",
//         type: "bytes32",
//       },
//       {
//         internalType: "bytes32",
//         name: "s",
//         type: "bytes32",
//       },
//     ],
//     name: "permit",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "purchase",
//     outputs: [],
//     stateMutability: "payable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "price",
//         type: "uint256",
//       },
//     ],
//     name: "putForSale",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "_amount",
//         type: "uint256",
//       },
//     ],
//     name: "redeem",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "redeemable",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "renounceOwnership",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "salePrice",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "symbol",
//     outputs: [
//       {
//         internalType: "string",
//         name: "",
//         type: "string",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "tokenId",
//     outputs: [
//       {
//         internalType: "uint16",
//         name: "",
//         type: "uint16",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "totalSupply",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "to",
//         type: "address",
//       },
//       {
//         internalType: "uint256",
//         name: "value",
//         type: "uint256",
//       },
//     ],
//     name: "transfer",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "from",
//         type: "address",
//       },
//       {
//         internalType: "address",
//         name: "to",
//         type: "address",
//       },
//       {
//         internalType: "uint256",
//         name: "value",
//         type: "uint256",
//       },
//     ],
//     name: "transferFrom",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "newOwner",
//         type: "address",
//       },
//     ],
//     name: "transferOwnership",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
// ];

function App() {
  const [web3Instance, setWeb3Instance] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [contractData, setContractData] = useState({ hoziContract: null,});
  const [errorMessage, setErrorMessage] = useState("");
  const [nftId, setNftId] = useState("");
  //const [, setBuyingInEth] = useState(null);
  // const [_amount, setAmount] = useState(null);
  // const [salePrice, setSalePrice] = useState(null);
  //const [redeemAmount, setRedeemAmount] = useState(null); // Renamed state variable

  useEffect(() => {
    if (web3Instance && account) {
      try {
        // Create Hoozi NFT contract instance
        const hoziContract = new web3Instance.eth.Contract(
          ABI_HOZINFT,
          ADDRESS_HOZINFT
        );

        // Create Fractional NFT contract instance
        //const fractionalNFT = new web3Instance.eth.Contract(ABI_FRACTIONALNFT, ADDRESS_FRACTIONALNFT);

        // Store both contract instances in state
        setContractData({ hoziContract });
        console.log("Contracts initialized:", { hoziContract });
      } catch (error) {
        console.error("Failed to initialize contracts:", error);
        setErrorMessage("Failed to initialize contracts: " + error.message);
      }
    }
  }, [web3Instance, account]);

  // Wallet connection logic
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const instance = new Web3(window.ethereum); // Create Web3 instance
        setWeb3Instance(instance); // Store the Web3 instance in state

        // Request MetaMask account access
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await instance.eth.getAccounts();
        if (accounts.length === 0) {
          setErrorMessage("No accounts found. Please unlock MetaMask.");
          return;
        }

        setAccount(accounts[0]); // Store the first account
        console.log("Connected accounts:", accounts);

        // Get the balance in Wei and convert to Ether
        const balanceWei = await instance.eth.getBalance(accounts[0]);
        const balanceInEth = instance.utils.fromWei(balanceWei, "ether");
        setBalance(balanceInEth); // Store the balance

        console.log(`Account: ${accounts[0]}, Balance: ${balanceInEth} ETH`);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        setErrorMessage("Failed to connect wallet: " + error.message);
      }
    } else {
      setErrorMessage(
        "MetaMask is not installed. Please install it to use this feature."
      );
    }
  };

  // Minting logic for NFT
  const mintNFT = async () => {
    if (!web3Instance || !account) {
      setErrorMessage("Please connect your wallet first.");
      return;
    }

    try {
      // Create a contract instance for the Hoozi NFT contract
      const hoziContract = new web3Instance.eth.Contract(
        ABI_HOZINFT,
        ADDRESS_HOZINFT
      );
      //const gasLimit = await hoziContract.methods.safeMint(account, 1).estimateGas({ from: account });
      await hoziContract.methods
        .safeMint(account, 1)
        .send({ from: account, gas: 30000000 });

      // Call the safeMint function from the contract
      // await hoziContract.methods
      //   .safeMint(account, 1) // Mint 1 NFT to the connected account
      //   .send({ from: account, gas: 30000000 }); // Adjust gas limit if necessary

      console.log(`NFT minted to account: ${account}`);
      alert("NFT Minted!");
    } catch (error) {
      console.error("Failed to mint NFT:", error);
      setErrorMessage("Failed to mint NFT: " + error.message);
    }
  };

  const initializeFractionalNFT = async () => {
    try {
      const FractionalNFT = new web3Instance.eth.Contract(
       // ABI_FRACTIONALNFT,
        ADDRESS_FRACTIONALNFT
      );
      const account = await web3Instance.eth.getAccounts(); // Get user accounts
      const ownerAddress = account[0]; // Use the first account

      await FractionalNFT.methods
        .initialize(ADDRESS_HOZINFT, 4, 100)
        .send({ from: ownerAddress, gas: 300000000 }); // Adjust gas limit as needed

      alert("NFT has been fractionalized");
    } catch (error) {
      if (error.message.includes("User denied transaction signature")) {
        setErrorMessage("Transaction was denied. Please try again.");
      } else {
        setErrorMessage("Failed to initialize the NFT: " + error.message);
      }
    }
  };

  const putForSale = async () => {
    try {
      const FractionalNFT = new web3Instance.eth.Contract(
        //ABI_FRACTIONALNFT,
        ADDRESS_FRACTIONALNFT
      );
      const account = await web3Instance.eth.getAccounts(); // Get user accounts
      const ownerAddress = account[0]; // Use the first account//eth convert to wei
      await FractionalNFT.methods
        .putForSale(Web3.utils.toWei(salePrice, "ether"))
        .send({ from: ownerAddress });
      // salePrice="0.0000001"ether
      alert("set NFT price for successfully!");
    } catch (error) {
      setErrorMessage("Failed to buy nft: " + error.message);
    }
  };
  const purchaseNFT = async () => {
    try {
      const accounts = await web3Instance.eth.getAccounts();
      const buyerAddress = accounts[1]; // The address of the buyer
      const fractionalNFTContract = new web3Instance.eth.Contract(
       // ABI_FRACTIONALNFT,
        ADDRESS_FRACTIONALNFT
      );
      const salePrice = web3Instance.utils.toWei("0.001", "ether"); // Convert 0.001 ETH to Wei

      // Call the purchase function with the required Ether amount
      await fractionalNFTContract.methods
        .purchase()
        .send({ from: buyerAddress, value: salePrice }); // salePrice should be in wei
      alert("NFT purchased successfully!");
    } catch (error) {
      console.error("Failed to purchase NFT:", error);
      setErrorMessage("Failed to purchase NFT: " + error.message);
    }
  };

  const redeem = async () => {
    try {
      const contract = new web3Instance.eth.Contract(
        ABI_HOZINFT,
        ABI_FRACTIONALNFT,
        ADDRESS_FRACTIONALNFT,
        ADDRESS_HOZINFT
      );
      //salePrice = "1000000000000000000"; //eth convert to wei
      await contract.methods
        .putForSale(Web3.utils.toWei(salePrice, "ether"))
        .send({ from: account });
      await contract.methods
        .purchase()
        .send({ from: account, value: Web3.utils.toWei(salePrice, "ether") });
      await contract.methods
        .redeem(redeemAmount).send({ from: account});
    } catch (error) {
      setErrorMessage("Failed to redeem the NFT: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>MetaMask Connection with Web3.js</h1>
      {account ? (
        <div>
          <p style={styles.changeColor}>Connected Account: {account}</p>
          <p style={styles.changeColor}>Balance: {balance} ETH</p>
          {contractData && (
            <p style={styles.changeColor}>Contract Data: {contractAddress}</p>
          )}
          <input
            type="text"
            placeholder="NFT Token ID"
            value={nftId}
            onChange={(e) => setNftId(e.target.value)}
          />
          <button onClick={mintNFT} style={styles.button}>
            Mint NFT
          </button>
          {/* 
          <input
            type="text"
            placeholder="fractionalized nft amount"
            value={_amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={initializeFractionalNFT} style={styles.button}>
            Fractionalize NFT
          </button>
          {
            <input
              type="text"
              placeholder=" set sale price"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
            />
          }
          <button onClick={putForSale} style={styles.button}>
            sale price
          </button> */}

          {/* {<input
            type="text"
            placeholder="buy NFT in ethers"
            value={salePrice}
            onChange={(e) => setBuyingInEth(e.target)}
          /> } */}
          {/* <button onClick={purchaseNFT} style={styles.button}>
            Buying NFT
          </button> */}
          {/* <input
            type="text"
            placeholder="redeem payment"
            value={redeemAmount}
            onChange={(e) => setRedeemAmount(e.target.value)}
          />
          <button onClick={redeem} style={styles.button}>
            redeem payment 
          </button>   */}
        </div>
      ) : (
        <button onClick={connectWallet} style={styles.button}>
          Connect Wallet
        </button>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#FFFFE0",
  },
  heading: {
    margin: 0,
    paddingBottom: "5px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "15px 30px",
    fontSize: "15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    outline: "none",
  },
  changeColor: {
    backgroundColor: "#d4edda",
    padding: "10px 20px",
    margin: "10px 0",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    fontSize: "15px",
  },
};

export default App;
