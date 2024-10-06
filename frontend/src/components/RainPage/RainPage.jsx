import ForecastRainGraph from "../ForecastRainGraph/ForecastRainGraph";
import OneYearRainGraph from "../OneYearRainGraph/OneYearRainGraph";
import HistoricGraph from "../HistoricGraph/HistoricGraph";
import Recommendation from "../Recommendation/Recommendation";
import styles from "./RainPage.module.css";
import { Coords } from "../../App";
import { useContext } from "react";

const RainPage = () => {
  const coord = useContext(Coords);
  return (
    <div className={styles.container}>
      <Recommendation lon={coord[0]} lat={coord[1]} />
      <OneYearRainGraph lon={coord[0]} lat={coord[1]} />
      <HistoricGraph lon={coord[0]} lat={coord[1]} />
      <ForecastRainGraph lon={coord[0]} lat={coord[1]} />
    </div>
  );
};

export default RainPage;
