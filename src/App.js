import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Try from "./Try";
import NavBar from "./components/NavBar";
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Link to="/">Home</Link>
        <Link to="/try">Try</Link>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/try" element={<Try />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
