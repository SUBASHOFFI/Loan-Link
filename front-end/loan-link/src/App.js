
import { Route, Routes } from 'react-router-dom';
import './App.css';
import User from './Components/Home/User/User';
import ImageSlider from './Components/Home/User/ImageSlider/ImageSlider';
import Checking from './Components/Checking/Checking';
import SignUp from './Components/Authentication/SignUp/SignUp';
import SignIn from './Components/Authentication/SignIn/SignIn';
import { UserContext } from './Components/UserContext/UserContext';
import { useContext } from 'react';

import LoansDetails from './Components/Home/User/Loans/LoansDetails';
import Admin from './Components/Home/Admin/Admin';


function App() {
  const {user} = useContext(UserContext);
  return (
    <div>
   <Routes>
   <Route path="/PATHTOSIGNUP"  element={<SignUp/>} />
   {/* <Route path="/"  element={user?.role==='User'?<User/>:<SignIn/>} /> */}
   <Route path="/"  element={<SignIn/>} />
   <Route path="/PATHTOSLIDEBAR"  element={<ImageSlider/>} />
   <Route path="/Checking"  element={<Checking/>} />
   <Route path="/Home"  element={user?.role==='User'?<User/>:<Admin/>} />
   <Route path="/PATHTOlogout"  element={user?.role==='Admin'?<User/>:<SignIn/>} />
   <Route path="/PATHTOLOANDETAILS"  element={user?<LoansDetails/>:<SignIn/>} />
   
   <Route path="/PATHTOSIGNIN"  element={user?<User/>:<SignIn/>} />
   {/* <Route path="/"  element={<User/>} /> */}
   
   </Routes>
    </div>
  );
}

export default App;
