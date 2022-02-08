import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Record from "./Record";
import valtoken from "./validatetoken";

export default function Dashboard() {
  const [auth, setAuth] = useState(false);
  const username = jwtDecode(localStorage.getItem('token')).username;
  useEffect(() => {
      if(valtoken()){
        setAuth(true);
      }
  }, []);

  return <div>
    {auth ? 
      <div>
        <Navbar username={username}/>
        <Record username={username}/>
      </div> 
      :
      <div>please login</div>
  }
  </div>;
}
