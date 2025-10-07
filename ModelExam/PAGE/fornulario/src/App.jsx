import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";
import "./App.css";
import Home from './Home.jsx'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
