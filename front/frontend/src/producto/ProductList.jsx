const ProductList = ({ productos, onEdit, onDelete, onViewDetail }) => {
    return (
        <div className="container mt-4">
            <table className="table table-striped table-bordered">
                {/* Esta es la cabecera con los Títulos de las columnas */}
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th className="text-center">Acciones</th>
                </tr>
                </thead>

                {/* Este es el cuerpo donde se pintan los datos */}
                <tbody>
                {productos.map((prod) => (
                    <tr key={prod.id}>
                        {/* Cada propiedad va en su propia celda (td) */}
                        <td>{prod.id}</td>
                        <td>{prod.name}</td>
                        <td>${prod.precio}</td>
                        <td>{prod.cantidad}</td>

                        {/* Celda para los botones */}
                        <td className="text-center">
                            <div className="btn-group" role="group">
                                <button
                                    onClick={() => onViewDetail(prod.id)}
                                    className="btn btn-info btn-sm"
                                    title="Ver Detalle"
                                >
                                    Detalle
                                </button>

                                <button
                                    onClick={() => onEdit(prod)}
                                    className="btn btn-warning btn-sm ms-1"
                                    title="Editar"
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() => onDelete(prod.id)}
                                    className="btn btn-danger btn-sm ms-1"
                                    title="Eliminar"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Mensaje opcional si no hay productos */}
            {productos.length === 0 && (
                <p className="text-center mt-3">No hay productos disponibles.</p>
            )}
        </div>
    );
};

export default ProductList;