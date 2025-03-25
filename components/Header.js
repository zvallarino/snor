// Header.jsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FaMap,
  FaChartBar,
  FaNewspaper,
  FaDatabase,
  FaSearch,
} from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push('/tracker');
  };

  const navigationLinks = [
    { name: 'Map', href: '/map', icon: <FaMap /> },
    { name: 'Graph', href: '/graph', icon: <FaChartBar /> },
    { name: 'Details', href: '/tracker', icon: <FaNewspaper /> },
    { name: 'Data', href: '/trends', icon: <FaDatabase /> },
  ];

  return (
    <header className="w-full h-24 fixed top-0 left-0 right-0 z-50 bg-white shadow-md flex border-b-2 border-blue-950">
      <div className="flex w-1/6"></div>
      <div className="flex w-4/6 bg-white-300">
        <div className="flex w-5/6 h-full items-center">
          <a href="https://www.populationcouncil.org" className="ml-2">
            <img src="/PopLogo.svg" alt="Logo" className="w-36 h-36" />
          </a>

          <nav className="flex space-x-2 ml-2 justify-center items-center">
            {navigationLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <span
                  className={`flex items-center text-gray-700 hover:text-blue-500 cursor-pointer ${
                    pathname === link.href ? 'font-semibold text-blue-500' : ''
                  } text-xl px-4 py-2`}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex w-1/6 h-full items-center justify-center">
          <form onSubmit={handleSearch} className="relative w-full px-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute right-7 text-black top-1/2 transform -translate-y-1/2 text-gray-400" />
          </form>
        </div>
      </div>
      <div className="flex w-1/6"></div>
    </header>
  );
};

export default Header;
