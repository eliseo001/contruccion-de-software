package com.example.controlstock.service;


import com.example.controlstock.entity.Producto;
import com.example.controlstock.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public List<Producto> getAllProductos() {
        return productoRepository.findAll();
    }

    public Optional<Producto> getProductoById(Long id) {
        return productoRepository.findById(id);
    }

    public Producto saveProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    public Producto updateProducto(Long id, Producto nuevoProducto) {
        return productoRepository.findById(id)
                .map(p -> {
                    p.setName(nuevoProducto.getName());
                    p.setPrecio(nuevoProducto.getPrecio());

                    return productoRepository.save(p);
                })
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
    }

    public void deleteProducto(Long id) {
        productoRepository.deleteById(id);
    }
}
