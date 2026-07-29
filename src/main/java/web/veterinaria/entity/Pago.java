package web.veterinaria.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "pago")
public class Pago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdPago")
    private Long idPago;

    @ManyToOne
    @JoinColumn(name = "IdCita", nullable = false)
    private Cita cita;

    @ManyToOne
    @JoinColumn(name = "IdMetodoPago", nullable = false)
    private MetodoPago metodoPago;

    @Column(name = "Monto", nullable = false, precision = 8, scale = 2)
    private BigDecimal monto;

    @Column(name = "FechaPago", nullable = false)
    private LocalDateTime fechaPago;

    @Column(name = "Referencia", length = 100)
    private String referencia;

    @PrePersist
    protected void onCreate() {
        if (fechaPago == null) {
            fechaPago = LocalDateTime.now();
        }
    }

}
