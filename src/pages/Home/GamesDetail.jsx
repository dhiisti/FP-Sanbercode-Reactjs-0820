import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "antd";
import { useParams } from "react-router-dom";
import './Home.css'

function minuteToHours(num) {
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return (
    (rhours === 0 ? "" : rhours + " Hour(s)") +
    (rminutes === 0 ? "" : " " + rminutes + " Minutes")
  );
}

const GameDetail = () => {
  const [dataGame, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (dataGame === null) {
      axios
        .get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
        .then((res) => {
          setData(res.data);
        });
    }
  }, [dataGame, setData]);

  return (
    <div style={{background: "#EAF4D3", width: "80%", margin: "20px auto", borderRadius: "20px"}}>
      {dataGame !== null && (
        <div style={{display: "flex", flexDirection: "column", padding: "50px"}}>
        <div style={{display: "flex", flexDirection: "row"}}>
          <Image width={200} src={dataGame.image_url}/>
          <div style={{display: "flex", flexDirection: "column", marginLeft: "40px"}}>
            <h2><strong>Name : </strong>{dataGame.name}</h2>
            <h2><strong>Genre : </strong>{dataGame.genre}</h2>
            <h2><strong>Platform : </strong>{dataGame.platform}</h2>
            <h2><strong>Year : </strong>{dataGame.release}</h2>
            <h2><strong>Singleplayer : </strong>{dataGame.singlePlayer} person</h2>
            <h2><strong>Multiplayer : </strong>{dataGame.multiplayer} person</h2>
          </div>
        </div>
          
        </div>
      )}
    </div>
  );
};

export default GameDetail;
