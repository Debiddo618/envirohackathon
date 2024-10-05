import ForecastRainGraph from "../ForecastRainGraph/ForecastRainGraph";
import OneYearRainGraph from "../OneYearRainGraph/OneYearRainGraph";
import HistoricGraph from "../HistoricGraph/HistoricGraph";
import Recommendation from "../Reccomendation/Recommendation";
const RainPage = () => {
  return (
    <>
      <Recommendation />
      <ForecastRainGraph />
      <HistoricGraph />
      <OneYearRainGraph />
    </>
  );
};

export default RainPage;
