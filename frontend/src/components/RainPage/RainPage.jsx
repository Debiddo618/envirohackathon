import ForecastRainGraph from "../ForecastRainGraph/ForecastRainGraph";
import OneYearRainGraph from "../OneYearRainGraph/OneYearRainGraph";
import HistoricGraph from "../HistoricGraph/HistoricGraph";
import Recommendation from "../Recommendation/Recommendation";
import styles from "./RainPage.module.css";
const RainPage = () => {
  return (
    <div className={styles.container}>
      <Recommendation />
      <OneYearRainGraph />
      <ForecastRainGraph />
      <HistoricGraph />
    </div>
  );
};

export default RainPage;

