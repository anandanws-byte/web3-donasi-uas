import React, { useEffect, useState } from 'react';

const TransactionList = () => {
    const [dummyTransactions, setDummyTransactions] = useState([]);

    useEffect(() => {
        // Fetch filter matching the tutorial response { success: true, data: [...] }
        fetch('http://localhost:5000/api/transactions')
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    setDummyTransactions(result.data);
                }
            })
            .catch(err => console.error("Error fetching transactions:", err));
    }, []);

    return (
        <div className="transactions-grid">
            <div className="transaction-section">
                <h3>Backend API Transactions (GET /api/transactions)</h3>
                <div className="list-container">
                    {dummyTransactions.map(tx => (
                        <div key={tx.id} className="list-item tx-column">
                            <div className="tx-row">
                                <span className="label">From:</span>
                                <span className="address">{tx.from}</span>
                            </div>
                            <div className="tx-row">
                                <span className="label">To:</span>
                                <span className="address">{tx.to}</span>
                            </div>
                            <div className="tx-row tx-footer">
                                <span className="amount-pill">{tx.amount}</span>
                                <span className="date">{tx.timestamp}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TransactionList;
