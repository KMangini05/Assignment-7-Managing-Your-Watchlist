import { useState } from 'react';
import { searchMovies } from './services/movieService';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import './App.css';

function App() {
  //Store search results
  const [searchResults, setSearchResults] = useState(null);

  //Search TMDB
  const handleSearch = async (query) => {
    console.log('Search button clicked. Query:', query);

  if (!query.trim()) {
    setSearchResults(null);
    return;
  }

    try {
      const results = await searchMovies(query);
      console.log('Movies returned from API:', results);
      setSearchResults(results || []);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  return (
    <Router>
      <div className="app">
        <Header onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Home searchResults={searchResults} />} 
          />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;