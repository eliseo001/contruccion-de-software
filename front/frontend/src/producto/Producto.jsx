import { useEffect, useState } from "react";

// URL base de tu API, para no repetirla en cada llamada
const API_BASE_URL = "http://localhost:8080/api/productos";

function Productos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    // Cambiado: { name: '', precio: '' }
    const [nuevoProducto, setNuevoProducto] = useState({ name: '', precio: '' });
    // Cambiado: productoAEditar.precio
    const [productoAEditar, setProductoAEditar] = useState(null); // Para guardar el producto que se está editando
    // Cambiado: productoSeleccionado.precio
    const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Para ver detalles por ID

    // 1. FUNCIÓN PARA CARGAR TODOS LOS PRODUCTOS (READ ALL)
    const fetchProductos = () => {
        setLoading(true);
        fetch(API_BASE_URL)
            .then((res) => {
                if (!res.ok) throw new Error("Error en la respuesta del servidor");
                return res.json();
            })
            .then((data) => {
                setProductos(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al cargar productos:", err);
                setLoading(false);
                alert("Hubo un error al cargar los productos.");
            });
    };

    // Carga inicial al montar el componente
    useEffect(() => {
        fetchProductos();
    }, []);

    // 2. FUNCIÓN PARA CREAR UN PRODUCTO (CREATE)
    const handleCrearProducto = (e) => {
        e.preventDefault();
        fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: nuevoProducto.name,
                // ¡IMPORTANTE! Aquí se envía la propiedad al backend.
                // Si el backend espera 'price', debes cambiarlo a 'price': parseFloat(nuevoProducto.precio)
                precio: parseFloat(nuevoProducto.precio)
            }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Error al crear el producto");
                return res.json(); // Opcional: si quieres ver el producto creado
            })
            .then(() => {
                alert(`Producto ${nuevoProducto.name} creado con éxito!`);
                // Limpiado: nuevoProducto.precio
                setNuevoProducto({ name: '', precio: '' }); // Limpiar formulario
                fetchProductos(); // Recargar la lista
            })
            .catch((err) => {
                console.error("Error al crear producto:", err);
                alert("No se pudo crear el producto.");
            });
    };

    // 3. FUNCIÓN PARA ELIMINAR UN PRODUCTO (DELETE)
    const handleEliminarProducto = (id) => {
        if (!window.confirm(`¿Estás seguro de eliminar el producto con ID ${id}?`)) return;

        fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
        })
            .then((res) => {
                if (res.status === 204 || res.ok) { // 204 No Content es común para DELETE sin cuerpo de respuesta
                    alert(`Producto con ID ${id} eliminado.`);
                    fetchProductos(); // Recargar la lista
                    setProductoSeleccionado(null); // Ocultar detalles si estaba seleccionado
                } else {
                    throw new Error("Error al eliminar el producto");
                }
            })
            .catch((err) => {
                console.error("Error al eliminar producto:", err);
                alert("No se pudo eliminar el producto.");
            });
    };

    // 4. FUNCIÓN PARA CARGAR DETALLES POR ID (READ ONE)
    const handleVerDetalles = (id) => {
        fetch(`${API_BASE_URL}/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Producto no encontrado");
                return res.json();
            })
            .then((data) => {
                // data.precio si tu backend lo devuelve como 'precio', si no, data.price
                setProductoSeleccionado(data);
            })
            .catch((err) => {
                console.error("Error al obtener detalles:", err);
                alert("Producto no encontrado o error en la conexión.");
                setProductoSeleccionado(null);
            });
    };

    // 5. FUNCIÓN PARA ACTUALIZAR UN PRODUCTO (UPDATE)
    const handleActualizarProducto = (e) => {
        e.preventDefault();
        const id = productoAEditar.id;

        fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // Enviamos el objeto con los campos actualizados
                name: productoAEditar.name,
                // ¡IMPORTANTE! Aquí se envía la propiedad al backend.
                // Si el backend espera 'price', debes cambiarlo a 'price': parseFloat(productoAEditar.precio)
                precio: parseFloat(productoAEditar.precio)
            }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Error al actualizar el producto");
                return res.json();
            })
            .then(() => {
                alert(`Producto con ID ${id} actualizado con éxito!`);
                // Limpiado: productoAEditar.precio
                setProductoAEditar(null); // Ocultar formulario de edición
                fetchProductos(); // Recargar la lista
            })
            .catch((err) => {
                console.error("Error al actualizar producto:", err);
                alert("No se pudo actualizar el producto.");
            });
    };

    if (loading) return <p>Cargando productos...</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h1>Gestión de Productos (CRUD)</h1>
            <hr />

            {/* FORMULARIO DE CREACIÓN */}
            <h2>1. Crear Nuevo Producto (POST)</h2>
            <form onSubmit={handleCrearProducto} style={{ border: '1px solid #ccc', padding: '15px' }}>
                <input
                    type="text"
                    placeholder="Nombre del Producto"
                    value={nuevoProducto.name}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Precio"
                    // Cambiado: nuevoProducto.precio
                    value={nuevoProducto.precio}
                    // Cambiado: nuevoProducto.precio
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
                    required
                />
                <button type="submit">Agregar Producto</button>
            </form>
            <hr />

            {/* FORMULARIO DE EDICIÓN (Condicional) */}
            {productoAEditar && (
                <>
                    <h2>2. Editar Producto ID: {productoAEditar.id} (PUT)</h2>
                    <form onSubmit={handleActualizarProducto} style={{ border: '1px solid orange', padding: '15px' }}>
                        <input
                            type="text"
                            placeholder="Nuevo Nombre"
                            value={productoAEditar.name}
                            onChange={(e) => setProductoAEditar({ ...productoAEditar, name: e.target.value })}
                            required
                        />
                        <input
                            type="number"
                            step="0.01"
                            placeholder="Nuevo Precio"
                            // Cambiado: productoAEditar.precio
                            value={productoAEditar.precio}
                            // Cambiado: productoAEditar.precio
                            onChange={(e) => setProductoAEditar({ ...productoAEditar, precio: e.target.value })}
                            required
                        />
                        <button type="submit">Guardar Cambios</button>
                        <button type="button" onClick={() => setProductoAEditar(null)} style={{ marginLeft: '10px' }}>
                            Cancelar
                        </button>
                    </form>
                    <hr />
                </>
            )}

            {/* LISTA DE PRODUCTOS (READ ALL) */}
            <h2>3. Lista de Productos ({productos.length}) (GET)</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {productos.map((prod) => (
                    <li key={prod.id} style={{ margin: '10px 0', borderBottom: '1px dotted #eee', paddingBottom: '5px' }}>
                        {/* Cambiado: prod.precio. ¡Asegúrate que el backend lo devuelva como 'precio'! */}
                        **ID: {prod.id}** - **{prod.name}** - ${prod.precio}
                        <button onClick={() => handleVerDetalles(prod.id)} style={{ marginLeft: '10px' }}>
                            Ver Detalle (GET)
                        </button>
                        <button onClick={() => setProductoAEditar(prod)} style={{ marginLeft: '10px' }}>
                            Editar (PUT)
                        </button>
                        <button onClick={() => handleEliminarProducto(prod.id)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
                            Eliminar (DELETE)
                        </button>
                    </li>
                ))}
            </ul>
            <hr />

            {/* DETALLE DEL PRODUCTO SELECCIONADO (READ ONE) */}
            {productoSeleccionado && (
                <div style={{ border: '1px solid blue', padding: '15px' }}>
                    <h2>4. Detalle del Producto ID: {productoSeleccionado.id}</h2>
                    <p>Nombre: **{productoSeleccionado.name}**</p>
                    {/* Cambiado: productoSeleccionado.precio. ¡Asegúrate que el backend lo devuelva como 'precio'! */}
                    <p>Precio: **${productoSeleccionado.precio}**</p>
                    {/* Asume que tu Producto tiene otros campos como stock o description */}
                    <button onClick={() => setProductoSeleccionado(null)}>Cerrar Detalle</button>
                </div>
            )}
        </div>
    );
}

export default Productos;