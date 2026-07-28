package web.veterinaria.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cliente")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdCliente")
    private Long idCliente;

    @OneToOne
    @JoinColumn(name = "IdUsuario", nullable = false, unique = true)
    private Usuario usuario;

    @Column(name = "DNI", nullable = false, unique = true, length = 8)
    private String dni;

    @Column(name = "Direccion", length = 200)
    private String direccion;
}