# MyCora Token Minting Flow (Replit + Web3 Frontend)

This guide enables users to:
- Upload documents
- Connect their wallet
- Mint trust-wrapped ERC-721 tokens (or UTKN ERC-20)
- See tokens reflected in their wallet/dashboard

---

## 1. 🏗️ Smart Contract Deployment

Deploy your ERC-721 (or ERC-20) contract on Base or supported chain.

**Sample ERC-721 Mint Function:**
```solidity
function mintToken(address to, string memory metadataURI) public returns (uint256) {
    uint256 tokenId = _tokenIdCounter++;
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, metadataURI);
    return tokenId;
}
```
- Deploy with Hardhat or Foundry.
- Verify on BaseScan.

---

## 2. 🖥️ Frontend Integration (wagmi + RainbowKit)

**Connect to Contract:**
```jsx
import { useContractWrite } from 'wagmi';
import { abi } from './YourContractABI';

const { write: mintToken } = useContractWrite({
  address: '0xYourContractAddress',
  abi,
  functionName: 'mintToken',
});
```

**Trigger Mint:**
```jsx
<button onClick={() => mintToken({ args: [userAddress, metadataURI] })}>
  Mint Token
</button>
```
- Use RainbowKit for wallet connect UI.

---

## 3. 🚀 Replit Backend (Optional, Powerful)

**Express API for Minting:**
```javascript name=backend/server.js
const express = require('express');
const { ethers } = require('ethers');
const app = express();
app.use(express.json());

const contract = new ethers.Contract('0xYourContractAddress', abi, signer);

app.post('/mint', async (req, res) => {
  const { walletAddress, metadataURI } = req.body;
  try {
    const tx = await contract.mintToken(walletAddress, metadataURI);
    res.json({ txHash: tx.hash });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3001, () => console.log('Mint API running'));
```

**Frontend Call:**
```javascript
await fetch('/mint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ walletAddress, metadataURI }),
});
```
- Backend can validate uploads, handle IPFS pinning, and sign transactions.

---

## 4. 🖼️ Display Minted Tokens

**Read Token URI:**
```jsx
import { useContractRead } from 'wagmi';

const { data: tokenURI } = useContractRead({
  address: '0xYourContractAddress',
  abi,
  functionName: 'tokenURI',
  args: [tokenId],
});
```
- Render token metadata/image in dashboard.

---

## 🔐 Security Tips

- Never expose private keys in frontend.
- Use Replit secrets for API keys/signer credentials.
- Validate inputs server-side before minting.

---

> Need wireframes, React components, or full backend code for uploads/IPFS/metadata? Just ask!