package web.veterinaria.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "mascota")
public class Mascota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdMascota")
    private Long idMascota;

    @Column(name = "NombreMascota", nullable = false, length = 100)
    private String nombreMascota;

    @Column(name = "Raza", length = 100)
    private String raza;

    @Column(name = "FechaNacimiento")
    private LocalDate fechaNacimiento;

    @Column(name = "Sexo", columnDefinition = "CHAR(1)")
    private String sexo;

    @Column(name = "Peso", precision = 6, scale = 2)
    private BigDecimal peso;

    @Column(name = "Observaciones", length = 500)
    private String observaciones;

    @ManyToOne
    @JoinColumn(name = "IdCliente", nullable = false)
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "IdEspecie", nullable = false)
    private Especie especie;

    @ManyToOne
    @JoinColumn(name = "IdEstado", nullable = false)
    private Estado estado;
}