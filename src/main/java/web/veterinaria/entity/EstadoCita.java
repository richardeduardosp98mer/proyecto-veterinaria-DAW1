package web.veterinaria.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "estadocita")
public class EstadoCita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdEstadoCita")
    private Long IdEstadoCita;

    @Column(name = "NombreEstado", nullable = false)
    private String NombreEstado;
}
