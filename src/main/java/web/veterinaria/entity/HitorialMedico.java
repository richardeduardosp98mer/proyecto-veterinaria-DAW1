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
    private Long IdHistorial;

    @Column(name = "FechaConsulta")
    private LocalDateTime FechaConsulta = LocalDateTime.now();

    @Column(name = "Diagnostico")
    private String Diagnostico;

    @Column(name = "Tratamiento")
    private String Tratamiento;

    @Column(name = "Peso")
    private Double Peso;

    @Column(name = "Temperatura")
    private Double Temperatura;

    @Column(name = "Observaciones")
    private String Observaciones;

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
