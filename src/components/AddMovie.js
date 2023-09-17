import { useRef } from "react";
import React from "react";
import "./AddMovie.css";

const AddMovie = (props) => {
  const nameRef = useRef("");
  const dateRef = useRef("");
  const detailsRef = useRef("");

  const addMovieToList = (event) => {
    event.preventDefault();

    const movie = {
      name: nameRef.current.value,
      date: dateRef.current.value,
      details: detailsRef.current.value,
    };

    props.onAddMovie(movie);
    
  };

  return (
    <div>
      <form onSubmit={addMovieToList}>
        <label htmlFor="name">Movie Name</label>
        <input type="text" id="name" ref={nameRef} />

        <label htmlFor="date">Release Date</label>
        <input type="date" id="date" ref={dateRef} />

        <label htmlFor="details">Movie Details</label>
        <textarea id="details" ref={detailsRef} rows={5} />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
export default AddMovie;
