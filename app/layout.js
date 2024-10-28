// rootLayout.jsx
import './globals.css';
import Header from '../components/Header';

export const metadata = {
  title: 'My Next.js App',
  description: 'A Next.js app with a custom header',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen w-screen">
        <Header />
        <main className="flex-1 ">{children}</main>
      </body>
    </html>
  );
}