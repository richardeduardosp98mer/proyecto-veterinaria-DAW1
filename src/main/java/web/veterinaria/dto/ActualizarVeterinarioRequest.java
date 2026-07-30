package web.veterinaria.dto;

import lombok.Data;

@Data
public class ActualizarVeterinarioRequest {
    private String nombre;
    private String apellido;
    private String celular;
}