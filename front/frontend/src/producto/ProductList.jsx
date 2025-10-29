const ProductList = ({ productos, onEdit, onDelete, onViewDetail }) => {
    return (
        <ul className="product-list">
            {productos.map((prod) => (
                <li key={prod.id} className="product-list-item">
                    {/* Envolvemos el texto en un span para mejor control del layout */}
                    <span>
                        **ID: {prod.id}** - **{prod.name}** - ${prod.precio}
                    </span>

                    {/* Contenedor para los botones */}
                    <div>
                        <button onClick={() => onViewDetail(prod.id)} className="btn btn-info">
                            Detalle
                        </button>
                        <button onClick={() => onEdit(prod)} className="btn btn-warning">
                            Editar
                        </button>
                        <button onClick={() => onDelete(prod.id)} className="btn btn-danger">
                            Eliminar
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};
export default ProductList;