<<<<<<< HEAD
import { useEffect, useState } from "react";

function Productos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Hacemos la llamada al backend
        fetch("http://localhost:8080/api/productos")
            .then((res) => res.json())
            .then((data) => {
                setProductos(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al cargar productos:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Cargando productos...</p>;

    return (
        <div>
            <h2>Lista de Productos</h2>
            <ul>
                {productos.map((prod) => (
                    <li key={prod.id}>
                        {prod.id} - {prod.name}$
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default Productos;
=======
import { useEffect, useState } from "react";

function Productos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Hacemos la llamada al backend
        fetch("http://localhost:8080/api/productos")
            .then((res) => res.json())
            .then((data) => {
                setProductos(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al cargar productos:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Cargando productos...</p>;

    return (
        <div>
            <h2>Lista de Productos</h2>
            <ul>
                {productos.map((prod) => (
                    <li key={prod.id}>
                        {prod.id} - {prod.name}$
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default Productos;
>>>>>>> 344797ecf36fa27b72b70731b647ff9ba6c17ca9
