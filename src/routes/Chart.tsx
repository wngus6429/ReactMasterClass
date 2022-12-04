import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistroy } from "../api";

interface ChartProps {
  coinId: string;
}
function Chart({ coinId }: ChartProps) {
  // const params = useParams();
  const {isLoading, data} = useQuery(['ohlcv', coinId], () => fetchCoinHistroy(coinId))
  return <h1>Chart</h1>;
}

export default Chart;
