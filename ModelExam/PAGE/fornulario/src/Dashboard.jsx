import { useState } from "react";

export default function Dashboard()
{
    const [data, setData] = useState({
        username: ''
    });
    const token = localStorage.getItem();

    return (
        <div className="Info-Container">
            <h1>Bienvenido: {data.username}</h1>
        </div>
    )
}