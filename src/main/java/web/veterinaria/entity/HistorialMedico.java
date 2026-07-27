package web.veterinaria.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "historialmedico")
public class HistorialMedico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdHistorial")
    private Long idHistorial;

    @Column(name = "FechaConsulta", nullable = false)
    private LocalDateTime fechaConsulta = LocalDateTime.now();

    @Column(name = "Diagnostico", length = 500)
    private String diagnostico;

    @Column(name = "Tratamiento", length = 500)
    private String tratamiento;

    @Column(name = "Peso", precision = 6, scale = 2)
    private BigDecimal peso;

    @Column(name = "Temperatura", precision = 4, scale = 1)
    private BigDecimal temperatura;

    @Column(name = "Observaciones", length = 500)
    private String observaciones;

    @ManyToOne
    @JoinColumn(name = "IdMascota", nullable = false)
    private Mascota mascota;

    @ManyToOne
    @JoinColumn(name = "IdVeterinario", nullable = false)
    private Veterinario veterinario;

    @ManyToOne
    @JoinColumn(name = "IdCita")
    private Cita cita;
}