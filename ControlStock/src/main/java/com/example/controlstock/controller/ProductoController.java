package com.example.controlstock.controller;

import com.example.controlstock.entity.Producto;
import com.example.controlstock.service.ProductoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5174")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService)
    {
        this.productoService = productoService;
    }

    @GetMapping
    public List<Producto> getAllProductos()
    {
        return productoService.getAllProductos();
    }

    @GetMapping("/{id}")
    public Producto getProductoById(@PathVariable Long id)
    {
        return productoService.getProductoById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
    }

    @PostMapping
    public Producto createProducto(@RequestBody Producto producto)
    {
        return productoService.saveProducto(producto);
    }

    @PutMapping("/{id}")
    public Producto updateProducto(@PathVariable Long id, @RequestBody Producto producto)
    {
        return productoService.updateProducto(id, producto);
    }

    @DeleteMapping("/{id}")
    public void deleteProducto(@PathVariable Long id)
    {
        productoService.deleteProducto(id);
    }
}