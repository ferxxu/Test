import { useState } from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import "./App.css";

function App() {
  return (
    <>
    <div className="Container">
      <Header />
      <Home />
      <Footer />
    </div>

    </>
  );
}

export default App;
