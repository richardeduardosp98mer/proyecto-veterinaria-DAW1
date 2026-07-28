package web.veterinaria.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private Long idUsuario;
    private String nombre;
    private String apellido;
    private String correo;
    private String rol;
}