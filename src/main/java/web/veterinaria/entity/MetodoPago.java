package web.veterinaria.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "metodopago")
public class MetodoPago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdMetodoPago")
    private Long idMetodoPago;

    @Column(name = "NombreMetodoPago", nullable = false, unique = true, length = 50)
    private String nombreMetodoPago;

}
