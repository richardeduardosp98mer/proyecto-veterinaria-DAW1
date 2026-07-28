package web.veterinaria.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClienteResponse {
    private Long idCliente;
    private String nombre;
    private String apellido;
    private String correo;
    private String celular;
    private String dni;
    private String direccion;
}