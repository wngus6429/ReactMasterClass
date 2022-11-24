import { useParams } from 'react-router';

interface RouteParams {
  coinId: string;
}

//* useParams가 coinId를 포함하는 오브젝트를 반환할거라고 알려줌
//* useParams은 URL 정보를 잡아낼수 있게 해줌
function Coin() {
  const { coinId } = useParams<RouteParams>();
  console.log(coinId);
  return <h1>Coin: {coinId}</h1>;
}
export default Coin;
