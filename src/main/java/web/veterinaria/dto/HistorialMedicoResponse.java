package web.veterinaria.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class HistorialMedicoResponse {
    private Long idHistorial;
    private Long idMascota;
    private String nombreMascota;
    private Long idVeterinario;
    private String nombreVeterinario;
    private Long idCita;
    private LocalDateTime fechaConsulta;
    private String diagnostico;
    private String tratamiento;
    private BigDecimal peso;
    private BigDecimal temperatura;
    private String observaciones;

}
