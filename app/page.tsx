import Link from 'next/link';

export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#C1FF30'
      }}
    >
      <img
        src="images/iD_Logo.png"
        alt="iD Logo"
        style={{ width: '150px', height: 'auto' }}
      />
    </div>
  );
}