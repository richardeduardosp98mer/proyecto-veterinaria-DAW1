package web.veterinaria.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "servicio")
public class Servicio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdServicio")
    private Long IdServicio;

    @Column(name = "NombreServicio")
    private String NombreServicio;

    @Column(name = "Descripcion")
    private String Descripcion;

    @Column(name = "Precio")
    private Double Precio;

    @Column(name = "DuracionMinutos")
    private int DuracionMinutos;

    @ManyToOne
    @JoinColumn(name = "IdEstado", nullable = false)
    private Estado estado;
}
