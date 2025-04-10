import { useState, useEffect } from 'react';

export default function Donate() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <div className="loading"><div className="spinner"></div></div>;

  return (
    <div className="container donate">
      <h1>Donate to Our Project</h1>
      <p>Support Humper Flasher by donating to the following USDT addresses:</p>
      <div className="address">
        <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png" alt="USDT" />
        <p>USDT (TRC20): TX88i2zU4KYaU7h444Y669ECfyyKbpa3Bs</p>
        <button onClick={() => navigator.clipboard.writeText('TX88i2zU4KYaU7h444Y669ECfyyKbpa3Bs')}>Copy</button>
      </div>
      <div className="address">
        <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png" alt="USDT" />
        <p>USDT (BEP20): 0x117C84FeF09d9e8e5F9edE29F2499774C6ae116F</p>
        <button onClick={() => navigator.clipboard.writeText('0x117C84FeF09d9e8e5F9edE29F2499774C6ae116F')}>Copy</button>
      </div>
    </div>
  );
    }
