import { useState, useEffect } from "react";

export default function Dashboard() {
  const [data, setData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: ""
  });
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:3000/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      const dataFound = await response.json();
      setData({ username: `${dataFound.username}`, firstname: `${dataFound.firstname}`, lastname: `${dataFound.lastname}`, email: `${dataFound.email}`});
    };
    getData();
  }, []);
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    window.location.href = "http://localhost:5173/";
  };
  return (
    <div className="Info-Container">
      <h1>Bienvenido: {data.username}</h1>
      <button onClick={handleLogOut}>Cerrar sesión</button>
    </div>
  );
}
