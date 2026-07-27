package web.veterinaria.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String correo;
    private String clave;
}
