import { useState, useEffect } from "react";

const ProductForm = ({ onSubmit, onCancel, initialData = { name: '', precio: '' } }) => {
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(formData);

        if (!initialData.id) {
            setFormData({ name: '', precio: '' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <input
                type="text"
                name="name"
                placeholder="Nombre del Producto"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
            />
            <input
                type="number"
                name="precio"
                step="0.01"
                placeholder="Precio"
                value={formData.precio}
                onChange={handleChange}
                required
                className="form-input"
            />
            <button type="submit" className="btn btn-primary">Guardar</button>
            {onCancel && (
                <button type="button" onClick={onCancel} className="btn btn-secondary">
                    Cancelar
                </button>
            )}
        </form>
    );
};
export default ProductForm;