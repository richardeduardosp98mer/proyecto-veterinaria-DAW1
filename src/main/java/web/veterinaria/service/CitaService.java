package web.veterinaria.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import web.veterinaria.dto.CitaRequest;
import web.veterinaria.dto.CitaResponse;
import web.veterinaria.entity.Cita;
import web.veterinaria.entity.EstadoCita;
import web.veterinaria.entity.Mascota;
import web.veterinaria.entity.Veterinario;
import web.veterinaria.repository.CitaRepository;
import web.veterinaria.repository.EstadoCitaRepository;
import web.veterinaria.repository.MascotaRepository;
import web.veterinaria.repository.VeterinarioRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CitaService {
    private final CitaRepository citaRepository;
    private final MascotaRepository mascotaRepository;
    private final VeterinarioRepository veterinarioRepository;
    private final EstadoCitaRepository estadoCitaRepository;

    // para transformar de entidad a response dto
    private CitaResponse mapearAResponse(Cita cita) {
        String nombreVeterinario = "";
        if (cita.getVeterinario() != null && cita.getVeterinario().getUsuario() != null) {
            nombreVeterinario = cita.getVeterinario().getUsuario().getNombre() + " "
                    + cita.getVeterinario().getUsuario().getApellido();
        }

        return CitaResponse.builder()
                .idCita(cita.getIdCita())
                .idMascota(cita.getMascota() != null ? cita.getMascota().getIdMascota() : null)
                .nombreMascota(cita.getMascota() != null ? cita.getMascota().getNombreMascota() : null)
                .idVeterinario(cita.getVeterinario() != null ? cita.getVeterinario().getIdVeterinario() : null)
                .nombreVeterinario(nombreVeterinario)
                .fechaHora(cita.getFechaHora())
                .estadoCita(cita.getEstadoCita() != null ? cita.getEstadoCita().getNombreEstado() : null)
                .observaciones(cita.getObservaciones())
                .fechaRegistro(cita.getFechaRegistro())
                .build();
    }

    // para listar todas las citas
    public List<CitaResponse> listar() {
        return citaRepository.findAll().stream()
                .map(this::mapearAResponse)
                .toList();
    }

    // para obtener una cita por id
    public CitaResponse obtenerPorId(Long id) {
        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada con Id: " + id));
        return mapearAResponse(cita);
    }

    // para registrar una nueva cita
    public CitaResponse crear(CitaRequest request) {
        Mascota mascota = mascotaRepository.findById(request.getIdMascota())
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada con Id: " + request.getIdMascota()));

        Veterinario veterinario = veterinarioRepository.findById(request.getIdVeterinario())
                .orElseThrow(() -> new RuntimeException("Veterinario no encontrado con Id: " + request.getIdVeterinario()));

        // si no se envía estado, se usa "Pendiente" (IdEstadoCita = 1) por defecto
        Long idEstado = request.getIdEstadoCita() != null ? request.getIdEstadoCita() : 1L;
        EstadoCita estadoCita = estadoCitaRepository.findById(idEstado)
                .orElseThrow(() -> new RuntimeException("Estado de cita no encontrado con Id: " + idEstado));

        Cita cita = new Cita();
        cita.setMascota(mascota);
        cita.setVeterinario(veterinario);
        cita.setFechaHora(request.getFechaHora());
        cita.setObservaciones(request.getObservaciones());
        cita.setEstadoCita(estadoCita);

        Cita guardada = citaRepository.save(cita);
        return mapearAResponse(guardada);
    }

    // para actualizar cita
    public CitaResponse actualizarCita(Long id, CitaRequest request) {
        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada con Id: " + id));

        Mascota mascota = mascotaRepository.findById(request.getIdMascota())
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada con Id: " + request.getIdMascota()));

        Veterinario veterinario = veterinarioRepository.findById(request.getIdVeterinario())
                .orElseThrow(() -> new RuntimeException("Veterinario no encontrado con Id: " + request.getIdVeterinario()));

        cita.setMascota(mascota);
        cita.setVeterinario(veterinario);
        cita.setFechaHora(request.getFechaHora());
        cita.setObservaciones(request.getObservaciones());

        if (request.getIdEstadoCita() != null) {
            EstadoCita estadoCita = estadoCitaRepository.findById(request.getIdEstadoCita())
                    .orElseThrow(() -> new RuntimeException("Estado de cita no encontrado con Id: " + request.getIdEstadoCita()));
            cita.setEstadoCita(estadoCita);
        }

        Cita actualizada = citaRepository.save(cita);
        return mapearAResponse(actualizada);
    }

    // eliminar = cambia el estado a "Cancelada" (IdEstadoCita = 4) en vez de borrado físico,
    // porque Cita tiene registros dependientes (DetalleServicio, Pago, HistorialMedico)
    public CitaResponse cancelarCita(Long id) {
        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada con Id: " + id));

        EstadoCita cancelada = estadoCitaRepository.findById(4L)
                .orElseThrow(() -> new RuntimeException("Estado 'Cancelada' no configurado en EstadoCita"));

        cita.setEstadoCita(cancelada);
        Cita actualizada = citaRepository.save(cita);
        return mapearAResponse(actualizada);
    }

}