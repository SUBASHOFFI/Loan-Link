
import { Route, Routes } from 'react-router-dom';
import './App.css';
import User from './Components/Home/User/User';
import ImageSlider from './Components/Home/User/ImageSlider/ImageSlider';
import Checking from './Components/Checking/Checking';
import SignUp from './Components/Authentication/SignUp/SignUp';
import SignIn from './Components/Authentication/SignIn/SignIn';

function App() {
  return (
    <div>
   <Routes>
   <Route path="/home"  element={<User/>} />
   <Route path="/PATHTOSLIDEBAR"  element={<ImageSlider/>} />
   <Route path="/Checking"  element={<Checking/>} />
   <Route path="/PATHTOSIGNIN"  element={<SignIn/>} />
   <Route path="/"  element={<User/>} />
   
   </Routes>
    </div>
  );
}

export default App;
