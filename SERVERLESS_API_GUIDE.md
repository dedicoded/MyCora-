# Serverless API with Vercel / Netlify Functions

## How It Works

- **Write API endpoints in `/api` directory** within your Next.js/React frontend.
- **Deploy on Vercel or Netlify**—they automatically detect `/api` and deploy as serverless functions.
- **Environment variables** managed in your dashboard (never commit secrets!).
- **Frontend and backend run together**, sharing deployment and routing.

---

## 🛠️ Example Structure

```
mycora-app/
├── pages/
│   └── index.tsx
├── api/
│   ├── mint-utility.ts
│   ├── mint-security.ts
│   └── upload-metadata.ts
├── components/
│   └── MintUtilityToken.tsx
│   └── MintSecurityToken.tsx
├── package.json
└── ...
```

---

## 📦 Example API Endpoint (`/api/mint-utility.ts`)

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { walletAddress, metadataURI } = req.body;
    const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const abi = [/* ...ERC-721 ABI... */];
    const contract = new ethers.Contract(process.env.UTILITY_TOKEN_ADDRESS, abi, signer);

    try {
      const tx = await contract.mint(walletAddress, metadataURI);
      res.status(200).json({ txHash: tx.hash });
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  } else {
    res.status(405).end();
  }
}
```

---

## 🗂️ How to Use

1. Create your API endpoints in `/api` (Next.js) or `/netlify/functions` (Netlify).
2. Access them from your React components using `fetch('/api/mint-utility', ...)`.
3. Set environment variables in Vercel/Netlify dashboard (e.g., `PRIVATE_KEY`, `ALCHEMY_RPC_URL`, etc.).
4. Deploy and test—your frontend and backend are now together!

---

## 🔐 Security

- **Use environment variables for all secrets**
- **Never commit secrets to your repo**
- **Serverless functions keep secrets out of the client-side bundle**

---

**Need a full example with upload to IPFS, ERC-721 mint, and frontend form? Just ask!**