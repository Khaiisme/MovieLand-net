import React from "react";
import "./MoviesDetails.css";
import { useRef, useEffect } from "react";
const MovieDetails = ({ movie, onClose, onAddToWatchlist }) => {
  const modalRef = useRef(); // Create a ref to the modal content

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the click is outside the modal
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Close the modal if click is outside
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);
  if (!movie) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="movie-details">
          <img src={movie.Poster} alt={`${movie.Title} Poster`} />
          <button
            className="add-to-watchlist"
            onClick={() => onAddToWatchlist(movie)}
          >
            Add to Watchlist
          </button>
          <div className="details-text">
            <h2>
              {movie.Title}
              {"  "}
            </h2>
            <p>
              <strong>Year: </strong> {movie.Year}
            </p>
            <p>
              <strong>Genre: </strong> {movie.Genre}
            </p>
            <p>
              <strong>Director: </strong> {movie.Director}
            </p>
            <p>
              <strong>Actors: </strong> {movie.Actors}
            </p>
            <p>
              <strong>IMDB Rating: </strong> {movie.imdbRating}
            </p>
            <p>
              <strong>Plot: </strong> {movie.Plot}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
