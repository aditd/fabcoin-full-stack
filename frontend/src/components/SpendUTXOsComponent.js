import React, { useState } from 'react';
import axios from 'axios';

const SpendUTXOsComponent = ({ username }) => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [inputUTXOs, setInputUTXOs] = useState(['']);
    const [userAmountPairs, setUserAmountPairs] = useState([{ user: '', amount: '' }]);


    const handleAddUTXO = () => {
        setInputUTXOs([...inputUTXOs, '']);
    };

    const handleUTXOChange = (index, value) => {
        const updatedUTXOs = inputUTXOs.map((utxo, i) => i === index ? value : utxo);
        setInputUTXOs(updatedUTXOs);
    };

    const handleUserAmountChange = (index, field, value) => {
        const updatedPairs = userAmountPairs.map((pair, i) => 
            i === index ? { ...pair, [field]: value } : pair
        );
        setUserAmountPairs(updatedPairs);
    };
    
    const handleAddPair = () => {
        setUserAmountPairs([...userAmountPairs, { user: '', amount: '' }]);
    };
    
    const handleRemovePair = (index) => {
        const updatedPairs = userAmountPairs.filter((_, i) => i !== index);
        setUserAmountPairs(updatedPairs);
    };
    

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3000/token/spend-token/', {
                isOrg1: true,
                isOrg2: false,
                isMinter: false,
                userID: username,
                spendData: {
                    utxoInputKeys: inputUTXOs.filter(utxo => utxo !== ''),
                    utxoOutputs: userAmountPairs.map(pair => [parseInt(pair.amount, 10), pair.username]) //[[parseInt(amount, 10), recipient]]
                }
            });
            console.log(`utxoInputKeys: ${inputUTXOs.filter(utxo => utxo !== '')}`)
            console.log(`utxoOutputs: ${userAmountPairs.map(pair => [parseInt(pair.amount, 10), pair.username])}`)
            console.log('Success:', response.data);
            // Handle success
        } catch (error) {
            console.error('Error spending tokens:', error);
            // Handle error
        }
    };

    return (
        <div className='spend-utxos'>
            <h2>Spend UTXOs</h2>
            <p>Choose which user you want to give money to and the amount</p>
            <div>
                {/* <label>User: </label>
                <input 
                    type="text" 
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)} 
                />
                <label>  Amount: </label>
                <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} 
                /> */}
                {userAmountPairs.map((pair, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={pair.username}
                            onChange={(e) => handleUserAmountChange(index, 'username', e.target.value)}
                            placeholder="User"
                        />
                        <input
                            type="number"
                            value={pair.amount}
                            onChange={(e) => handleUserAmountChange(index, 'amount', e.target.value)}
                            placeholder="Amount"
                        />
                        <button onClick={() => handleRemovePair(index)}>Remove</button>
                    </div>
                ))}
                <button onClick={handleAddPair}>Add More Users</button>
            </div>
            <div>
                <h4>Input UTXO Keys</h4>
                {inputUTXOs.map((utxo, index) => (
                    <div key={index}>
                        <input 
                            type="text" 
                            value={utxo}
                            onChange={(e) => handleUTXOChange(index, e.target.value)} 
                        />
                    </div>
                ))}
                <button onClick={handleAddUTXO}>Add UTXO</button>
            </div>
            <br></br>
            <button onClick={handleSubmit}><b>Spend Tokens</b></button>
        </div>
    );

};

export default SpendUTXOsComponent;
