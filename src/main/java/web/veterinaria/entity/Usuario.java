package web.veterinaria.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdUsuario")
    private Long IdUsuario;

    @Column(name = "Correo")
    private String Correo;

    @Column(name = "Clave")
    private String Clave;

    @Column(name = "FechaCreacion")
    private LocalDateTime FechaCreacion = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "IdRol", nullable = false)
    private Rol rol;

    @ManyToOne
    @JoinColumn(name = "IdCliente", nullable = false)
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "IdVeterinario", nullable = false)
    private Veterinario veterinario;

    @ManyToOne
    @JoinColumn(name = "IdEstado", nullable = false)
    private Estado estado;
}
