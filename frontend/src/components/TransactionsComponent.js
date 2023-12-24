import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetTransactions = ({ username }) => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3000/token/get-all-tokens/', {
                    isOrg1: true,
                    isOrg2: false,
                    isMinter: false,
                    userID: username
                });

                // Parse the transactions data
                setTransactions(JSON.parse(response.data.data));
            } catch (err) {
                setError('Failed to fetch transactions: ' + err.message);
            }
        };

        fetchData();
    }, [username]);

    return (
        <div>
            <h2>List Of Transactions</h2>
            {error ? <div>{error}</div> : renderTable(transactions)}
        </div>
    );
};

const renderTable = (transactions) => {
    if (transactions.length === 0) {
        return <div>No transactions found.</div>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Amount</th>
                    <th>Key</th>
                    <th>Owner</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction, index) => (
                    <tr key={index}>
                        <td>{transaction.Amount}</td>
                        <td>{transaction.Key}</td>
                        <td>{transaction.Owner}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default GetTransactions;
