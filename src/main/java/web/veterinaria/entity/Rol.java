package web.veterinaria.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Rol")
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long IdRol;
    @Column(nullable = false)
    private String TipoRol;
}
