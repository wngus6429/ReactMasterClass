// import styled from 'styled-components';
import React, { useState } from 'react';
// 애니메이션 주기위해 keyframes

function App() {
  const [value, setValue] = useState('')
  //! 이제 ts가 InputElement에 의해서 실행 될 것을 아는거임
  const onChange = (event:React.FormEvent<HTMLInputElement>) => {
    //! React, ts는 currentTarget 사용
    const {currentTarget:{value}} = event;
    setValue(value);
  }
  const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Hello", value)
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={value} onChange={onChange} type="text" placeholder='username' />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
