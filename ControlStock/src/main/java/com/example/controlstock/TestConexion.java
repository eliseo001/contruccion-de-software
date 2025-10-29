package com.example.controlstock;

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

            // Asumiendo que la tabla 'producto' ahora tiene las columnas 'id', 'name' y 'price'
            ResultSet rsProductos = stm.executeQuery("SELECT * FROM producto");


            System.out.println("Detalles de la tabla 'producto':");
            // Se actualiza el formato de impresión para incluir el precio
            System.out.printf("%-5s%-20s%-10s%n", "ID", "Nombre", "Precio");
            System.out.println("------------------------------------");


            while (rsProductos.next()) {
                // Se lee el nuevo campo 'precio' (asumiendo que es un FLOAT en la DB)
                long id = rsProductos.getLong("id");
                String name = rsProductos.getString("name");
                float precio = rsProductos.getFloat("precio");


                // Ahora usamos el constructor que acepta nombre y precio
                // O mejor aún, usamos el constructor vacío y los setters si no quieres el ID aquí
                Producto producto = new Producto();
                producto.setId(id); // Opcional, pero bueno para el test
                producto.setName(name);
                producto.setPrecio(precio);


                // Se actualiza la impresión para mostrar todos los datos
                System.out.printf("%-5d%-20s$%-9.2f%n",
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