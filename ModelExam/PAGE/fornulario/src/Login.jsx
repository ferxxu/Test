import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  let handleEmailInput = (e) => {
    setForm({ ...form, email: e.target.value });
  };
  let handlePasswordInput = (e) => {
    setForm({ ...form, password: e.target.value });
  };
  const verifyEmail = (_string) => {
    if (!_string || typeof _string !== "string") return false;
    if (_string.includes(" ")) return false;
    if (!_string.includes("@")) return false;
    if (!_string.includes(".")) return false;
    if (_string.includes("@.") || _string.includes(".@")) return false;
    if (_string.includes("?") || _string.includes("¿")) return false;
    if (_string.includes("!") || _string.includes("¡")) return false;
    if (_string.indexOf("@") == 0) return false;
    if (_string.indexOf(".") == 0) return false;
    if (_string.includes("/")) return false;
    if (_string.endsWith("¡") || _string.endsWith("!")) return false;
    if (_string.endsWith(".") || _string.endsWith(",")) return false;
    if (_string.endsWith("?") || _string.endsWith("¿")) return false;
    if (_string.endsWith("@") || _string.endsWith(".")) return false;
    if (!_string.split("@")[1].includes(".")) return false;
    if (_string.includes("@@") || _string.includes("..")) return false;
    if (_string.includes("--") || _string.includes("-")) return false;
    return true;
  };

  let handleForm = async (e) => {
    e.preventDefault();
    if (verifyEmail(form.email)) {
      const response = await fetch("http://localhost:3000/login/", {
        method: "POST",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status == "404")
        alert(
          `No tenemos registros del correo: ${form.email}, porfavor considere registrarse.`
        );
      if (response.status == "401") alert(`Contraseña incorrecta.`);
      if (data.status == "200") {
        localStorage.setItem("authToken", data.tokenCreated);
        alert(`¡Tus credenciales son correctas!`);
        window.location.href = "http://localhost:5173/Dashboard";
      }
    }
  };
  return (
    <form onSubmit={handleForm}>
      <h2>Logeate aca $_$</h2>
      <Link to="/register">No tenes una cuenta? registrate aca</Link>
      <br></br>
      <TextField
        label="Ingrese su email"
        type="email"
        onChange={handleEmailInput}
      ></TextField>
      <TextField
        label="Ingrese su contraseña"
        type="password"
        onChange={handlePasswordInput}
      ></TextField>
      <Button type="submit" variant="contained">
        Enviar
      </Button>
    </form>
  );
}
