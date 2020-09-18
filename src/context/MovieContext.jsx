import React, { useState, createContext } from "react";

export const MovieContext = createContext();

export const MovieProvider = (props) => {
  const [dataMovie, setMovie] = useState(null);
  const [input, setInput] = useState({
    title: "",
    description: "",
    year: 2020,
    duration: 120,
    genre: "",
    rating: 0,
    image_url: "",
    id: null,
  });
  const [search, setSearch] = useState('')

  return (
    <MovieContext.Provider value={[dataMovie, setMovie, input, setInput, search, setSearch]}>
      {props.children}
    </MovieContext.Provider>
  );
};
