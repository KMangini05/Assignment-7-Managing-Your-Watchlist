import { useEffect, useState } from 'react';

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(
      localStorage.getItem('movieshelf-favorites') || '[]'
    );

    setIsFavorite(
      favorites.some((favorite) => favorite.id === movie.id)
    );
  }, [movie.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(
      localStorage.getItem('movieshelf-favorites') || '[]'
    );

    const alreadyFavorite = favorites.some(
      (favorite) => favorite.id === movie.id
    );

    const updatedFavorites = alreadyFavorite
      ? favorites.filter((favorite) => favorite.id !== movie.id)
      : [...favorites, movie];

    localStorage.setItem(
      'movieshelf-favorites',
      JSON.stringify(updatedFavorites)
    );

    setIsFavorite(!alreadyFavorite);
  };

  return (
    <article className="movie-card">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/placeholder-movie.png'
        }
        alt={`${movie.title} poster`}
      />

      <h2>{movie.title}</h2>

      <button onClick={toggleFavorite}>
        {isFavorite ? '★ Remove Favorite' : '☆ Add Favorite'}
      </button>
    </article>
  );
}

export default MovieCard;