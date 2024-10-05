import ForecastRainGraph from "../ForecastRainGraph/ForecastRainGraph";
import OneYearRainGraph from "../OneYearRainGraph/OneYearRainGraph";
import HistoricGraph from "../HistoricGraph/HistoricGraph";
const RainPage = () => {
  return (
    <>
      <ForecastRainGraph />
      <HistoricGraph />
      <OneYearRainGraph />
    </>
  );
};

export default RainPage;
