package web.veterinaria.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UsuarioResponse {
    private Long idUsuario;
    private String nombre;
    private String apellido;
    private String correo;
    private String celular;
    private String rol;
    private String estado;
}