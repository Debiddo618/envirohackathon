import PrecipitationGraph from "../HistoricGraph/HistoricGraph";
import ForecastRainGraph from "../ForecastRainGraph/ForecastRainGraph";
const RainPage = () => {
  return (
    <>
      <ForecastRainGraph/>
      <PrecipitationGraph />
    </>
  );
};

export default RainPage;
