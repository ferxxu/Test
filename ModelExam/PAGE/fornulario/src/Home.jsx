import {Link} from 'react-router-dom';

export default function Home(){
    return(
        <>
        <h1>Hola, soy la pagina princiapl ~_~</h1>
        <ul>
            <li>
              <Link to="/register">Formulario de registro</Link>
            </li>
            <li>
              <Link to="/">Página principal</Link>
            </li>
            <li>
              <Link to="/login">Formulario de inicio de sesión</Link>
            </li>
          </ul>
        </>
    )
}