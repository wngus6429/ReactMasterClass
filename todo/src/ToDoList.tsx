// import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function ToDoList() {
  const [toDo, setToDo] = useState('');
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDo);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder='Write a to do' />
        <button>Add</button>
      </form>
    </div>
  );
}

interface IForm {
  email: string;
  first: string;
  last: string;
  password1: string;
  password2: string;
}

function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: '@naver.com',
    },
  });
  // watch로 값의 변화를 감지, handleSubmit이 validation을 담당함.
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(errors); // 에러 표시
  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onValid)}>
        {/* 이거 한방으로 onChange 이벤트와, value, useState를 모두 대체했다 */}
        {/* input 안에 required 쓸수 있지만 F12로 변경 할수 있으니 */}
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: 'Only naver.com emails allowed',
            },
          })}
          placeholder='Email'
        />
        <span>{errors?.email?.message as string}</span>
        <input {...register('first', { required: true, minLength: 10 })} placeholder='First' />
        <span>{errors?.first?.message as string}</span>
        <input {...register('last')} placeholder='last' />
        <span>{errors?.last?.message as string}</span>
        <input
          {...register('password1', { required: 'write here', minLength: { value: 5, message: 'Your password is too short' } })}
          placeholder='password1'
        />
        <span>{errors?.password1?.message as string}</span>
        <input {...register('password2')} placeholder='password2' />
        <span>{errors?.password2?.message as string}</span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
