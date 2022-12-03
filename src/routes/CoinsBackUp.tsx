import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto; // 가운데로
`;

const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px; //클릭 범위를 넓혀줌
    transition: color 0.2s ease-in;
  }
  &:hover {
    /* styled 에서 Link는 나중에 a로 바뀌기 때문 */
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface CoinInterface {
  id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async() => {
      const response = await fetch('https://api.coinpaprika.com/v1/coins')
      const json = await response.json()
      setCoins(json.slice(0, 100))
      setLoading(false);
    })();
  },[])
  // [] 는 컴포넌트 시작점에서만 실행
  // console.log(coins)
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {loading ? <Loader>Loading</Loader> : 
        <CoinsList>
          {/* 그냥 a 태그쓰면 새로고침 되어서 Link 사용 */}
          {/* Link 는 나중에 a태그로 바뀜 */}
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={{
                pathname:`/${coin.id}`,
                state: {name:coin.name}
              }}>
                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} width="50px" />
                {coin.name} &rarr;
                </Link>
            </Coin>
          ))}
        </CoinsList>
      }
    </Container>
  );
}

export default Coins;
