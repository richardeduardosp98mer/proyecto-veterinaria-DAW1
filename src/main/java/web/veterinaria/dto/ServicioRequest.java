package web.veterinaria.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ServicioRequest {
    private String nombreServicio;
    private String descripcion;
    private BigDecimal precio;
    private int duracionMinutos;
}