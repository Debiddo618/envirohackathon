import ForecastRainGraph from "../ForecastRainGraph/ForecastRainGraph";
import OneYearRainGraph from "../OneYearRainGraph/OneYearRainGraph";
import HistoricGraph from "../HistoricGraph/HistoricGraph";
import Recommendation from "../Recommendation/Recommendation";
const RainPage = () => {
  return (
    <>
      <Recommendation />
      <OneYearRainGraph />
      <ForecastRainGraph />
      <HistoricGraph />
      
    </>
  );
};

export default RainPage;
