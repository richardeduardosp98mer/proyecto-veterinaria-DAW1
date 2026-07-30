package web.veterinaria.dto;

import lombok.Data;

@Data
public class DetalleServicioRequest {
    private Long idCita;
    private Long idServicio;
    private int cantidad;
    private String observaciones;
}
