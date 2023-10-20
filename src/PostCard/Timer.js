import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Timer() {
  const [time, setTime] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [paused, setPaused] = useState(false);
  const moment = require("moment-timezone");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountrys = () => {
      fetch(`http://worldtimeapi.org/api/timezone`)
        .then((response) => response.json())
        .then((data) => {
          setCountryList(data);
          if (selectedCountry === "") setSelectedCountry(data[0]);
        })
        .catch((error) => {
          console.error("Error fetching country:", error);
        });
    };
    fetchCountrys();
  }, [selectedCountry]);

  useEffect(() => {
    const updateClock = () => {
      fetch(`http://worldtimeapi.org/api/timezone/${selectedCountry}`)
        .then((response) => response.json())
        .then((data) => {
          const dateTime = moment.tz(data.datetime, data.timezone);
          const realTime = dateTime.tz(data.timezone);
          setTime(realTime.format("HH:mm:ss"));
        })
        .catch((error) => {
          console.error("Error fetching time:", error);
        });
    };
    updateClock();
  }, [selectedCountry]);

  const toggleClock = () => {
    if (paused) {
      setPaused(false);
    } else {
      setPaused(true);
    }
  };

  useEffect(() => {
    if (paused) {
      const intervalId = setInterval(function () {
        setTime((prevTime) => {
          const originalTime = moment(prevTime, "HH:mm:ss");
          // Add one second
          const newTime = originalTime.add(1, "seconds");

          const formattedTime = newTime.format("HH:mm:ss");

          return formattedTime;
        });
      }, 1000);

      //
      return () => clearInterval(intervalId);
    }
  }, [paused, selectedCountry]);
  return (
    <div className="user-profile">
      <div>
        <button
          className="custom-primary-outline-btn"
          onClick={(e) => navigate("/")}
        >
          Back btn
        </button>
      </div>

      <div id="clock">
        <span className="timer ">{time} </span>{" "}
        <button className="custom-primary-outline-btn" onClick={toggleClock}>
          {!paused ? "Start" : "Pause"}
        </button>
      </div>
      <div>
        <select
          className="form-control"
          id="customSelect"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countryList.map(
            (item) => (
              <option key={item} value={item}>
                {item}
              </option>
            )
            // <option value="Europe/London">Europe/London</option>
          )}
        </select>
      </div>
    </div>
  );
}

export default Timer;
