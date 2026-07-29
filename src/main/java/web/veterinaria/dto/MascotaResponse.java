package web.veterinaria.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class MascotaResponse {
    private Long idMascota;
    private String nombreMascota;
    private String especie;
    private String raza;
    private LocalDate fechaNacimiento;
    private String sexo;
    private BigDecimal peso;
    private String observaciones;
    private String estado;
    private Long idCliente;
    private String nombreCliente;
}
