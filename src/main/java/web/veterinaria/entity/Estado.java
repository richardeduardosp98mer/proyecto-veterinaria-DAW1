package web.veterinaria.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name= "estado")
public class Estado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdEstado")
    private Long idEstado;
    @Column(name = "TipoEstado",nullable = false, length = 50)
    private String tipoEstado;
}
