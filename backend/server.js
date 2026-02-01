const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const app = express();

app.use(cors());
app.use(express.json());

// --- KONFIGURASI BLOCKCHAIN ---
const CONTRACT_ADDRESS = "0xF0606763F5605B3007e0F13C45E22fB4F896F978";

// ABI Sesuai dengan Smart Contract kamu
const CONTRACT_ABI = [
  "function totalDonations() public view returns (uint256)",
  "event DonationReceived(address donor, uint256 amount)"
];

// Menggunakan public RPC yang lebih stabil dan melewati deteksi network otomatis secara total
const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com", 11155111, {
  staticNetwork: true
});
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

// API untuk mengambil transaksi (Dummy + On-Chain Data)
app.get('/api/transactions', async (req, res) => {
  try {
    let totalEth = "0";

    // Mencoba mengambil data dari blockchain (dengan timeout/error handling)
    try {
      const totalRaw = await contract.totalDonations();
      totalEth = ethers.formatEther(totalRaw);
    } catch (blockchainError) {
      console.error("Blockchain error:", blockchainError.message);
      // Jika blockchain gagal, kita tetap lanjut dengan total "0" atau data dummy saja
    }

    res.json({
      success: true,
      totalOnChain: totalEth,
      data: [
        {
          id: 1,
          from: "0xa878...3DD0",
          to: "Contract",
          amount: "0.01 ETH",
          timestamp: "Baru Saja"
        },
        {
          id: 2,
          from: "0x123...",
          to: "0x456...",
          amount: "0.5 ETH",
          timestamp: "2025-01-12"
        }
      ]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
