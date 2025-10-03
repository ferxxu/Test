import { TextField, Button } from '@mui/material';
import { useState } from 'react';
export default Register() 
{
    const [Form, setForm] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleUsername = (e) => { setForm({ ...Form, userName: e.target.value});};
    const handleFirstname = (e) => { setForm({ ...Form, firstName: e.target.value});};
    const handleLastname = (e) => { setForm({ ...Form, lastName: e.target.value});};
    const handleEmail = (e) => { setForm({ ...Form, email: e.target.value});};
    const handlePass = (e) => { setForm({ ...Form, password: e.target.value});};

    let mail = Form.email;
    const verifyEmail = (mail) => {
        // if (mail.includes())
        if (mail[0].indexOf('@') == 0) return false;    
        if (mail[0].indexOf('.') == 0) return false;    
 
        for (let i = 0; i < mail.lenght; i++) {
            if (mail[i] == ' ') return false;
            break;
        };
      
        for (let i = 0; i < mail.length; i++) {
            if (mail[i] == '/') return false;
            break;
        };

        return true;
    };
    const handleForm = () => {
        fetch('https://localhost:3000/register', {
            body: JSON.stringify(Form),
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        }).then((response) => {console.log(response);});
    };

    (
        <div className='register-form'>
            <form onSubmit={()=> {}}>
            <TextField label="Ingrese su nombre" type='text' onChange={handleFirstname}></TextField>
            <TextField label="Ingrese su apellido" type='text' onChange={handleLastname}></TextField>
            <TextField label="Ingrese su email" type='email' onChange={handleEmail}></TextField>
            <TextField label="Ingrese su username" type='text' onChange={handleUsername}></TextField>
            <TextField label="Ingrese su contraseña" type='password' onChange={handlePass}></TextField>
            <Button type='submit'>Enviar datos</Button>
            </form>
        </div>
    )    
}