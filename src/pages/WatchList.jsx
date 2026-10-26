import { useMovies } from "../contexts/MovieContext";

function WatchList() {
    const { watchList, removeFromWatchList } = useMovies();

    return (
        <main className="main-content">
            <div className="content-header">
                <h2>My WatchList</h2>
                <p>Movies you want to watch later.</p>
            </div>

            {watchList.length > 0 ? (
                <div className="movie-grid">
                    {watchList.map((movie) => (
                        <div className="movie-card" key={movie.id}>
                            <img
                                src={
                                    movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                        : `https://placehold.co/300x450?text=No+Poster`
                                }
                                alt={movie.title}
                            />

                            <h3>{movie.title}</h3>

                            <button
                             onClick={() => removeFromWatchList(movie.id)}
                            >
                                Remove from WatchList
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <p>Your WatchList is empty.</p>
                    <p>Add movies from the Home page to see them here!</p>
                </div>
            )}
        </main>
    );
}

export default WatchList;