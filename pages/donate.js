import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Loading from '../components/Loading';

export default function Donate() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Donate to Our Project</h1>
        <p className="mb-4">Support Humper Flasher by donating to the following USDT addresses:</p>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <img
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
              alt="USDT"
              className="w-6 h-6"
            />
            <p>USDT (TRC20): TX88i2zU4KYaU7h444Y669ECfyyKbpa3Bs</p>
            <button
              onClick={() => navigator.clipboard.writeText('TX88i2zU4KYaU7h444Y669ECfyyKbpa3Bs')}
              className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded"
            >
              Copy
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
              alt="USDT"
              className="w-6 h-6"
            />
            <p>USDT (BEP20): 0x117C84FeF09d9e8e5F9edE29F2499774C6ae116F</p>
            <button
              onClick={() => navigator.clipboard.writeText('0x117C84FeF09d9e8e5F9edE29F2499774C6ae116F')}
              className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
