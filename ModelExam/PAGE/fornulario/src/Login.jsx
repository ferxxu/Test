import { TextField, Button } from '@mui/material';
import { useState } from 'react';

export default function Login()
{
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    let handleEmailInput = (e) => { setForm({ ...form, email: e.target.value }); };
    let handlePasswordInput = (e) => { setForm({ ...form, password: e.target.value }); };

    let handleForm = async (e) => {
        e.preventDefault();
            const verifyEmail = (string) => {

            if (string.includes('?') || string.includes('¿')) return false;
            if (string.includes('!') || string.includes('¡')) return false;

            if (string.indexOf('@') == 0) return false;
            if (string.indexOf('.') == 0) return false;

            for (let i = 0; i < string.lenght; i++) {
                if (string[i] == ' ') return false;
                break;
            };

            for (let i = 0; i < string.length; i++) {
                if (string[i] == '/') return false;
                break;
            };

            if (string.endsWith('.') || string.endsWith(',')) return false;
            if (string.endsWith('¡') || string.endsWith('!')) return false;
            if (string.endsWith('?') || string.endsWith('¿')) return false;

            return true;
        };
        verifyEmail(!form.email) ?? console.log(`Email inválido: ${form.email}`);

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            body: JSON.stringify({
                email: form.email,  
                password: form.password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(response);
    }
    return (
        <form onSubmit={handleForm}>
            <TextField label="Ingrese su email" type='email' onChange={handleEmailInput}></TextField>
            <TextField label="Ingrese su contraseña" type='password' onChange={handlePasswordInput}></TextField>
            <Button type='submit' variant='contained'>Enviar</Button>
        </form>
    )
}