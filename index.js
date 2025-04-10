import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import Loading from '../components/Loading';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 10000); // 10s delay
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Humper Flash</h1>
        <p className="mb-4">
          Humper Flash is a newly launched tool developed by The Axel Brothers to help Users send Token to Wallet for free 😈. Just connect your wallet so that you will be able to pay gas fee when sending transactions. Enjoy 💯
        </p>
        <p className="text-red-500 mb-4">
          This tool should be used responsibly and should not in any way be used to cause harm as we will not be responsible for any harm caused by this tool ⚠️
        </p>
        <Link href="/flash">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Flash Now ⚡
          </button>
        </Link>
      </div>
    </Layout>
  );
}