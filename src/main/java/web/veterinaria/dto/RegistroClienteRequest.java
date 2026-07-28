package web.veterinaria.dto;

import lombok.Data;

@Data
public class RegistroClienteRequest {
    private String nombre;
    private String apellido;
    private String correo;
    private String clave;
    private String celular;

    private String dni;
    private String direccion;
}