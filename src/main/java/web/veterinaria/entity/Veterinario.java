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

    @OneToOne
    @JoinColumn(name = "IdUsuario", nullable = false, unique = true)
    private Usuario usuario;

    @Column(name = "Especialidad", length = 100)
    private String especialidad;

    @Column(name = "NumeroColegiatura", length = 30)
    private String numeroColegiatura;
}