import "./App.css";
import {Route,Routes} from 'react-router-dom';
import Home from '../src/pages/Home';
import Navbar from "./components/core/common/Navbar";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import VerifyEmail from "./pages/VerifyEmail";
function App() {
  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
     <Navbar/>
<Routes>

<Route path="/"  element={<Home></Home>} />

<Route
          path="signup"
          element={
              <Signup />
          }
        />
        
    <Route
          path="login"
          element={
              <Login />
          }
        />

<Route
          path="verify-email"
          element={
  
              <VerifyEmail />
       
          }
        />

</Routes>

   </div>
  );
}

export default App;
