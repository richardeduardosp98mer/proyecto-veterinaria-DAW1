package web.veterinaria.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "cita")
public class Cita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdCita")
    private Long idCita;

    @Column(name = "FechaHora", nullable = false)
    private LocalDateTime fechaHora;

    @Column(name = "Observaciones", length = 500)
    private String observaciones;

    @Column(name = "FechaRegistro", nullable = false)
    private LocalDateTime fechaRegistro = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "IdMascota", nullable = false)
    private Mascota mascota;

    @ManyToOne
    @JoinColumn(name = "IdVeterinario", nullable = false)
    private Veterinario veterinario;

    @ManyToOne
    @JoinColumn(name = "IdEstadoCita", nullable = false)
    private EstadoCita estadoCita;
}