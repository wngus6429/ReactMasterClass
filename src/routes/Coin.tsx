import { useParams } from "react-router";

interface RouteParams {
  coinId: string;
}

function Coin() {
  const params = useParams<RouteParams>();
  console.log(params)
  return <h1>Coin</h1>;
}
export default Coin;