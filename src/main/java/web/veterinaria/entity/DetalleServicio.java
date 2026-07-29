package web.veterinaria.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "detalleservicio")
public class DetalleServicio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdDetalleServicio")
    private Long idDetalleServicio;

    @ManyToOne
    @JoinColumn(name = "IdCita", nullable = false)
    private Cita cita;

    @ManyToOne
    @JoinColumn(name = "IdServicio", nullable = false)
    private Servicio servicio;

    @Column(name = "Cantidad", nullable = false)
    private int cantidad;

    @Column(name = "PrecioUnitario", nullable = false, precision = 8, scale = 2)
    private BigDecimal precioUnitario;

    // Subtotal es columna GENERATED ALWAYS en la BD (Cantidad * PrecioUnitario)
    @Column(name = "Subtotal", insertable = false, updatable = false, precision = 8, scale = 2)
    private BigDecimal subtotal;

    @Column(name = "Observaciones", length = 300)
    private String observaciones;

}
