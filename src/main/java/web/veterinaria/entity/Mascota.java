package web.veterinaria.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "mascota")
public class Mascota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdMascota")
    private Long IdMascota;

    @Column(name = "NombreMascota")
    private String NombreMascota;

    @Column(name = "Raza")
    private String Raza;

    @Column(name = "FechaNacimiento")
    private LocalDate FechaNacimiento = LocalDate.now();

    @Column(name = "Sexo")
    private String Sexo;

    @Column(name = "Peso")
    private Double Peso;

    @Column(name = "Observaciones")
    private String Observaciones;

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