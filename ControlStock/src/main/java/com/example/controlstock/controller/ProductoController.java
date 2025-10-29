package com.example.controlstock.controller;

import com.example.controlstock.entity.Producto;
import com.example.controlstock.service.ProductoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173") // Ajustá el puerto del front de React
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public List<Producto> getAllProductos() {
        // Devuelve todos los productos, que ahora incluyen el 'price'
        return productoService.getAllProductos();
    }

    @GetMapping("/{id}")
    public Producto getProductoById(@PathVariable Long id) {
        // Devuelve el producto individual, que ahora incluye el 'price'
        return productoService.getProductoById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
    }

    @PostMapping
    public Producto createProducto(@RequestBody Producto producto) {
        // Spring mapea el JSON de entrada completo (incluyendo 'price') al objeto 'producto'
        return productoService.saveProducto(producto);
    }

    @PutMapping("/{id}")
    public Producto updateProducto(@PathVariable Long id, @RequestBody Producto producto) {
        // Spring mapea el JSON de entrada completo (incluyendo 'price') al objeto 'producto'
        // El servicio usa este objeto actualizado para guardar los cambios
        return productoService.updateProducto(id, producto);
    }

    @DeleteMapping("/{id}")
    public void deleteProducto(@PathVariable Long id) {
        productoService.deleteProducto(id);
    }
}