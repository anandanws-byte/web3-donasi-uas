import { ethers } from 'ethers';
import { useState } from 'react';

function WalletConnect({ setAccount, setBalance, setProvider }) {
    const [account, setLocalAccount] = useState('');
    const [balance, setLocalBalance] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                const balanceWei = await provider.getBalance(address);
                const balanceEth = ethers.formatEther(balanceWei);

                // Update local state for display in this component
                setLocalAccount(address);
                setLocalBalance(balanceEth);

                // Update parent state (App.js)
                setAccount(address);
                setBalance(balanceEth);
                setProvider(provider);
            } catch (error) {
                console.error("Error connecting wallet:", error);
                alert("Gagal menghubungkan wallet. Pastikan MetaMask terpasang.");
            }
        } else {
            alert("Silakan instal MetaMask!");
        }
    };

    return (
        <div className="wallet-connect">
            <button className="premium-button" onClick={connectWallet}>
                {account ? `Connected: ${account.substring(0, 6)}...` : "Connect MetaMask"}
            </button>
            {balance && <p className="balance-info">Balance: {balance} ETH</p>}
        </div>
    );
}

export default WalletConnect;
