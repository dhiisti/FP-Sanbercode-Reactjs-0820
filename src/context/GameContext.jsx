import React, { useState, createContext } from "react";

export const GameContext = createContext();

export const GameProvider = (props) => {
  const [dataGame, setGame] = useState(null);
  const [input, setInput] = useState({
    name: "",
    genre: "",
    release: 2020,
    singlePlayer: 1,
    multiplayer: 2,
    platform: "",
    image_url: "",
    id: null,
  });
  const [search, setSearch] = useState('')

  return (
    <GameContext.Provider value={[dataGame, setGame, input, setInput, search, setSearch]}>
      {props.children}
    </GameContext.Provider>
  );
};
