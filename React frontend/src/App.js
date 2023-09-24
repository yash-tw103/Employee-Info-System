import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Navigation from "./Navigation";
import Department from "./Department";
import Employee from "./Employee";


import './App.css'
function App() {
  return (
    <BrowserRouter>
    <div className="container">
      
      <h1 className="m-3 d-flex justify-content-center">Employee Database</h1>

      <Navigation />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/department" Component={Department} />
        <Route path="/employee" Component={Employee} />
      </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
