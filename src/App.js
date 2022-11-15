import styled, { keyframes } from 'styled-components';
// 애니메이션 주기위해 keyframes

const Father = styled.div`
  display: flex;
`;
const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;
// Box의 속성을 들고와서 추가함
const Circle = styled(Box)`
  border-radius: 50px;
`;
const Btn = styled.button`
  color: white;
  background-color: red;
  border: 0;
  border-radius: 15px;
`;
// attrs({ required: true })를하면 Input에 일괄 붙는다.
const Input = styled.input.attrs({ required: true })`
  background-color: tomato;
`;

const rotationAnimation = keyframes`
  /* from {
     transform:rotate(0deg);
     border-raidus:0px;
   }
   to{
     transform:rotate(360deg);
     border-raidus:50px;
   } */
  0% {
    transform:rotate(0deg);
    border-radius:0px;
  }
  50% {
    transform:rotate(360deg);
    border-radius:100px;
  }
  100% {
    transform:rotate(0deg);
    border-radius:0px;
  }
`;

const BoxF = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation: ${rotationAnimation} 1s linear infinite;
  display: flex; // 고기 회전을 위해
  justify-content: center;
  align-items: center;
  // 안에 span 선택
  span {
    font-size: 36px;
    // &은 한계층 위에 이야기함. 지금은 span
    &:hover {
      font-size: 100px;
    }
    // 클릭하고 있으면 안보임
    &:active {
      opacity: 0;
    }
  }
`;

function App() {
  return (
    <div>
      <Father>
        <Box bgColor='teal' />
        <Circle bgColor='gold' />
      </Father>
      {/*  as 로 태그 지정가능 */}
      <Btn as='a' href='https://www.naver.com/'>
        LogIn
      </Btn>
      <Input />
      <Input />
      <BoxF>
        <span>🍖</span>
      </BoxF>
    </div>
  );
}

export default App;
