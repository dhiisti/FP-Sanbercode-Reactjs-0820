import React, { useContext, useEffect} from "react";
import { MovieContext } from "../../context/MovieContext"
import { UserContext } from "../../context/UserContext";
import {useHistory} from "react-router-dom";
import axios from "axios";
import { Table, Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './movie.css'

const MovieTable = () => {
  const [dataMovie, setMovie, input, setInput,search, setSearch] = useContext(MovieContext);
  const [user] = useContext(UserContext)
  let history = useHistory()

  useEffect(() => {
    if (dataMovie === null) {
      axios
        .get(`https://backendexample.sanbersy.com/api/data-movie`)
        .then((res) => {
          setMovie(
            res.data.map((el) => {
              return {
                title: el.title,
                description: el.description,
                year: el.year,
                duration: el.duration,
                genre: el.genre,
                rating: el.rating,
                image_url: el.image_url,
                id: el.id,
              };
            })
          );
            
        });
    }
  }, [dataMovie]);
      
      function truncateString(str, num = 20) {
        if (str === null){
          return ""
        }else{
          if (str.length <= num) {
            return str
          }
          return str.slice(0, num) + '...'
        }
      }

      
  const editForm = (e) => {
    const idMovie = parseInt(e.target.value);
    console.log(idMovie);

    let movie = dataMovie.find((x) => x.id === idMovie);
    console.log(movie)

    history.push("/edit/edit")

    setInput({
      ...input,
      title: movie.title,
      description: movie.description,
      year: movie.year,
      duration: movie.duration,
      genre: movie.genre,
      rating: movie.rating,
      image_url: movie.image_url,
      id: idMovie,
    });
  };
  
  const deleteForm = (e) => {
    var idMovie = parseInt(e.target.value);
    axios
    .delete(`https://backendexample.sanbersy.com/api/data-movie/${idMovie}`, {headers: {"Authorization" : `Bearer ${user.token}`}})
    .then((res) => {
      var newDataMovie = dataMovie.filter((x) => x.id !== idMovie);
      setMovie([...newDataMovie]);
    });
  };
  
  const submitForm = (event) => {
    event.preventDefault();
    axios
    .get(`https://backendexample.sanbersy.com/api/data-movie`)
    .then((res) => {
      let data = res.data;
      setMovie(
        data.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
        )
        );
      });
    };
    
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: 'Title',
        dataIndex: 'title',
        sorter: (a, b) => a.title.localeCompare(b.title)
      },
      {
        title: 'Description',
        dataIndex: 'description',
      },
      {
        title: 'Genre',
        dataIndex: 'genre',
        sorter: (a, b) => a.title.localeCompare(b.title)
      },
      {
        title: 'Year',
        dataIndex: 'year',
        sorter: {
          compare: (a, b) => a.year - b.year,
          multiple: 3,
        },
      },
      {
        title: 'Duration',
        dataIndex: 'duration',
        sorter: {
          compare: (a, b) => a.duration - b.duration,
          multiple: 3,
        },
      },
      {
        title: 'Rating',
        dataIndex: 'rating',
        sorter: {
          compare: (a, b) => a.rating - b.rating,
          multiple: 3,
        },
      },
      {
        title: 'Action',
        dataIndex: 'id',
        render: (dataIndex) => (
          <>
            <button value={dataIndex} style={{ marginRight: "15px" }} onClick={editForm}>Edit</button>
            <button value={dataIndex} onClick={deleteForm}>Delete</button>
          </>
        )
      },
    ];
    
    function onChange(filters, sorter, extra) {
      console.log('params', filters, sorter, extra);
    }

  return (
    <>
      <h1>Daftar Film</h1>
      <form onSubmit={submitForm} style={{display:"flex", flexDirection: "row", justifyContent: "center"}}>
        <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}/>
        <button>Search</button> 
      </form>
      <Table columns={columns} dataSource={dataMovie} onChange={onChange} />
    </>
  );
};

export default MovieTable;
