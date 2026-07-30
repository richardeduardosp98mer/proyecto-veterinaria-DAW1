package web.veterinaria.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class PagoRequest {
    private Long idCita;
    private Long idMetodoPago;
    private BigDecimal monto;
    private String referencia;
}
