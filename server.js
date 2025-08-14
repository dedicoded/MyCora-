// Replit Express Backend for MyCora Token Minting

import express from 'express';
import bodyParser from 'body-parser';
import { ethers } from 'ethers';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Load ABIs (You must provide SECURITY_ABI and UTILITY_ABI files or import them)
import SECURITY_ABI from './SECURITY_ABI.json' assert { type: "json" };
import UTILITY_ABI from './UTILITY_ABI.json' assert { type: "json" };

// Ethereum provider and signer
const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
const signer = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, provider);

// Contracts
const securityToken = new ethers.Contract(
  process.env.SECURITY_TOKEN_ADDRESS,
  SECURITY_ABI,
  signer
);
const utilityToken = new ethers.Contract(
  process.env.UTILITY_TOKEN_ADDRESS,
  UTILITY_ABI,
  signer
);

// Mint Security Token (ERC-1400 style)
app.post('/mint-security', async (req, res) => {
  const { walletAddress, amount } = req.body;
  try {
    const whitelisted = await securityToken.isWhitelisted(walletAddress);
    if (!whitelisted) return res.status(403).send('User not whitelisted');
    const tx = await securityToken.mint(walletAddress, amount);
    res.json({ txHash: tx.hash });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Mint Utility Token (ERC-721 or ERC-20)
app.post('/mint-utility', async (req, res) => {
  const { walletAddress, metadataURI } = req.body;
  try {
    const tx = await utilityToken.mint(walletAddress, metadataURI);
    res.json({ txHash: tx.hash });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => console.log('MyCora backend running on port 3000'));