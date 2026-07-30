package web.veterinaria.dto;

import lombok.Data;

@Data
public class ActualizarUsuarioRequest {
    private String nombre;
    private String apellido;
    private String celular;
}