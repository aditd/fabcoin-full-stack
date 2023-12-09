import React, { useState, useEffect } from 'react';
import { getWalletBalance } from '../services/FabcoinService';

const FabcoinWallet = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Fetch wallet balance when the component mounts
    const fetchBalance = async () => {
      const walletBalance = await getWalletBalance();
      setBalance(walletBalance);
    };

    fetchBalance();
  }, []);

  return (
    <div>
      <h2>Fabcoin Wallet</h2>
      <p>Balance: {balance} FBC</p>
      {/* Add transaction initiation form or button */}
    </div>
  );
};

export default FabcoinWallet;