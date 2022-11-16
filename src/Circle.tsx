import styled from 'styled-components';

//! object shape를 typescript에 설명해주는 typescript의 개념이다.
interface ContainerProps {
  bgColor: string;
  borderColor: string;
}
const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 1px solid ${(props) => props.borderColor};
`;

//! interface는 object를 설명해주는거임
//! ?를 붙임으로서 필수가 아니게 할수 있다. | undefined도 가능
interface CircleProps {
  bgColor: string;
  borderColor?: string;
  //   borderColor: string | undefined;
  text?: string;
}
// 이 bgColor의 타입은 CircleProps의 object 이다라고 말해주고 있는거임
function Circle({ bgColor, borderColor, text = 'default 내용' }: CircleProps) {
  return (
    //* ??는 default 값이다. borderColor가 undefined이면 bgColor의 값을 보낸다.
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
}

export default Circle;
