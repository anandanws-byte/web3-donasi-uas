import React from 'react';

const BalanceDisplay = ({ account, balance }) => {
    return (
        <div className="balance-card">
            <div className="account-info">
                <span className="label">Wallet Address:</span>
                <span className="value">{account}</span>
            </div>
            <div className="balance-info">
                <span className="label">Current Balance:</span>
                <span className="balance-value">{balance} ETH</span>
            </div>
        </div>
    );
};

export default BalanceDisplay;
