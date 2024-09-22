import "./App.css";
import {Route,Routes} from 'react-router-dom';
import Home from '../src/pages/Home';
import Navbar from "./components/core/common/Navbar";
function App() {
  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
     {/* <Navbar/> */}
<Routes>

<Route path="/"  element={<Home></Home>} />
</Routes>
<div className="w-12 h-12 bg-richblack-700">

</div>
   </div>
  );
}

export default App;
