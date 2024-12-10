import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import MovieDetails from "./MovieDetails";
import Watchlist from "./Watchlist";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setSearchTerm("Batman");
    searchMovies("Batman", 1);
  }, []);

  const searchMovies = async (title, page) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}&page=${page}`);
      const data = await response.json();
      if (data.Response === "True") {
        setMovies((prevMovies) => [...prevMovies, ...data.Search]); // Append new results
        setTotalResults(data.totalResults);
        console.log(data);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const loadMoreMovies = () => {
    const nextPage = currentPage + 1;
    if (movies.length < totalResults) {
      searchMovies(searchTerm, nextPage);
      setCurrentPage(nextPage);
    }
  };

  const [selectedMovie, setSelectedMovie] = useState(null);

  const openDetails = async (title) => {
    try {
      const response = await fetch(`${API_URL}&t=${title}`);
      const data = await response.json();
      if (data.Response === "True") {
        setSelectedMovie(data); // Set movie details
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const closeDetails = () => {
    setSelectedMovie(null); // Close the modal
  };

  const [watchLists, setWatchLists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const addToWatchlist = (movie) => {
    setWatchLists((prevWatchlist) => [...prevWatchlist, movie]);
    alert(`${movie.Title} has been added to your watchlist!`);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="app">
      <h1>MovieLand</h1>
      <h2 className="h2-button">
        <button className="show-watchlist-button" onClick={toggleModal}>
          Your Watchlist
        </button>
      </h2>
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              setCurrentPage(1);
              console.log(currentPage);
              setMovies([]);
              searchMovies(searchTerm, 1);
            }
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            setCurrentPage(1);
            setMovies([]);
            searchMovies(searchTerm, 1);
          }}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard onClick={() => openDetails(movie.Title)} movie={movie} />
          ))}
          <div>
            <button
              onClick={loadMoreMovies}
              disabled={movies.length >= totalResults}
              className="loadMoreButton"
            >
              Load More
            </button>
          </div>
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={closeDetails}
          onAddToWatchlist={addToWatchlist}
        />
      )}
      {showModal && <Watchlist watchLists={watchLists} onClose={toggleModal} />}
    </div>
  );
};

export default App;
