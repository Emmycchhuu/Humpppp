import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <h1>Humper Flasher</h1>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/flash">Flash</Link></li>
        <li><Link href="/donate">Donate</Link></li>
      </ul>
    </nav>
  );
    }
