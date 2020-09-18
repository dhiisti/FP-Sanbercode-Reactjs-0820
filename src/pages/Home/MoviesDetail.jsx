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

const MovieDetail = () => {
  const [dataMovie, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (dataMovie === null) {
      axios
        .get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
        .then((res) => {
          setData(res.data);
        });
    }
  }, [dataMovie, setData]);

  return (
    <div style={{background: "#EAF4D3", width: "80%", margin: "20px auto"}}>
      {dataMovie !== null && (
        <div style={{display: "flex", flexDirection: "column", padding: "50px"}}>
        <div style={{display: "flex", flexDirection: "row"}}>
          <Image width={200} src={dataMovie.image_url}/>
          <div style={{display: "flex", flexDirection: "column", marginLeft: "40px"}}>
            <h2><strong>Title : </strong>{dataMovie.title}</h2>
            <h2><strong>Genre : </strong>{dataMovie.genre}</h2>
            <h2><strong>Rating : </strong>{dataMovie.rating}</h2>
            <h2><strong>Duration : </strong>{minuteToHours(dataMovie.duration)}</h2>
            <h2><strong>Year : </strong>{dataMovie.year}</h2>
          </div>
        </div>
          <h2 style={{marginTop: "40px"}}> <strong>Description :</strong></h2>
          <p>{dataMovie.description}</p>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
