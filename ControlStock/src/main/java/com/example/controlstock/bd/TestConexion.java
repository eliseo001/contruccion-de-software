package com.example.controlstock.bd; // Nuevo paquete: bd

import com.example.controlstock.Conexion;
import com.example.controlstock.entity.Producto;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class TestConexion {
    public static void main(String[] args) {
        Conexion conexion = new Conexion();

        try (Connection cn = conexion.conectar();
             Statement stm = cn.createStatement()) {

            // Ejecuta la consulta para obtener todos los campos, incluyendo 'price'
            ResultSet rsProductos = stm.executeQuery("SELECT * FROM producto");


            System.out.println("Detalles de la tabla 'producto':");
            // Encabezado con ID, Nombre y Precio
            System.out.printf("%-5s%-20s%-10s%n", "ID", "Nombre", "Precio");
            System.out.println("------------------------------------");


            while (rsProductos.next()) {
                // 1. Leer los tres campos de la base de datos
                long id = rsProductos.getLong("id");
                String name = rsProductos.getString("name");
                float precio = rsProductos.getFloat("precio"); // Lee el precio como float


                // 2. Crear una instancia de Producto y establecer sus valores
                // Usamos el constructor vacío y setters
                Producto producto = new Producto();
                producto.setId(id);
                producto.setName(name);
                producto.setPrecio(precio);


                // 3. Imprimir la fila completa
                System.out.printf("%-5d%-20s$%-9.2f%n", // Formato para ID, Nombre y Precio (2 decimales)
                        producto.getId(),
                        producto.getName(),
                        producto.getPrecio()
                );
            }
        } catch (SQLException e) {
            System.err.println("Error al conectar a la base de datos o al recuperar datos.");
            e.printStackTrace();
        }
    }
}