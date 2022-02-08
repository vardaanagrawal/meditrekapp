import React,{useState} from "react";
import "./navbar.css";
import axios from 'axios';

export default function Navbar({username}) {

    const [curpassword,setCurpassword] = useState('');
    const [newpassword,setNewpassword] = useState('');
    const [confirmnewpass,setConfirmnewpass] = useState('');
    const [showprofile,setShowprofile] = useState(false);

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    const toggleprofile = () => {
        setShowprofile(!showprofile)
    }

    const changePassword =async (e) => {
        e.preventDefault();
        if(newpassword === confirmnewpass){
        const res = await axios.put('http://localhost:4000/changepassword',{
            username: username,
            curpassword: curpassword,
            newpassword: newpassword
        });
        alert(res.data.message);
    }
    else{
        alert("current passwords do not match")
    }
    }

  return (
    <div className="navbar">
      <div className="logo">MEDITREK</div>
      <div className="menu">
        <div className="profile" onClick={toggleprofile}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        </div>
        <div className="logout" onClick={logout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-power"
            viewBox="0 0 16 16"
          >
            <path d="M7.5 1v7h1V1h-1z" />
            <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
          </svg>
        </div>
      </div>
      {showprofile && 
        <div className="accountbox">
          <div>username: {username}</div>
          <hr/>
          <div className="cpbox">
            <div>Change Password</div>
            <form onSubmit={changePassword}>
            <input type='password' placeholder="Current Password" required={true} onChange={(e) => setCurpassword(e.target.value)}></input>
            <input type='password' placeholder="New Password" required={true} onChange={(e) => setNewpassword(e.target.value)}></input>
            <input type='password' placeholder="Confirm New Password" required={true} onChange={(e) => setConfirmnewpass(e.target.value)}></input>
            <input type='submit' value="Change Password" id="cpbtn"></input>
            </form>
          </div>
        </div>
      }
    </div>
  );
}
