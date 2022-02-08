import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const Signup = async (e) => {
        e.preventDefault();
        if(password != confirmPassword){alert('Passwords do not match')}
        else{
            const res = await axios.post('http://localhost:4000/signup',{
                username: username,
                password: password
            });
            alert(res.data.message);
        }
        document.getElementById('username').value = "";
            document.getElementById('password').value = "";
            document.getElementById('confirmpassword').value = "";
    }

  return <div className='loginPage'>
      <div className='box'>
          <div className='title'>SIGN UP</div>
          <form onSubmit={Signup}>
              <input id="username" type='text' placeholder='Username' required={true} onChange={(e)=>setUsername(e.target.value)}></input>
              <input id="password" type='password' placeholder='Password' required={true} onChange={(e)=>setPassword(e.target.value)}></input>
              <input id="confirmpassword" type='password' placeholder='Confirm Password' required={true} onChange={(e)=>setConfirmPassword(e.target.value)}></input>
              <input id="signupbtn" type='submit' value="Sign Up"></input>
              <label>Already have an account? <Link to='/login'>Log In</Link></label>
          </form>
      </div>
  </div>;
}
