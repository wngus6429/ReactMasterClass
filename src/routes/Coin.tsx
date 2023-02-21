import { useQuery } from 'react-query';
import { Switch, Route, useLocation, useParams, useHistory } from 'react-router';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import Chart from './Chart';
import Price from './Price';
import { Helmet } from 'react-helmet';
import { useCallback } from 'react';

interface RouteParams {
  coinId: string;
}

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

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
  a {
    display: block;
  }
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

interface RouteState {
  name: string;
}

// interface ITag {
//   coin_counter: number;
//   ico_counter: number;
//   id: string;
//   name: string;
// }

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  // tags: ITag[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface ICoinProps {
  // isDark: boolean;
}

//* useParams가 coinId를 포함하는 오브젝트를 반환할거라고 알려줌
//* useParams은 URL 정보를 잡아낼수 있게 해줌
//! useQuery의 3번째 인자 refetchInterval 로 몇초에 한번 데이터 다시 부르기 가능
//function Coin({isDark}: ICoinProps) {
function Coin({}: ICoinProps) {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  //! () => 이렇게 하는건 함수자체를 넘기기 때문 알아서 함수() 해준다.
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(['info', coinId], () => fetchCoinInfo(coinId));
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(['tickers', coinId], () => fetchCoinTickers(coinId), {
    refetchInterval: 10000,
  });
  //! useRouteMatch는 특정한 URL에 있는지 여부를 알려줌, object
  //! 특정한 위치에 없으면 null이 뜬다.
  const chartMatch = useRouteMatch('/:coinId/chart');
  const priceMatch = useRouteMatch('/:coinId/price');
  //! 둘다 true가 떠야함
  const loading = infoLoading || tickersLoading;
  let history = useHistory();
  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : loading ? 'Loading...' : infoData?.name}</title>
      </Helmet>
      <Header>
        {/* state가 있으면 name가져오고 아니면 Loading을 보여라 */}
        <Title>{state?.name ? state.name : loading ? 'Loading...' : infoData?.name}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <button onClick={() => history.push('/')}>Go Home</button>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Switch>
            {/* nested route */}
            <Route path={`/:coinId/price`}>
              {/* <Route path={`/${coinId}/price`}> */}
              <Price />
            </Route>
            <Route path={`/:coinId/chart`}>
              {/* <Chart isDark={isDark} chartName={infoData?.name} coinId={coinId} /> */}
              <Chart chartName={infoData?.name} coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}
export default Coin;
