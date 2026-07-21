package web.veterinaria.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "veterinario")
public class Veterinario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdVeterinario")
    private Long idVeterinario;

    @Column(name = "NombreVeterinario")
    private String nombreVeterinario;

    @Column(name = "ApellidoVeterinario")
    private String apellidoVeterinario;

    @Column(name = "Especialidad")
    private String especialidad;

    @Column(name = "Telefono")
    private String telefono;

    @Column(name = "Email")
    private String email;

    @Column(name = "NumeroColegiatura")
    private String numeroColegiatura;

    @ManyToOne
    @JoinColumn(name = "IdEstado", nullable = false)
    private Estado estado;
}
