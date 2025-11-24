package com.example.controlstock.bd; // Nuevo paquete: bd

import com.example.controlstock.Conexion;
import com.example.controlstock.entity.Producto;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class TestConexion {
    public static void main(String[] args)
    {
        Conexion conexion = new Conexion();

        try (Connection cn = conexion.conectar();
             Statement stm = cn.createStatement()) {

            ResultSet rsProductos = stm.executeQuery("SELECT * FROM producto");

            System.out.println("Detalles de la tabla 'producto':");

            System.out.printf("%-5s%-20s%-10s%n", "ID", "Nombre", "Precio");

            System.out.println("------------------------------------");


            while (rsProductos.next()) {
                long id = rsProductos.getLong("id");

                String name = rsProductos.getString("name");

                float precio = rsProductos.getFloat("precio");

                Producto producto = new Producto();

                producto.setId(id);

                producto.setName(name);

                producto.setPrecio(precio);

                System.out.printf("%-5d%-20s$%-9.2f%n",
                        producto.getId(),
                        producto.getName(),
                        producto.getPrecio()
                );
            }
        }
        catch (SQLException e)
        {
            System.err.println("Error al conectar a la base de datos o al recuperar datos.");

            e.printStackTrace();
        }
    }
}