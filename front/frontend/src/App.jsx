
import './index.css'
// App.jsx
import React from "react";
import Productos from "./producto/Productos.jsx";
import './App.css';

function Main() {
    return (
        <div className={"app-principal"}>
            <h1>Control de Stock</h1>
            <Productos />
        </div>
    );
}

export default Main; // <-- Esto es obligatorio

