import React, { useContext, useEffect} from "react";
import { GameContext } from "../../context/GameContext"
import { UserContext } from "../../context/UserContext";
import {useHistory} from "react-router-dom"
import axios from "axios";
import {Table, Button, Space} from 'antd';
// import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import '../Movie/movie.css'

const GameTable = () => {
  const [dataGame, setGame, input, setInput,search, setSearch] = useContext(GameContext);
  const [user] = useContext(UserContext)
  let history = useHistory()

  useEffect(() => {
    if (dataGame === null) {
      axios
        .get(`https://backendexample.sanbersy.com/api/data-game`)
        .then((res) => {
          setGame(
            res.data.map((el) => {
              return {
                name: el.name,
                genre: el.genre,
                release: el.release,
                singlePlayer: el.singlePlayer,
                multiplayer: el.multiplayer,
                platform: el.platform,
                image_url: el.image_url,
                id: el.id,
              };
            })
          );

        });
    }
  }, [dataGame]);

  const editForm = (e) => {
    const idGame = parseInt(e.target.value);
    console.log(idGame);
    let game = dataGame.find((x) => x.id === idGame);
    console.log(game)
    history.push('/gedit/edit')
    setInput({
      ...input,
      name: game.name,
      genre: game.genre,
      release: game.release,
      singlePlayer: game.singlePlayer,
      multiplayer: game.multiplayer,
      platform: game.platform,
      image_url: game.image_url,
      id: idGame,
    });
  };

  const deleteForm = (e) => {
    var idGame = parseInt(e.target.value);
    axios
      .delete(`https://backendexample.sanbersy.com/api/data-game/${idGame}`, {headers: {"Authorization" : `Bearer ${user.token}`}})
      .then((res) => {
        var newdataGame = dataGame.filter((x) => x.id !== idGame);
        setGame([...newdataGame]);
      });
  };

  const submitForm = (event) => {
    event.preventDefault();
        axios
          .get(`https://backendexample.sanbersy.com/api/data-game`)
          .then((res) => {
            let data = res.data;
            setGame(
              data.filter((movie) =>
                movie.name.toLowerCase().includes(search.toLowerCase())
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
      dataIndex: 'name',
      filters: [
        {
          text: 'Talion',
          value: 'Talion',
        },
        {
          text: 'Roblox',
          value: 'ROBLOX',
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      sorter: (a, b) => a.genre.localeCompare(b.genre)
    },
    {
      title: 'Release',
      dataIndex: 'release',
      sorter: {
        compare: (a, b) => a.release - b.release,
        multiple: 3,
      },
    },
    {
      title: 'Singleplayer',
      dataIndex: 'singlePlayer',
      sorter: {
        compare: (a, b) => a.singlePlayer - b.singlePlayer,
        multiple: 3,
      },
    },
    {
      title: 'Multiplayer',
      dataIndex: 'multiplayer',
      sorter: {
        compare: (a, b) => a.multiplayer - b.multiplayer,
        multiple: 3,
      },
    },
    {
      title: 'Platform',
      dataIndex: 'platform',
      sorter: (a, b) => a.platform.localeCompare(b.platform)
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
    <h1>Daftar Game</h1>
    <form onSubmit={submitForm} style={{display:"flex", flexDirection: "row", justifyContent: "center"}}>
      <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}/>
      <button>Search</button> 
    </form>
    <Table columns={columns} dataSource={dataGame} onChange={onChange} />
    </>
  );
};

export default GameTable;
