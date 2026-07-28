package web.veterinaria.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VeterinarioResponse {
    private Long idVeterinario;
    private String nombre;
    private String apellido;
    private String correo;
    private String celular;
    private String especialidad;
    private String numeroColegiatura;
}