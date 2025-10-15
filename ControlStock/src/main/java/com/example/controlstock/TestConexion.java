package com.example.controlstock;

import com.example.controlstock.entity.Producto;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class TestConexion {
    public static void main(String[] args) {
        Conexion conexion = new Conexion();

        try (Connection cn = conexion.conectar(); Statement stm = cn.createStatement()) {

            ResultSet rsProductos = stm.executeQuery("SELECT * FROM producto");


            System.out.println("Detalles de la tabla 'producto':");
            System.out.printf("%-15s%n", "Nombre");


            while (rsProductos.next()) {
                String name = rsProductos.getString("name");


                Producto producto = new Producto(name);


                System.out.printf("%-15s%n",
                        producto.getName()

                );
            }
        } catch (SQLException e) {
            System.err.println("Error al conectar a la base de datos o al recuperar datos.");
            e.printStackTrace();
        }
    }
}
