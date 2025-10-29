package com.example.controlstock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.Connection;

@SpringBootApplication
public class ControlStockApplication {

	public static void main(String[] args)
	{
		Connection conn = Conexion.conectar();

		Conexion.cerrarConexion(conn, null);

		SpringApplication.run(ControlStockApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(@Autowired JdbcTemplate jdbcTemplate) {
		return args -> {
			try
			{
				jdbcTemplate.execute("SELECT 1");

				System.out.println("Conexión exitosa a la base de datos MySQL.");
			}
			catch (Exception e)
			{
				System.err.println("Error al conectar a la base de datos: " + e.getMessage());
			}
		};
	}
}