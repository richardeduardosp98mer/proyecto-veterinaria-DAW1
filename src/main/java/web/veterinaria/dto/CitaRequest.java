package web.veterinaria.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CitaRequest {
    private Long idMascota;
    private Long idVeterinario;
    private LocalDateTime fechaHora;
    private String observaciones;
    // Opcional: si no se envía, se usa "Pendiente" (IdEstadoCita = 1) al registrar
    private Long idEstadoCita;


}
