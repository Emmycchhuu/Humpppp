import { useState, useEffect } from 'react';

const TOKEN_INFO = {
  USDT_TRC20: { network: 'TRON', contractAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t' },
  USDT_BEP20: { network: 'BSC', contractAddress: '0x55d398326f99059fF775485246999027B3197955' },
  USDT_ERC20: { network: 'Ethereum', contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7' },
  BTC_BEP20: { network: 'BSC', contractAddress: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c' },
  USDC_BEP20: { network: 'BSC', contractAddress: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d' },
  ETH_BEP20: { network: 'BSC', contractAddress: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8' },
  SHIB_BEP20: { network: 'BSC', contractAddress: '0x2859e4544C4BB03966803b044A93563Bd2D0DD4D' },
};

const fetchTransactions = async (network, contractAddress) => {
  // Example APIs (replace with actual API keys or use free tiers)
  if (network === 'Ethereum') {
    const res = await fetch(
      `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${contractAddress}&sort=desc`
    );
    const data = await res.json();
    return data.result?.slice(0, 5) || [];
  } else if (network === 'BSC') {
    const res = await fetch(
      `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${contractAddress}&sort=desc`
    );
    const data = await res.json();
    return data.result?.slice(0, 5) || [];
  } else if (network === 'TRON') {
    const res = await fetch(
      `https://apilist.tronscan.org/api/transaction?sort=-timestamp&limit=5&token=${contractAddress}`
    );
    const data = await res.json();
    return data.data || [];
  }
  return [];
};

export default function LiveTransactions({ token }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const updateTransactions = async () => {
      const { network, contractAddress } = TOKEN_INFO[token];
      const txs = await fetchTransactions(network, contractAddress);
      setTransactions(txs);
    };
    updateTransactions();
    const interval = setInterval(updateTransactions, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [token]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Live Transactions</h2>
      <ul className="space-y-2">
        {transactions.map((tx, index) => (
          <li key={index} className="bg-gray-700 p-2 rounded">
            {tx.from || tx.senderAddress} → {tx.to || tx.recipientAddress}: {tx.value / 1e6 || tx.amount} {token.split('_')[0]}
          </li>
        ))}
      </ul>
    </div>
  );
}
