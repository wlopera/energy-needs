import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/header/Header.js";
import Footer from "./components/footer/Footer.js";

import Information from "./views/Information";
import Calculations from "./views/Calculations.js";
import About from "./views/About";
import Logout from "./views/Logout";

function App() {
  return (
    <Router>
      <Header />
      <main style={{ paddingBottom: "40px", paddingTop: "70px" }}>
        <Routes>
          <Route path="/information" element={<Information />} />
          <Route path="/calculations" element={<Calculations />} />
          <Route path="/about" element={<About />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Navigate to="/information" replace />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
