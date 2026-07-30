package web.veterinaria.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PagoResponse {
    private Long idPago;
    private Long idCita;
    private String metodoPago;
    private BigDecimal monto;
    private LocalDateTime fechaPago;
    private String referencia;
}
