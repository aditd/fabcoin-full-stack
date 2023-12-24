import React, { useState } from 'react';
import axios from 'axios';

const MintComponent = ({ username }) => {
    // Component logic
    const [amount, setAmount] = useState('');
    const [responseMessage, setResponseMessage] = useState('');


    const handleMint = async () => {
        try {
            const response = await axios.post('http://localhost:3000/token/mint-token/', {
                isOrg1: true,
                isOrg2: false,
                isMinter: false,
                userID: username,
                amount: amount
            });

            setResponseMessage(`Response: ${JSON.stringify(response.data.data.result, null, 2)}`);
            // Handle additional response logic if needed
        } catch (error) {
            console.error('Error minting tokens:', error);
            setResponseMessage(`Error: ${error.message}`);
        }
    };


    return (
        <div>
            {/* Component UI */}
            <h2>Mint Tokens</h2>
            <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="Enter amount"
            />
            <button onClick={handleMint}>Mint</button>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default MintComponent;
