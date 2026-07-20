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
    private Long IdVeterinario;

    @Column(name = "NombreVeterinario")
    private String NombreVeterinario;

    @Column(name = "ApellidoVeterinario")
    private String ApellidoVeterinario;

    @Column(name = "Especialidad")
    private String Especialidad;

    @Column(name = "Telefono")
    private String Telefono;

    @Column(name = "Email")
    private String Email;

    @Column(name = "NumeroColegiatura")
    private String NumeroColegiatura;

    @ManyToOne
    @JoinColumn(name = "IdEstado", nullable = false)
    private Estado estado;
}
