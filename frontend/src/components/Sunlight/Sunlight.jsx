import { useEffect, useState } from "react";

const Sunlight = ({ sunRise, sunSet }) => {
  function convertTo12HourTime(dateTimeString) {
    const date = new Date(dateTimeString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    const strTime = hours + ":" + minutesStr + " " + ampm;
    return strTime;
  }
  return (
    <>
      {sunRise ? (
        <>
          <p>Sunrise: {convertTo12HourTime(sunRise)}</p>
          <p>Sunset: {convertTo12HourTime(sunSet)}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Sunlight;
