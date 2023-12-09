import React, { useState } from 'react';

const MintTokens = () => {
  const [amount, setAmount] = useState(0);

  const handleMint = () => {
    // Implement logic to call the mint function in your smart contract
    console.log(`Minting ${amount} tokens`);
  };

  return (
    <div>
      <h2>Mint Tokens</h2>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handleMint}>Mint</button>
    </div>
  );
};

export default MintTokens;