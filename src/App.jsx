import React, { useState } from 'react';
import './App.scss'
import { FilmList } from './components/film-list/film-list';
import { Logo } from './components/logo/logo';
import { Search } from './components/search/search';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (query) => {
      setSearchQuery(query);
    };

    const handleClearSearch = () => {
      setSearchQuery('');
    };

  return (
    <main className='main'>
      <Logo />
      <Search 
        value={searchQuery}
        onChange={handleSearchChange}
        onClear={handleClearSearch}
        placeholder="Поиск фильмов..."
      />
      <FilmList 
        searchQuery={searchQuery}
        onClearSearch={handleClearSearch}
      />
    </main>
  )
}

export default App
