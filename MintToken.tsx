// Modular Mint Token Component (React + wagmi)
import { useState } from 'react';
import { useAccount } from 'wagmi';

export default function MintToken() {
  const { address } = useAccount();
  const [type, setType] = useState<'security' | 'utility'>('security');
  const [amount, setAmount] = useState('');
  const [metadataURI, setMetadataURI] = useState('');
  const [status, setStatus] = useState('');

  const handleMint = async () => {
    const endpoint = type === 'security' ? '/mint-security' : '/mint-utility';
    const payload =
      type === 'security'
        ? { walletAddress: address, amount }
        : { walletAddress: address, metadataURI };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setStatus(`Minted! Tx: ${data.txHash}`);
  };

  return (
    <div>
      <h2>Mint Token</h2>
      <select onChange={(e) => setType(e.target.value as any)}>
        <option value="security">Security Token (Ethereum)</option>
        <option value="utility">Utility Token (Other Chains)</option>
      </select>
      {type === 'security' ? (
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      ) : (
        <input
          type="text"
          placeholder="Metadata URI"
          value={metadataURI}
          onChange={(e) => setMetadataURI(e.target.value)}
        />
      )}
      <button onClick={handleMint}>Mint</button>
      <p>{status}</p>
    </div>
  );
}