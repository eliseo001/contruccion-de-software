import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// App.jsx
import React from "react";
import Productos from "./producto/Productos.jsx";

function Main() {
    return (
        <div>
            <h1>Control de Stock</h1>
            <Productos />
        </div>
    );
}

export default Main; // <-- Esto es obligatorio

