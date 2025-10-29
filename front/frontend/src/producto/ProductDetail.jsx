import { useState, useEffect } from 'react';
import { getProductoById } from '../services/productoService';

const ProductDetail = ({ productoId, onClose }) => {
    const [producto, setProducto] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!productoId) return;

        setLoading(true);
        getProductoById(productoId)
            .then(data => setProducto(data))

            .catch(err => {
                console.error(err);

                alert("No se pudo cargar el detalle.");
            })

            .finally(() => setLoading(false));
    }, [productoId]);

    if (loading) return <p className="loading-message">Cargando detalle...</p>;

    if (!producto) return null;

    return (
        <div className="product-detail">
            <h2 className="section-title">4. Detalle del Producto ID: {producto.id}</h2>

            <p>Nombre: **{producto.name}**</p>

            <p>Precio: **${producto.precio}**</p>
            <button onClick={onClose} className="btn btn-secondary">Cerrar Detalle</button>
        </div>
    );
};
export default ProductDetail;