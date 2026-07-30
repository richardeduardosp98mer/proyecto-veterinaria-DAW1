package web.veterinaria.dto;

import lombok.Data;

@Data
public class CambiarClaveRequest {
    private String claveActual;
    private String claveNueva;
}