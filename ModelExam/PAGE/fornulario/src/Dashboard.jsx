import { useState, useEffect } from "react";

export default function Dashboard() {
  const [data, setData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    admin: false,
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
      setData({...data, 
        username: `${dataFound.username}`,
        firstname: `${dataFound.firstname}`,
        lastname: `${dataFound.lastname}`,
        email: `${dataFound.email}`,
        admin: dataFound.admin
      });
    };
    getData();
  }, []);
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    window.location.href = "http://localhost:5173/";
  };
  function Status({isAdmin}){
    if (isAdmin) return <h1>Usted ha ingresado como administrador</h1>;
    if (!isAdmin) return <h1>Usted es un simple usuario</h1>
  }
  return (
    <div className="Info-Container">
      <h1>Bienvenido: {data.username}</h1>
      <Status isAdmin={data.admin}/>
      <button onClick={handleLogOut}>Cerrar sesión</button>
    </div>
  );
}
