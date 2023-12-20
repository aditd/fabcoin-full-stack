import React from 'react';
import { useState, useEffect } from "react";
import './style.css';
//import { toppings } from "./utils/toppings";
//import { initiateTransaction } from '../services/FabcoinService';



const FabcoinTransaction = () => {

  useEffect(() => {
    // Fetch toppings data from the backend API
    const fetchTXID = async () => {
      try {
        const response = await fetch('YOUR_BACKEND_API_ENDPOINT');
        const data = await response.json();
        setTXID(data); // Update the state with fetched toppings
        setCheckedState(new Array(data.length).fill(false)); // Initialize checkedState based on the length of toppings
      } catch (error) {
        console.error('Error fetching toppings:', error);
      }
    };

    fetchTXID();
  }, []); // Empty dependency array to run the effect only once on component mount

  const [checkedState, setCheckedState] = useState([]);
  const [receiver, setReceiver] = useState("");

  // State to store the list of input pairs
  const [inputList, setInputList] = useState([])
  const [total, setTotal] = useState(0);
  const [TXID, setTXID] = useState([]);
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleAmount = (position) => {
    //const value =
    //e.target.type === "checkbox" ? e.target.checked : e.target.value;
    //setAmount(value);
    const updatedCheckedState = checkedState.map((item, index) =>
    index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + TXID[index].price;
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
    setSubmitted(false);
  };

  // Handling the email change
  const handleReceiver = (e) => {
      setReceiver(e.target.value);
      setSubmitted(false);
  };

  // Function to handle adding the input pair to the list
  const handleAddInput = () => {
    // Split the input value into name and number
    const [name, number] = receiver.split(',').map(item => item.trim());

    // Check if both name and number are provided
    if (name && number) {
      // Add the input pair to the list
      setInputList([...inputList, { name, number }]);
      
      // Clear the input field
      if (!submitted) {
        setReceiver('');
        //setAmount(amount)
      }
    }
  };

  const getFormattedPrice = (price) => `$${price.toFixed(2)}`; 

// Showing success message
const successMessage = () => {
    return (
        <div
            className="success"
            style={{
                display: submitted ? "" : "none",
            }}
        >
            <h1>Transferred {total ? 'some' : 'no'} coins to {receiver} successfully!!</h1>
        </div>
    );
};

// Showing error message if error is true
const errorMessage = () => {
    return (
        <div
            className="error"
            style={{
                display: error ? "" : "none",
            }}
        >
            <h1>Please enter all the fields</h1>
        </div>
    );
};

  const handleTransaction = (e) => {
    // Implement transaction initiation logic
    e.preventDefault();
    if (total === 0 || receiver === "") {
        setError(true);
    } else {
        setSubmitted(true);
        setError(false);
        console.log('Sending Transaction:', { total, receiver });
        setInputList([]);
    }
    //console.log('Sending Transaction:', { amount, receiver });
  };

  return (
    <div>
      <h2>Fabcoin Transfer</h2>
      <form>
        <label>
          <h3>Select UTXOs:</h3>
          <ul className="toppings-list">
        {TXID.map(({ name, price }, index) => {
          return (
            <li key={index}>
              <div className="toppings-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedState[index]}
                    onChange={() => handleAmount(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>
                <div className="right-section">{getFormattedPrice(price)}</div>
              </div>
            </li>
          );
        })}
        <li>
          <div className="toppings-list-item">
            <div className="left-section">Total:</div>
            <div className="right-section">{getFormattedPrice(total)}</div>
          </div>
        </li>
      </ul>
        </label>
        <br />
        <label>
          Receiver:
          <input type="text" value={receiver} onChange={handleReceiver} />
        </label>
        <button type="button" onClick={handleAddInput}>Add</button>
        <br />

        <h2>All Input Pairs:</h2>
        <ul>
          {/* Displaying all input pairs */}
          {inputList.map((item, index) => (
            <li key={index}>{`Name: ${item.name}, Number: ${item.number}`}</li>
          ))}
        </ul>
        <button type="button" onClick={handleTransaction}>
          Initiate Transaction
        </button>
      </form>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
    </div>
  );
};

export default FabcoinTransaction;

//<div>
//<h2>Fabcoin Transactions</h2>
//{/* Add transaction initiation form or button */}
//<button onClick={handleTransaction}>Initiate Transaction</button>
//</div>