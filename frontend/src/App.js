import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import TransactionList from './components/TransactionList';
import BalanceDisplay from './components/BalanceDisplay';
import './App.css';

function App() {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState('0');
    const [provider, setProvider] = useState(null);

    return (
        <div className="App">
            <header className="header">
                <div className="logo-container">
                    <h1 className="gradient-text">Web3 Donation</h1>
                    <p className="subtitle">Blockchain Integration DApp</p>
                </div>
                <WalletConnect
                    setAccount={setAccount}
                    setBalance={setBalance}
                    setProvider={setProvider}
                />
            </header>

            <main className="main-content">
                {!account ? (
                    <div className="welcome-card">
                        <h2>Welcome to Decentralized Donation</h2>
                        <p>Connect your MetaMask wallet on Sepolia Testnet to interact with the blockchain.</p>
                    </div>
                ) : (
                    <div className="dashboard-layout">
                        <BalanceDisplay account={account} balance={balance} />
                        <TransactionList provider={provider} />
                    </div>
                )}
            </main>

            <footer className="footer">
                <p>&copy; 2026 Platform Donasi Web3</p>
            </footer>
        </div>
    );
}

export default App;
