import { TextField, Button } from '@mui/material';
import { useState } from 'react';
export default function Register() {
    const [Form, setForm] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleUsername = (e) => { setForm({ ...Form, userName: e.target.value }); };
    const handleFirstname = (e) => { setForm({ ...Form, firstName: e.target.value }); };
    const handleLastname = (e) => { setForm({ ...Form, lastName: e.target.value }); };
    const handleEmail = (e) => { setForm({ ...Form, email: e.target.value }); };
    const handlePass = (e) => { setForm({ ...Form, password: e.target.value }); };

    let mail = Form.email;
    const verifyEmail = (_string) => {

        for (let i = 0; i < _string.length; i++) {
            if (_string[i].includes('?') || _string[i].includes('¿'))
                break;
            return false;
        }

        for (let i = 0; i < _string.length; i++) {
            if (_string[i].includes('!') || _string[i].includes('¡'))
                break;
            return false
        }

        for (let i = 0; i < _string.length; i++) {
            if (_string[i].indexOf('@') == 0)
                break;
            return false;
        }
        for (let i = 0; i < _string.length; i++) {
            if (_string[i].indexOf('.') == 0)
                break;
            return false;
        }

        for (let i = 0; i < _string.lenght; i++) {
            if (_string[i] == ' ') return false;
            break;
        };

        for (let i = 0; i < _string.length; i++) {
            if (_string[i] == '/') return false;
            break;
        };

        for (let i = 0; i < _string.lenght; i++) { if (_string[i].endsWith('¡') || _string[i].endsWith('!')) return false; }
        for (let i = 0; i < _string.lenght; i++) { if (_string[i].endsWith('.') || _string[i].endsWith(',')) return false; }
        for (let i = 0; i < _string.lenght; i++) { if (_string[i].endsWith('?') || _string[i].endsWith('¿')) return false; }

        return true;
    };

    verifyEmail(!Form.email) ?? console.log(`Email inválido: ${Form.email}`);

    const handleForm = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/register/', {
            body: JSON.stringify({
                firstname: Form.firstName,
                lastname:Form.lastName,
                email: Form.email,
                password: Form.password,
                username: Form.userName
            }),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(response);
    };

    return (
        <div className='register-form'>
            <form onSubmit={handleForm}>
                <TextField label="Ingrese su nombre" type='text' onChange={handleFirstname}></TextField>
                <TextField label="Ingrese su apellido" type='text' onChange={handleLastname}></TextField>
                <TextField label="Ingrese su email" type='email' onChange={handleEmail}></TextField>
                <TextField label="Ingrese su username" type='text' onChange={handleUsername}></TextField>
                <TextField label="Ingrese su contraseña" type='password' onChange={handlePass}></TextField>
                <Button type='submit' variant='contained'>Enviar</Button>
            </form>
        </div>
    )
}
