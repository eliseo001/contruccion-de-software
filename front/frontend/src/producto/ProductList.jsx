const ProductList = ({ productos, onEdit, onDelete, onViewDetail }) => {
    return (
        <ul className="product-list">
            {productos.map((prod) => (
                <li key={prod.id} className="product-list-item">
                    <span>
                        **ID: {prod.id}** - **{prod.name}** - ${prod.precio}
                    </span>

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