package web.veterinaria.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "historialmedico")
public class HitorialMedico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdHistorial")
    private Long idHistorial;

    @Column(name = "FechaConsulta")
    private LocalDateTime fechaConsulta = LocalDateTime.now();

    @Column(name = "Diagnostico")
    private String diagnostico;

    @Column(name = "Tratamiento")
    private String tratamiento;

    @Column(name = "Peso")
    private Double peso;

    @Column(name = "Temperatura")
    private Double temperatura;

    @Column(name = "Observaciones")
    private String observaciones;

    @ManyToOne
    @JoinColumn(name = "IdMascota", nullable = false)
    private Mascota mascota;

    @ManyToOne
    @JoinColumn(name = "IdVeterinario", nullable = false)
    private Veterinario veterinario;

    @ManyToOne
    @JoinColumn(name = "IdCita", nullable = false)
    private Cita cita;
}
