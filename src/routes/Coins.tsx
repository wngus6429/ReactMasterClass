import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { fetchCoins } from '../api';
import { Helmet } from 'react-helmet';
import { useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';

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
  color: ${(props) => props.theme.textColor};
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

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface ICoinsProps {
  // toggleDark: () => void; //void는 아무것도 없다고
}
//function Coins({ toggleDark }: ICoinsProps) {
function Coins({}: ICoinsProps) {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  //! React Query는 React 어플에서 서버 state를 fetching, caching, synchronizing,
  //! updating할 수 있도록 도와주는 라이브러리
  //! loading중이면 로딩중인걸 알려주고, 그 데이터를 data에 넣는다.
  //! allCoins는 고유키 라고 하고, 어플 전체에서 쿼리를 다시 가져오고, 캐싱하고, 공유하는데 사용
  //! useQuery에서 반환된 쿼리 결과에는 템플릿 및 기타 데이터 사용에 필요한 쿼리에 대한 모든 정보가 포함되어 있음.
  //* 제일 중요한건 원래 home 화면으로 가도 로딩이 안뜸. 데이터를 캐시에 저장하기 때문
  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        {/* <button onClick={toggleDark}>Toggle Dark Mode</button> */}
        <button onClick={toggleDarkAtom}>Toggle mode</button>
      </Header>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <CoinsList>
          {/* 그냥 a 태그쓰면 새로고침 되어서 Link 사용 */}
          {/* Link 는 나중에 a태그로 바뀜 */}
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} width='50px' />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
