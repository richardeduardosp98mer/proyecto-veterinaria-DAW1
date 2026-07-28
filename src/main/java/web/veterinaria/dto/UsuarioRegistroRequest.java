package web.veterinaria.dto;

import lombok.Data;

@Data
public class UsuarioRegistroRequest {
    private String nombre;
    private String apellido;
    private String correo;
    private String clave;
    private String celular;
    private Long idRol;
}