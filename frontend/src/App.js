import './App.css';
import Home from './components/UserAuth/Home';
import Signup from './components/UserAuth/Signup';
import Login from './components/UserAuth/Login';
import Dashboard from './components/dashboard/Dashboard';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path="/dashboard/:username" element={<Dashboard/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
