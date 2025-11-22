// src/Productos.jsx
import { useState } from "react";
import { useProductos } from "../hooks/useProductos.jsx";
import ProductList from "./ProductList";
import ProductForm from "./ProductoForm.jsx";
import ProductDetail from "./ProductDetail.jsx";
import './Productos.css';

const formInicialVacio = { name: '', precio: '', cantidad: '' };

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

    if (loading) return <p className="loading-message">Cargando productos...</p>;

    return (
        <div className="productos-container">
            <h1>Gestión de Productos</h1>
            <hr />

            {productoAEditar ? (
                <>
                    <h2 className="section-title">2. Editar Producto ID: {productoAEditar.id}</h2>
                    <ProductForm
                        onSubmit={handleActualizar}
                        onCancel={handleCancelarEdicion}
                        initialData={productoAEditar}
                    />
                </>
            ) : (
                <>
                    <h2 className="section-title">1. Crear Nuevo Producto</h2>
                    <ProductForm
                        onSubmit={handleCrear}
                        initialData={formInicialVacio}
                    />
                </>
            )}

            <hr />

            <h2 className="section-title">3. Lista de Productos ({productos.length})</h2>
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