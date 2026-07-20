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
    private Long IdCita;

    @Column(name = "FechaHora")
    private LocalDateTime FechaHora = LocalDateTime.now();

    @Column(name = "Observaciones")
    private String Observaciones;

    private LocalDateTime FechaRegistro = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "IdMascota", nullable = false)
    private Mascota mascota;

    @ManyToOne
    @JoinColumn(name = "IdVeterinario", nullable = false)
    private Veterinario veterinario;

    @ManyToOne
    @JoinColumn(name = "IdServicio", nullable = false)
    private Servicio servicio;

    @ManyToOne
    @JoinColumn(name = "IdEstadoCita", nullable = false)
    private EstadoCita estadoCita;
}
