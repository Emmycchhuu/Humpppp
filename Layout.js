import Navigation from './Navigation';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>{children}</main>
    </div>
  );
}