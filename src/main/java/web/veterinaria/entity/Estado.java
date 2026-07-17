package web.veterinaria.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name= "Estado")
public class Estado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long IdEstado;
    @Column(nullable = false)
    private String TipoEstado;
}
