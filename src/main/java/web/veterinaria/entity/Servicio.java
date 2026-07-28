package web.veterinaria.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "servicio")
public class Servicio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdServicio")
    private Long idServicio;

    @Column(name = "NombreServicio", nullable = false, length = 100)
    private String nombreServicio;

    @Column(name = "Descripcion", length = 300)
    private String descripcion;

    @Column(name = "Precio", nullable = false, precision = 8, scale = 2)
    private BigDecimal precio;

    @Column(name = "DuracionMinutos", nullable = false)
    private int duracionMinutos;

    @ManyToOne
    @JoinColumn(name = "IdEstado", nullable = false)
    private Estado estado;
}