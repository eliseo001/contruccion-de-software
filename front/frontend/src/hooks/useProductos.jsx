// src/hooks/useProductos.jsx
import { useState, useEffect, useCallback } from "react";
import * as productoService from '../services/productoService';

export const useProductos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Usamos useCallback para evitar re-crear la función en cada render
    const cargarProductos = useCallback(async () => {
        setLoading(true);
        try {
            const data = await productoService.getProductos();
            setProductos(data);
        } catch (err) {
            console.error("Error al cargar productos:", err);
            alert("Hubo un error al cargar los productos.");
        } finally {
            setLoading(false);
        }
    }, []);

    // Carga inicial
    useEffect(() => {
        cargarProductos();
    }, [cargarProductos]);

    // Función para crear
    const agregarProducto = async (producto) => {
        try {
            await productoService.createProducto(producto);
            alert(`Producto ${producto.name} creado con éxito!`);
            await cargarProductos(); // Recarga la lista
        } catch (err) {
            console.error("Error al crear producto:", err);
            alert("No se pudo crear el producto.");
        }
    };

    // Función para actualizar
    const actualizarProducto = async (id, producto) => {
        try {
            await productoService.updateProducto(id, producto);
            alert(`Producto con ID ${id} actualizado con éxito!`);
            await cargarProductos(); // Recarga la lista
        } catch (err) {
            console.error("Error al actualizar producto:", err);
            alert("No se pudo actualizar el producto.");
        }
    };

    // Función para eliminar
    const eliminarProducto = async (id) => {
        if (!window.confirm(`¿Estás seguro de eliminar el producto con ID ${id}?`)) return;

        try {
            await productoService.deleteProducto(id);
            alert(`Producto con ID ${id} eliminado.`);
            await cargarProductos(); // Recarga la lista
        } catch (err) {
            console.error("Error al eliminar producto:", err);
            alert("No se pudo eliminar el producto.");
        }
    };

    // Devolvemos el estado y las funciones que el componente usará
    return {
        productos,
        loading,
        agregarProducto,
        actualizarProducto,
        eliminarProducto
    };
};