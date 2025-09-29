import React, { useState, useEffect } from 'react';
import './App.scss'
import { FilmList } from './components/film-list/film-list';
import { Logo } from './components/logo/logo';
import { Search } from './components/search/search';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const getSearchFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('search') || '';
  };

  const updateURL = (query) => {
    const url = new URL(window.location);
    
    if (query.trim()) {
      url.searchParams.set('search', query);
    } else {
      url.searchParams.delete('search');
    }
    
    window.history.pushState({}, '', url.toString());
  };

  useEffect(() => {
    const initialSearch = getSearchFromURL();
    setSearchQuery(initialSearch);
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    updateURL(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    updateURL('');
  };

  useEffect(() => {
    const handlePopState = () => {
      const searchFromURL = getSearchFromURL();
      setSearchQuery(searchFromURL);
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

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