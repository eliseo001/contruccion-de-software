// src/Productos.jsx
import { useState } from "react";
import { useProductos } from "../hooks/useProductos.jsx";
import ProductList from "./ProductList";
import ProductForm from "./ProductoForm.jsx";
import ProductDetail from "./ProductDetail.jsx";
// 1. IMPORTA TU NUEVO CSS
import './Productos.css';
// (Asegúrate que la ruta sea correcta,
//  esto asume que 'Productos.css' está en la misma carpeta 'src/producto/')
// Si lo pusiste en 'src/', usa: import '../Productos.css';

const formInicialVacio = { name: '', precio: '' };

function Productos() {
    const {
        productos,
        loading,
        agregarProducto,
        actualizarProducto,
        eliminarProducto
    } = useProductos();

    const [productoAEditar, setProductoAEditar] = useState(null);
    const [idDetalle, setIdDetalle] = useState(null);

    // ... (Todas las funciones handler quedan EXACTAMENTE IGUAL) ...
    const handleCrear = (producto) => { agregarProducto(producto); };
    const handleActualizar = (producto) => {
        actualizarProducto(producto.id, producto);
        setProductoAEditar(null);
    };
    const handleEditarClick = (producto) => {
        setIdDetalle(null);
        setProductoAEditar(producto);
    };
    const handleVerDetalleClick = (id) => {
        setProductoAEditar(null);
        setIdDetalle(id);
    };
    const handleCancelarEdicion = () => { setProductoAEditar(null); };
    const handleCerrarDetalle = () => { setIdDetalle(null); };

    // 2. USA className PARA EL MENSAJE DE CARGA
    if (loading) return <p className="loading-message">Cargando productos...</p>;

    // 3. USA className PARA EL CONTENEDOR PRINCIPAL
    return (
        <div className="productos-container">
            <h1>Gestión de Productos (CRUD)</h1>
            <hr />

            {productoAEditar ? (
                <>
                    <h2 className="section-title">2. Editar Producto ID: {productoAEditar.id} (PUT)</h2>
                    <ProductForm
                        onSubmit={handleActualizar}
                        onCancel={handleCancelarEdicion}
                        initialData={productoAEditar}
                    />
                </>
            ) : (
                <>
                    <h2 className="section-title">1. Crear Nuevo Producto (POST)</h2>
                    <ProductForm
                        onSubmit={handleCrear}
                        initialData={formInicialVacio}
                    />
                </>
            )}

            <hr />

            <h2 className="section-title">3. Lista de Productos ({productos.length}) (GET)</h2>
            <ProductList
                productos={productos}
                onEdit={handleEditarClick}
                onDelete={eliminarProducto}
                onViewDetail={handleVerDetalleClick}
            />

            <hr />

            {idDetalle && (
                <ProductDetail
                    productoId={idDetalle}
                    onClose={handleCerrarDetalle}
                />
            )}
        </div>
    );
}
export default Productos;