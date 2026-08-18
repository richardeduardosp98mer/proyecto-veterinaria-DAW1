package web.veterinaria.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import web.veterinaria.dto.HistorialMedicoRequest;
import web.veterinaria.dto.HistorialMedicoResponse;
import web.veterinaria.entity.Cita;
import web.veterinaria.entity.HistorialMedico;
import web.veterinaria.entity.Mascota;
import web.veterinaria.entity.Veterinario;
import web.veterinaria.repository.CitaRepository;
import web.veterinaria.repository.HistorialMedicoRepository;
import web.veterinaria.repository.MascotaRepository;
import web.veterinaria.repository.VeterinarioRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HistorialMedicoService {
    private final HistorialMedicoRepository historialMedicoRepository;
    private final MascotaRepository mascotaRepository;
    private final VeterinarioRepository veterinarioRepository;
    private final CitaRepository citaRepository;

    public List<HistorialMedicoResponse> listarPorMascota(Long idMascota) {
        return historialMedicoRepository.findByMascota_IdMascota(idMascota).stream()
                .map(this::toResponse)
                .toList();
    }

    public HistorialMedicoResponse obtenerPorId(Long id) {
        HistorialMedico historial = historialMedicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Historial médico no encontrado con id: " + id));
        return toResponse(historial);
    }

    public HistorialMedicoResponse crear(HistorialMedicoRequest request) {
        Mascota mascota = mascotaRepository.findById(request.getIdMascota())
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada con id: " + request.getIdMascota()));

        Veterinario veterinario = veterinarioRepository.findById(request.getIdVeterinario())
                .orElseThrow(() -> new RuntimeException("Veterinario no encontrado con id: " + request.getIdVeterinario()));

        HistorialMedico historial = new HistorialMedico();
        historial.setMascota(mascota);
        historial.setVeterinario(veterinario);
        aplicarDatos(historial, request);

        if (request.getIdCita() != null) {
            Cita cita = citaRepository.findById(request.getIdCita())
                    .orElseThrow(() -> new RuntimeException("Cita no encontrada con id: " + request.getIdCita()));
            historial.setCita(cita);
        }

        return toResponse(historialMedicoRepository.save(historial));
    }

    public HistorialMedicoResponse actualizar(Long id, HistorialMedicoRequest request) {
        HistorialMedico historial = historialMedicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Historial médico no encontrado con id: " + id));

        aplicarDatos(historial, request);

        return toResponse(historialMedicoRepository.save(historial));
    }

    public void eliminar(Long id) {
        if (!historialMedicoRepository.existsById(id)) {
            throw new RuntimeException("Historial médico no encontrado con id: " + id);
        }
        historialMedicoRepository.deleteById(id);
    }

    private void aplicarDatos(HistorialMedico historial, HistorialMedicoRequest request) {
        historial.setDiagnostico(request.getDiagnostico());
        historial.setTratamiento(request.getTratamiento());
        historial.setPeso(request.getPeso());
        historial.setTemperatura(request.getTemperatura());
        historial.setObservaciones(request.getObservaciones());
    }

    private HistorialMedicoResponse toResponse(HistorialMedico historial) {
        String nombreVeterinario = "";
        if (historial.getVeterinario() != null && historial.getVeterinario().getUsuario() != null) {
            nombreVeterinario = historial.getVeterinario().getUsuario().getNombre() + " "
                    + historial.getVeterinario().getUsuario().getApellido();
        }

        return HistorialMedicoResponse.builder()
                .idHistorial(historial.getIdHistorial())
                .idMascota(historial.getMascota() != null ? historial.getMascota().getIdMascota() : null)
                .nombreMascota(historial.getMascota() != null ? historial.getMascota().getNombreMascota() : null)
                .idVeterinario(historial.getVeterinario() != null ? historial.getVeterinario().getIdVeterinario() : null)
                .nombreVeterinario(nombreVeterinario)
                .idCita(historial.getCita() != null ? historial.getCita().getIdCita() : null)
                .fechaConsulta(historial.getFechaConsulta())
                .diagnostico(historial.getDiagnostico())
                .tratamiento(historial.getTratamiento())
                .peso(historial.getPeso())
                .temperatura(historial.getTemperatura())
                .observaciones(historial.getObservaciones())
                .build();
    }

}
