package com.example.controlstock;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

/**
 *
 * @author Admin
 */

public class Conexion {
    private static final String CONTROLADOR = "com.mysql.cj.jdbc.Driver";
    private static final String URL = "jdbc:mysql://localhost:3306/producto";
    private static final String USUARIO = "root";
    private static final String CLAVE = "";

    static {
        try
        {
            Class.forName(CONTROLADOR);
        }
        catch (ClassNotFoundException e)
        {
            System.out.println("Error al cargar el controlador");
            e.printStackTrace();
        }
    }

    public static Connection conectar() {
        Connection conexion = null;

        try
        {
            conexion = DriverManager.getConnection(URL, USUARIO, CLAVE);

            System.out.println("Conexión exitosa");
        }
        catch (SQLException e)
        {
            System.out.println("Error en la conexión");

            e.printStackTrace();
        }

        return conexion;
    }

	public static void cerrarConexion(Connection cn, Statement stm) {
		 try {
		        if (stm != null) {
		            stm.close();
		        }
		        if (cn != null) {
		            cn.close();
		        }
		    }
         catch (SQLException e)
         {
		        e.printStackTrace();
         }
	}
}