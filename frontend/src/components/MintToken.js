import React, { useState } from 'react';

const MintTokens = () => {
  const [amount, setAmount] = useState(0);

  const handleMint = () => {
    // Implement logic to call the mint function in your smart contract
    console.log('Minting Fabcoins:', amount);

  };
  const handleAmountChange = (e) => {
    // Implement logic to call the mint function in your smart contract
    const value = parseFloat(e.target.value);
    setAmount(value >= 0 ? value : 0);
  };

  return (
    <div className="centered">
    <label>
      Enter the amount of Fabcoins to mint:
      <input type="number" value={amount} onChange={handleAmountChange}/>
    </label>
    <button className="btn" onClick={handleMint}>Submit</button>
  </div>
  );
};

export default MintTokens;