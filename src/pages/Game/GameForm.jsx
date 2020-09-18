import React, { useContext} from "react";
import { GameContext } from "../../context/GameContext";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { Input } from 'antd';

import '../Movie/movie.css'

const { TextArea } = Input;

const MovieForm = () => {
  const [dataGame, setGame, input, setInput,,] = useContext(GameContext);
  const [user] = useContext(UserContext)

  const myChangeHandler = (event) => {
    let nam = event.target.name;
    let value = event.target.value;
    console.log(value);
    setInput({ ...input, [nam]: value });
  };

  const submitForm = (event) => {
    event.preventDefault();

      if (input.id === null) {
        axios
          .post(`https://backendexample.sanbersy.com/api/data-game`, {
            name: input.name,
            genre: input.genre,
            release: input.release,
            singlePlayer: input.singlePlayer,
            multiplayer: input.multiplayer,
            platform: input.platform,
            image_url: input.image_url,
          }, {headers: {"Authorization" : `Bearer ${user.token}`}})
          .then((res) => {
            let data = res.data;
            setGame([
              ...dataGame,
              {
                name: input.name,
                genre: input.genre,
                release: input.release,
                singlePlayer: input.singlePlayer,
                multiplayer: input.multiplayer,
                platform: input.platform,
                image_url: input.image_url,
                id: data.id,
              },
            ]);
          });
      } else {
        axios
          .put(`https://backendexample.sanbersy.com/api/data-game/${input.id}`, {
            name: input.name,
            genre: input.genre,
            release: input.release,
            singlePlayer: input.singlePlayer,
            multiplayer: input.multiplayer,
            platform: input.platform,
            image_url: input.image_url,
          }, {headers: {"Authorization" : `Bearer ${user.token}`}})
          .then((res) => {
            var newdataGame = dataGame.map((x) => {
              if (x.id === input.id) {
                x.name = input.name;
                x.genre = input.genre;
                x.release = input.release;
                x.singlePlayer = input.singlePlayer;
                x.multiplayer = input.multiplayer;
                x.platform = input.platform;
                x.image_url = input.image_url;
                setGame([...dataGame]);
              }
            });
          });
      }
  
      setInput({
        name: "",
        genre: "",
        release: 2020,
        singlePlayer: 1,
        multiplayer: 2,
        platform: "",
        image_url: "",
        id: null,
      });
  }

  return (
    <>
      <form onSubmit={submitForm}>
        <h1>Movie Form</h1>
        <div className="input-container">
          <label>Name :</label>
          <Input required type="text" name="name" value={input.name} onChange={myChangeHandler} style={{width: "50%"}} placeholder="Name" />
          {/* <input required type="text" name="name" value={input.name} onChange={myChangeHandler}/> */}
        </div>

        <div className="input-container">
          <label>Genre :</label>
          <Input required type="text" name="genre" value={input.genre} onChange={myChangeHandler} style={{width: "50%"}} placeholder="Genre" />
          {/* <textarea required name="genre"
            style={{"height":"200px"}}
            value={input.genre} onChange={myChangeHandler}/> */}
        </div>

        <div className="input-container">
          <label>Release :</label>
          <Input required type="number" name="release" value={input.release} min="1980" onChange={myChangeHandler} style={{width: "50%"}} placeholder="Release" />
          {/* <input required type="number" name="release" value={input.release} min="1980" onChange={myChangeHandler}/> */}
        </div>

        <div className="input-container">
          <label>Singleplayer :</label>
          <Input required type="number" name="singlePlayer" value={input.singlePlayer} onChange={myChangeHandler} style={{width: "50%"}} placeholder="Singleplayer" />
          {/* <input required type="number" name="singlePlayer" value={input.singlePlayer} min= "1" onChange={myChangeHandler}/> */}
        </div>

        <div className="input-container">
          <label>Multiplayer :</label>
          <Input required type="number" name="multiplayer" value={input.multiplayer} onChange={myChangeHandler} style={{width: "50%"}} placeholder="Multiplayer" />
          {/* <input required type="number" name="multiplayer" value={input.multiplayer} onChange={myChangeHandler}/> */}
        </div>

        <div className="input-container">
          <label>Platform :</label>
          <Input required type="text" name="platform" value={input.platform} onChange={myChangeHandler} style={{width: "50%"}} placeholder="Platform" />
          {/* <input required type="text" name="platform" value={input.platform} onChange={myChangeHandler}/> */}
        </div>


        <div className="input-container">
          <label>Image URL:</label>
          <TextArea rows={4} required name="image_url" value={input.image_url} onChange={myChangeHandler} style={{width: "50%"}}/>
          {/* <textarea required name="image_url" value={input.image_url} onChange={myChangeHandler}/> */}
        </div>   
        <button className="submit">Submit</button>
      </form>
    </>
  );
};

export default MovieForm;
