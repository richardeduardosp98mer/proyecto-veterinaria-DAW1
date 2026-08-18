package web.veterinaria.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CitaResponse {
    private Long idCita;
    private Long idMascota;
    private String nombreMascota;
    private Long idVeterinario;
    private String nombreVeterinario;
    private LocalDateTime fechaHora;
    private String estadoCita;
    private String observaciones;
    private LocalDateTime fechaRegistro;
}
