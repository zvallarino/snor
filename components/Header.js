'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
  FaMap,
  FaChartBar,
  FaNewspaper,
  FaDatabase,
  FaSearch,
  FaTimes,
} from 'react-icons/fa';
import { CiMenuBurger } from 'react-icons/ci';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  const navigationLinks = [
    { name: 'Map', href: '/map', icon: <FaMap /> },
    { name: 'Graphs', href: '/graphs', icon: <FaChartBar /> },
    { name: 'News', href: '/news', icon: <FaNewspaper /> },
    { name: 'Data', href: '/data', icon: <FaDatabase /> },
  ];

  return (
    <header className="w-full h-16 fixed top-0 left-0 right-0 z-50 bg-red-500 shadow-md">
      <div className="container mx-auto flex items-center px-4 py-3">
        {/* Left Side: Logo and Navigation */}
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/">
            <Image src="/logoPop.png" alt="Logo" width={40} height={40} />
          </Link>

          {/* Mobile Menu Button (visible on mobile) */}
          <button
            className="md:hidden ml-4 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6 text-gray-700" />
            ) : (
              <CiMenuBurger className="w-6 h-6 text-gray-700" />
            )}
          </button>

          {/* Navigation Links (hidden on mobile) */}
          <nav className="hidden md:flex space-x-4 ml-6">
            {navigationLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <span
                  className={`flex items-center text-gray-700 hover:text-blue-500 cursor-pointer ${
                    pathname === link.href ? 'font-semibold text-blue-500' : ''
                  }`}
                >
                  <span className="mr-1">{link.icon}</span>
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Side: Search Bar */}
        <div className="flex items-center ml-auto">
          {/* Search Bar (hidden on mobile) */}
          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </form>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {navigationLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href}>
                  <span
                    className={`flex items-center text-gray-700 hover:text-blue-500 cursor-pointer ${
                      pathname === link.href ? 'font-semibold text-blue-500' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-1">{link.icon}</span>
                    {link.name}
                  </span>
                </Link>
              </li>
            ))}
            {/* Include the search bar in the mobile menu if desired */}
            <li className="w-11/12">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </form>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
