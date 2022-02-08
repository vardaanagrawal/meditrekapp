import axios from 'axios';
import React,{ useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const Login = async (e) => {
        e.preventDefault();
        const res = await axios.post('/login',{
            username: username,
            password: password
        });
        if(res.data.status === 200){
            localStorage.setItem("token", res.data.token);
            window.location.href = `/dashboard/${username}`
        }
        else{
            alert(res.data.message);
        }
    }

  return <div className='loginPage'>
      <div className='box'>
          <div className='title'>LOG IN</div>
          <form onSubmit={Login}>
              <input type='text' placeholder='Username' required={true} onChange={(e)=>setUsername(e.target.value)}></input>
              <input type='password' placeholder='Password' required={true} onChange={(e)=>setPassword(e.target.value)}></input>
              <input id="loginbtn" type='submit' value="Log In"></input>
              <label>Don't have an account? <Link to='/signup'>Sign Up</Link></label>
          </form>
      </div>
  </div>;
}
