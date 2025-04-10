import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="p-4 bg-gray-800 flex justify-between">
      <h1 className="text-xl font-bold">Humper Flasher</h1>
      <ul className="flex space-x-4">
        <li><Link href="/" className="hover:text-blue-400">Home</Link></li>
        <li><Link href="/flash" className="hover:text-blue-400">Flash</Link></li>
        <li><Link href="/donate" className="hover:text-blue-400">Donate</Link></li>
      </ul>
    </nav>
  );
}