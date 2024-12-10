import React from "react";
import MovieCard from "./MovieCard"; // Assuming MovieCard displays the movie details
import "./WatchList.css"
const Watchlist = ({ watchLists, onClose }) => {
    console.log(watchLists)
  return (
    <div className="modal-overlay">
      <div className="modal-content-1 full-screen-modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2 className="heading">Your Watchlist</h2>
        <div className="watchlist-container">
          {watchLists.length === 0 ? (
            <p>No movies in your watchlist.</p>
          ) : (
            watchLists.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
