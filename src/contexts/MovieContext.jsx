import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export function MovieProvider({ children }) {
    const [watchList, setWatchList] = useState(() => {
        const saved = localStorage.getItem('movieshelf-watchlist');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(
            'movieshelf-watchlist',
            JSON.stringify(watchList)
        );
    }, [watchList]);

    const addToWatchList = (movie) => {
        setWatchList((currentWatchList) => {
            if (currentWatchList.some((item) => item.id === movie.id)) {
                return currentWatchList;
            }

            return [...currentWatchList, movie];
        });
    };

    const removeFromWatchList = (movieId) => {
        setWatchList((currentWatchList) =>
            currentWatchList.filter((movie) => movie.id !== movieId)
        );
    };

    return (
        <MovieContext.Provider
         value={{
            watchList,
            addToWatchList,
            removeFromWatchList,
         }}
        >
            {children}
        </MovieContext.Provider>
    );
}

export function useMovies() {
    return useContext(MovieContext);
}
