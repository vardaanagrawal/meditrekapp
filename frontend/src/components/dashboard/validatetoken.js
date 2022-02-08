import jwt from "jwt-decode";
import axios from "axios";

export default function valtoken() {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedtoken = jwt(token);
    if(matchusername(decodedtoken) && matchtime(decodedtoken))
    {
        if(matchpassword(decodedtoken)){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
  } else {
    return false;
  }
}

function matchusername(token){
    if(window.location.pathname === `/dashboard/${token.username}`){
        return true;
    }
    else{
        localStorage.removeItem('token');
        return false;
    }
}

function matchtime(token) {
  const curDate = Date().split(" ");
  const tokendate = Date(token.iat).split(" ");
  if (
    tokendate[0] == curDate[0] &&
    tokendate[1] == curDate[1] &&
    tokendate[2] == curDate[2] &&
    tokendate[3] == curDate[3] &&
    tokendate[5] == curDate[5]
  ) {
    return true;
  } else {
    localStorage.removeItem("token");
    return false;
  }
}

async function matchpassword(token){
    const res = await axios.post('/matchpassword',{
        username: token.username,
        password: token.password
    });
    if(res.data){
        return true;
    }
    else{
        localStorage.removeItem("token");
        return false;
    }
}
