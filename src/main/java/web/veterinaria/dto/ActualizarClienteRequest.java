package web.veterinaria.dto;

import lombok.Data;

@Data
public class ActualizarClienteRequest {
    private String nombre;
    private String apellido;
    private String celular;
    private String direccion;
}