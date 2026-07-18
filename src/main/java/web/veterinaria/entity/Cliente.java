package web.veterinaria.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Cliente")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdCliente")
    private long idCliente;
    @Column(name = "NombreCliente",nullable = false, length = 100)
    private String nombreCliente;
    @Column(name = "ApellidoCliente",nullable = false, length = 100)
    private String apellidoCliente;
    @Column(name = "DNI",nullable = false, length = 8)
    private String dni;
    @Column(name = "Telefono",nullable = false, length = 9)
    private String telefono;
    @Column(name = "Email",nullable = false, length = 150)
    private String email;
    @Column(name = "Direccion",nullable = false, length = 200)
    private String direccion;
    @Column(name = "FechaRegistro",nullable = false)
    private String fechaRegistro;
    @ManyToOne
    @JoinColumn(name = "IdEstado",nullable = false)
    private Estado estado;



}
