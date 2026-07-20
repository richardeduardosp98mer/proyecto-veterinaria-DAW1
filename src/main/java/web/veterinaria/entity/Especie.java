package web.veterinaria.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "especie")
public class Especie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdEspecie")
    private Long IdEspecie;

    @Column(name = "NombreEspecie")
    private String NombreEspecie;
}
