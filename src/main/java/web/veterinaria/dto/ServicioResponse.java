package web.veterinaria.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class ServicioResponse {
    private Long idServicio;
    private String nombreServicio;
    private String descripcion;
    private BigDecimal precio;
    private int duracionMinutos;
    private String estado;
}