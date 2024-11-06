// components/SearchBar.js

import React from 'react';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Navigate to the /tracker page
    router.push('/tracker');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type here..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />
    </form>
  );
};

export default SearchBar;