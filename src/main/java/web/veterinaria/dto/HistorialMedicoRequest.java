package web.veterinaria.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class HistorialMedicoRequest {
    private Long idMascota;
    private Long idVeterinario;
    // opcional: la consulta puede no venir asociada a una cita puntual
    private Long idCita;
    private String diagnostico;
    private String tratamiento;
    private BigDecimal peso;
    private BigDecimal temperatura;
    private String observaciones;
}
