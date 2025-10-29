package com.example.controlstock.entity;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 *
 * @author Admin
 */
@Entity
@Table(name = "producto")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("name")
    private String name;

    // 1. NUEVO CAMPO: Precio (usamos float o Double)
    @JsonProperty("precio")
    private float precio;
    // Podrías usar Double en su lugar si prefieres un tipo de objeto: private Double price;

    // Constructor con nombre y precio (Nuevo)
    public Producto(String name, float precio) {
        this.name = name;
        this.precio = precio;
    }

    // Constructor solo con nombre (Mantener si es necesario)
    public Producto(String name) {
        this.name = name;
    }

    // Constructor vacío (Necesario para JPA)
    public Producto() {

    }


    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getPrecio() {
        return precio;
    }

    public void setPrecio(float precio) {
        this.precio = precio;
    }
}