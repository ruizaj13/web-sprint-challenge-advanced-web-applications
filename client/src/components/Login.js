import React, {useState} from "react";
import axios from 'axios';
import {useHistory} from 'react-router-dom'

const initialState = {
  credentials: {
    username:'',
    password:''
  }
}

const Login = () => {
  const [loginData, setLoginData] = useState(initialState)
  const {push} = useHistory();

  const handleChange = (e) => {
    setLoginData({credentials: {...loginData.credentials, [e.target.name]: e.target.value}})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/login', loginData.credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        push('/protected')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input  value={loginData.credentials.username} onChange={handleChange} type='text' name='username' placeholder='Username'/><br/>

        <input value={loginData.credentials.password} onChange={handleChange} type='password' name='password' placeholder='password'/><br/>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;

// make a post request to retrieve a token from the api
// when you have handled the token, navigate to the BubblePage route