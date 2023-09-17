import React from "react";
import MoviesList from "./components/MovieList";
import "./App.css";
import { useState } from "react";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //Movies fetching from database

  async function fetchMovies() {
    setIsLoading(true);
    const response = await fetch(
      "https://movies-d8eb5-default-rtdb.europe-west1.firebasedatabase.app/movies.json"
    );
    const data = await response.json();
    const loadedMovies = [];
    for (const key in data) {
      loadedMovies.push({
        id: key,
        title: data[key].name,
        releaseDate: data[key].date,
        openingText: data[key].details,
      });
    }
    setMovies(loadedMovies);
    setIsLoading(false);

  }

    //Movies fetching end here


  let content = <p>No Movies Found</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }


    //Movies Adding into database

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://movies-d8eb5-default-rtdb.europe-west1.firebasedatabase.app/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Types": "application/json",
        },
      }
    );
    const data = await response.json();
  }
    //Movies Adding Ends here



  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
