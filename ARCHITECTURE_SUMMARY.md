# MyCora Full Stack Utility Token Flow

| Layer         | Component                       | Purpose                                |
|---------------|---------------------------------|----------------------------------------|
| Smart Contract| MyCoraSecurityToken (ERC-1400)  | Whitelisted, compliance-aware minting  |
| Smart Contract| MyCoraUtilityToken (ERC-721)    | Metadata-driven utility token minting  |
| Backend       | Express.js endpoints            | Minting + IPFS upload                  |
| Frontend      | React + wagmi                   | Token selection, metadata form, mint   |
| Storage       | Web3.Storage or Pinata          | IPFS hosting for metadata              |

**Flow:**  
1. User enters metadata in frontend form  
2. Frontend posts metadata to `/upload-metadata`  
3. Backend uploads to IPFS via Web3.Storage, returns URI  
4. Frontend calls `/mint-utility` with wallet address & URI  
5. Backend mints ERC-721 token to user, returns tx hash

**Security:**  
- Use Replit secrets for API keys and private keys  
- Add validation and role checks as needed

**Ready to expand with:**
- File uploads (images, docs)
- Role-based minting
- Dashboard display of tokens
