import styles from "./Sunlight.module.css";

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
          <h1 className={styles.sunrise}>
            Sunrise: {convertTo12HourTime(sunRise)}
          </h1>
          <h1 className={styles.sunset}>
            Sunset: {convertTo12HourTime(sunSet)}
          </h1>
        </>
      ) : (
        // <p>Loading...</p>
        <div className={styles.container}>
          <h1 className={styles.sunrise}>Sunrise: 6:30 PM <span></span></h1>
          <h1 className={styles.sunset}>Sunset: 7:30 AM</h1>
        </div>
      )}
    </>
  );
};

export default Sunlight;
