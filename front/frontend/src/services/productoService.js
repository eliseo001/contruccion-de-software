// src/services/productoService.js

const API_BASE_URL = "http://localhost:8080/api/productos";

/**
 * Un helper para manejar las respuestas de fetch y errores
 */
const apiFetch = async (url, options = {}) => {
    const response = await fetch(url, options);

    if (!response.ok) {
        // Intenta leer el error del body si lo hay
        const errorData = await response.text();
        console.error("Error en la respuesta de la API:", errorData);
        throw new Error(`Error ${response.status}: ${errorData || response.statusText}`);
    }

    // DELETE a veces responde con 204 No Content (sin body)
    if (response.status === 204) {
        return null;
    }

    return response.json();
};

/** (READ ALL) */
export const getProductos = () => {
    return apiFetch(API_BASE_URL);
};

/** (READ ONE) */
export const getProductoById = (id) => {
    return apiFetch(`${API_BASE_URL}/${id}`);
};

/** (CREATE) */
export const createProducto = (productoData) => {
    // Aseguramos que el precio se envíe como número
    const data = {
        ...productoData,
        precio: parseFloat(productoData.precio)
    };

    return apiFetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
};

/** (UPDATE) */
export const updateProducto = (id, productoData) => {
    // Aseguramos que el precio se envíe como número
    const data = {
        ...productoData,
        precio: parseFloat(productoData.precio)
    };

    return apiFetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
};

/** (DELETE) */
export const deleteProducto = (id) => {
    return apiFetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
};