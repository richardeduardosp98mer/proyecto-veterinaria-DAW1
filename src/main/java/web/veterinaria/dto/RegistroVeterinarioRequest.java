package web.veterinaria.dto;

import lombok.Data;

@Data
public class RegistroVeterinarioRequest {
    private String nombre;
    private String apellido;
    private String correo;
    private String clave;
    private String celular;

    private String especialidad;
    private String numeroColegiatura;
}