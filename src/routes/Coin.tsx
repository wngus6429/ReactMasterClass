import { useState } from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

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

interface RouteState{
  name:string;
}

//* useParams가 coinId를 포함하는 오브젝트를 반환할거라고 알려줌
//* useParams은 URL 정보를 잡아낼수 있게 해줌
function Coin() {
  const { coinId } = useParams<RouteParams>();
  const [loading, setLoading] = useState(true);
  const { state} = useLocation<RouteState>();
  console.log(state.name)
  console.log(coinId);
  return (
    <Container>
      <Header>
        {/* state가 있으면 name가져오고 아니면 Loading을 보여라 */}
        <Title>{state?.name || "Loading"}</Title>
      </Header>
      {loading ? <Loader>Loading</Loader> : null}
    </Container>
  )
}
export default Coin;
