# MyCora Full-Stack Setup

## Contracts
- `MyCoraSecurityToken.sol` (ERC-1400 style)
- `MyCoraUtilityToken.sol` (ERC-721)

## Backend
- Express.js REST API
- Web3.Storage for IPFS uploads
- Endpoints for whitelisting, minting, metadata uploads

## Frontend
- Next.js + wagmi + RainbowKit
- Components for minting tokens
- Metadata upload + mint flow

## Infra
- Deploy backend to Render
- Deploy frontend to Vercel
- Use MongoDB Atlas for dashboard/user data if needed
- Alchemy for fast RPC
- Web3.Storage for IPFS

## Security
- Store secrets in env vars (Render/Vercel Dashboard)
- Never commit private keys
- Use HTTPS everywhere

## DevOps
- GitHub Actions for CI/CD

---

**Deploy and adapt this stack for a secure, scalable MyCora dApp. Need more features, dashboard UI, or database integration? Just ask!**