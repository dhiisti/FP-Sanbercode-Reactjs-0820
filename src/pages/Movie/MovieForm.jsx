import React, { useContext} from "react";
import { MovieContext } from "../../context/MovieContext";
import { UserContext } from "../../context/UserContext";
import { Input } from 'antd';
import axios from "axios";

// import './movie.css'

const { TextArea } = Input;

const MovieForm = () => {
  const [dataMovie, setMovie, input, setInput,,] = useContext(MovieContext);
  const [user] = useContext(UserContext)

  const myChangeHandler = (event) => {
    let nam = event.target.name;
    let value = event.target.value;
    console.log(value);
    setInput({ ...input, [nam]: value });
  };

  const submitForm = (event) => {
    event.preventDefault();

    let year = input.year
    let rating = input.rating

    if ((year >= 1980) && (0 <= rating <=10)){
      if (input.id === null) {
        axios
          .post(`https://backendexample.sanbersy.com/api/data-movie`, {
            title: input.title,
            description: input.description,
            year: input.year,
            duration: input.duration,
            genre: input.genre,
            rating: input.rating,
            image_url: input.image_url,
          }, {headers: {"Authorization" : `Bearer ${user.token}`}})
          .then((res) => {
            let data = res.data;
            setMovie([
              ...dataMovie,
              {
                title: input.title,
                description: input.description,
                year: input.year,
                duration: input.duration,
                genre: input.genre,
                rating: input.rating,
                image_url: input.image_url,
                id: data.id,
              },
            ]);
          });
      } else {
        axios
          .put(`https://backendexample.sanbersy.com/api/data-movie/${input.id}`, {
            title: input.title,
            description: input.description,
            year: input.year,
            duration: input.duration,
            genre: input.genre,
            rating: input.rating,
            image_url: input.image_url,
          }, {headers: {"Authorization" : `Bearer ${user.token}`}})
          .then((res) => {
            var newDataMovie = dataMovie.map((x) => {
              if (x.id === input.id) {
                x.title = input.title;
                x.description = input.description;
                x.year = input.year;
                x.duration = input.duration;
                x.genre = input.genre;
                x.rating = input.rating;
                x.image_url = input.image_url;
                setMovie([...dataMovie]);
              }
            });
          });
      }
  
      setInput({
        title: "",
        description: "",
        year: 2020,
        duration: 120,
        genre: "",
        rating: 0,
        image_url: "",
        id: null,
      });
    };
  }

  return (
    <>
      <form onSubmit={submitForm}>
        <h1>Movie Form</h1>
        <div className="input-container">
          <label>Title:</label>
          <Input required type="text" name="title" value={input.title} onChange={myChangeHandler} placeholder="Title" />
        </div>

        <div className="input-container">
          <label>Description:</label>
          <TextArea rows={4} required name="description" value={input.description} onChange={myChangeHandler}/>
          {/* <textarea required name="description"
            style={{"height":"200px"}}
            value={input.description} onChange={myChangeHandler}/> */}
        </div>

        <div className="input-container">
          <label>Year:</label>
          <Input required type="number" name="year" value={input.year} min="1980" onChange={myChangeHandler} placeholder="Year" />
          {/* <input required type="number" name="year" value={input.year} min= "1980" onChange={myChangeHandler}/> */}
        </div>

        <div className="input-container">
          <label>Duration:</label>
          <Input required type="number" name="duration" value={input.duration} onChange={myChangeHandler} placeholder="Duration" />
          {/* <input required type="number" name="duration" value={input.duration} onChange={myChangeHandler}/> */}
        </div>

        <div className="input-container">
          <label>Genre:</label>
          <Input required type="text" name="genre" value={input.genre} onChange={myChangeHandler} placeholder="Genre" />
          {/* <input required type="text" name="genre" value={input.genre} onChange={myChangeHandler}/> */}
        </div>

        <div className="input-container">
          <label>Rating:</label>
          <Input required type="number" name="rating" value={input.rating} min="0" max="10" onChange={myChangeHandler} placeholder="Title" />
          {/* <input required type="number" name="rating" value={input.rating} min="0" max="10" onChange={myChangeHandler}/> */}
        </div>

        <div className="input-container">
          <label>Image URL:</label>
          <TextArea rows={4} required name="image_url" value={input.image_url} onChange={myChangeHandler}/>
          {/* <textarea required name="image_url" value={input.image_url} onChange={myChangeHandler}/> */}
        </div>   
        <button className="submit">Submit</button>
      </form>
    </>
  );
};

export default MovieForm;
