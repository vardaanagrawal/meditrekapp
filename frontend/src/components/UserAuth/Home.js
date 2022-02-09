import React from "react";
import "./auth.css";
import {Link} from 'react-router-dom';

export default function Home() {
  return (
    <div className="homePage">
      <div className="box">
          <div className="title">MEDITREK</div>
          <div className="btns">
              <Link to='/login'>Log In</Link>
              <Link to='/signup'>Sign Up</Link>
          </div>
      </div>
    </div>
  );
}
