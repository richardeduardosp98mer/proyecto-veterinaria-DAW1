package web.veterinaria.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class MascotaRequest {
    private Long idCliente;
    private Long idEspecie;
    private String nombreMascota;
    private String raza;
    private LocalDate fechaNacimiento;
    private String sexo;
    private BigDecimal peso;
    private String observaciones;
}
