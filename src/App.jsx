//import { useState, useEffect, useReducer, useContext } from "react";
import React from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });
  const toDate = () => {
    const months = [
      "January",
      "Febreuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentDate = new Date();
    const date = `${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
    return date;
  };

  const search = (e) => {
    if (e.key === "Enter") {
      setInput("");
      setWeather({ ...weather, loading: true });
      axios
        .get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: input,
            units: "metric",
            appid: "6f32e060b5ca27005aa80278dfa313b8",
          },
        })
        .then((res) => {
          console.log(res);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((err) => {
          setWeather({ ...weather, data: {}, error: true });
        });
    }
  };
  return (
    <>
      <div className="flex flex-col gap-3 w-80 mb-10 bg-zinc-900 p-5 rounded-lg h-80">
        <input
          className="text-center"
          type="text"
          placeholder="Enter the city name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={search}
        />
        {weather.loading && (
          <Oval type="Oval" color="green" height={70} width={70}></Oval>
        )}
        {weather.error && (
          <div className="error-message">
            <span>City not found</span>
          </div>
        )}
        {weather && weather.data && weather.data.main && (
          <div>
            <div className="city-name font-semibold text-3xl">
              <h2>
                {weather.data.name}, <span>{weather.data.sys.country}</span>
              </h2>
            </div>
            <div className="font-semibold text-2xl">
              <span>{toDate()}</span>
            </div>
            <div className="icon-temp">
              <img
                src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                alt=""
              />
              {Math.round(weather.data.main.temp)}
              <span className="deg">°C</span>
            </div>
            <div className="destination-wind">
              <p>{weather.data.weather[0].description.toUpperCase()}</p>
              <p>Wind Speed: {weather.data.wind.speed}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
