package web.veterinaria.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MetodoPagoResponse {
    private Long idMetodoPago;
    private String nombreMetodoPago;
}
