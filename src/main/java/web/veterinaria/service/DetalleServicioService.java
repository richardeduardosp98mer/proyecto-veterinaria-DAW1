package web.veterinaria.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import web.veterinaria.dto.DetalleServicioRequest;
import web.veterinaria.dto.DetalleServicioResponse;
import web.veterinaria.entity.Cita;
import web.veterinaria.entity.DetalleServicio;
import web.veterinaria.entity.Servicio;
import web.veterinaria.repository.CitaRepository;
import web.veterinaria.repository.DetalleServicioRepository;
import web.veterinaria.repository.ServicioRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DetalleServicioService {
    private final DetalleServicioRepository detalleServicioRepository;
    private final CitaRepository citaRepository;
    private final ServicioRepository servicioRepository;

    public List<DetalleServicioResponse> listarPorCita(Long idCita) {
        return detalleServicioRepository.findByCita_IdCita(idCita).stream()
                .map(this::toResponse)
                .toList();
    }

    public DetalleServicioResponse crear(DetalleServicioRequest request) {
        Cita cita = citaRepository.findById(request.getIdCita())
                .orElseThrow(() -> new RuntimeException("Cita no encontrada con id: " + request.getIdCita()));

        Servicio servicio = servicioRepository.findById(request.getIdServicio())
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado con id: " + request.getIdServicio()));

        DetalleServicio detalle = new DetalleServicio();
        detalle.setCita(cita);
        detalle.setServicio(servicio);
        detalle.setCantidad(request.getCantidad());
        detalle.setPrecioUnitario(servicio.getPrecio());
        detalle.setObservaciones(request.getObservaciones());

        return toResponse(detalleServicioRepository.save(detalle));
    }

    public void eliminar(Long id) {
        if (!detalleServicioRepository.existsById(id)) {
            throw new RuntimeException("Detalle de servicio no encontrado con id: " + id);
        }
        detalleServicioRepository.deleteById(id);
    }

    private DetalleServicioResponse toResponse(DetalleServicio detalle) {
        return new DetalleServicioResponse(
                detalle.getIdDetalleServicio(),
                detalle.getCita().getIdCita(),
                detalle.getServicio().getNombreServicio(),
                detalle.getCantidad(),
                detalle.getPrecioUnitario(),
                detalle.getSubtotal(),
                detalle.getObservaciones()
        );
    }
}
