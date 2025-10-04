import { TextField, Button } from "@mui/material";
import { useState } from "react";
export default function Register() {
  const [Form, setForm] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleUsername = (e) => {
    setForm({ ...Form, userName: e.target.value });
  };
  const handleFirstname = (e) => {
    setForm({ ...Form, firstName: e.target.value });
  };
  const handleLastname = (e) => {
    setForm({ ...Form, lastName: e.target.value });
  };
  const handleEmail = (e) => {
    setForm({ ...Form, email: e.target.value });
  };
  const handlePass = (e) => {
    setForm({ ...Form, password: e.target.value });
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
  const handleForm = async (e) => {
    e.preventDefault();
    if (verifyEmail(Form.email)) {
      const response = await fetch("http://localhost:3000/register/", {
        body: JSON.stringify({
          firstname: Form.firstName,
          lastname: Form.lastName,
          email: Form.email,
          password: Form.password,
          username: Form.userName,
        }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (response.status != "201")
        console.error(`Usuario no creado: ${response}`);
      else alert("¡Registro exitoso!");
    }
    else alert('¡Ingrese un correo válido!');
  };
  return (
    <div className="register-form">
      <form onSubmit={handleForm}>
        <TextField
          required
          label="Ingrese su nombre"
          type="text"
          onChange={handleFirstname}
        ></TextField>
        <TextField
          required
          label="Ingrese su apellido"
          type="text"
          onChange={handleLastname}
        ></TextField>
        <TextField
          label="Ingrese su email"
          type="email"
          onChange={handleEmail}
        ></TextField>
        <TextField
          required
          label="Ingrese su username"
          type="text"
          onChange={handleUsername}
        ></TextField>
        <TextField
          required
          label="Ingrese su contraseña"
          type="password"
          onChange={handlePass}
        ></TextField>
        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </form>
    </div>
  );
}
