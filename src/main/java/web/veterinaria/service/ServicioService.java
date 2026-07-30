package web.veterinaria.service;

import org.springframework.stereotype.Service;
import web.veterinaria.dto.ServicioRequest;
import web.veterinaria.dto.ServicioResponse;
import web.veterinaria.entity.Estado;
import web.veterinaria.entity.Servicio;
import web.veterinaria.repository.EstadoRepository;
import web.veterinaria.repository.ServicioRepository;

import java.util.List;

@Service
public class ServicioService {
    private final ServicioRepository servicioRepository;
    private final EstadoRepository estadoRepository;

    public ServicioService(ServicioRepository servicioRepository, EstadoRepository estadoRepository) {
        this.servicioRepository = servicioRepository;
        this.estadoRepository = estadoRepository;
    }

    private ServicioResponse mapearAResponse(Servicio servicio) {
        return ServicioResponse.builder()
                .idServicio(servicio.getIdServicio())
                .nombreServicio(servicio.getNombreServicio())
                .descripcion(servicio.getDescripcion())
                .precio(servicio.getPrecio())
                .duracionMinutos(servicio.getDuracionMinutos())
                .estado(servicio.getEstado() != null ? servicio.getEstado().getTipoEstado() : null)
                .build();
    }

    // listar todos los servicios
    public List<ServicioResponse> listar() {
        return servicioRepository.findAll()
                .stream()
                .map(this::mapearAResponse)
                .toList();
    }

    // obtener servicio x id
    public ServicioResponse obtenerPorId(Long id) {
        Servicio servicio = servicioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado con Id: " + id));
        return mapearAResponse(servicio);
    }

    // crear servicio
    public ServicioResponse registrarServicio(ServicioRequest request) {
        Estado estadoActivo = estadoRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Estado por defecto no existente"));

        Servicio servicio = new Servicio();
        servicio.setNombreServicio(request.getNombreServicio());
        servicio.setDescripcion(request.getDescripcion());
        servicio.setPrecio(request.getPrecio());
        servicio.setDuracionMinutos(request.getDuracionMinutos());
        servicio.setEstado(estadoActivo);

        Servicio guardado = servicioRepository.save(servicio);
        return mapearAResponse(guardado);
    }

    // actualizar servicio
    public ServicioResponse actualizarServicio(Long id, ServicioRequest request) {
        Servicio servicio = servicioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado con Id: " + id));

        servicio.setNombreServicio(request.getNombreServicio());
        servicio.setDescripcion(request.getDescripcion());
        servicio.setPrecio(request.getPrecio());
        servicio.setDuracionMinutos(request.getDuracionMinutos());

        Servicio actualizado = servicioRepository.save(servicio);
        return mapearAResponse(actualizado);
    }

    // eliminar servicio (baja lógica: lo pasa a Inactivo)
    public void eliminarServicio(Long id) {
        Servicio servicio = servicioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado con Id: " + id));

        Estado estadoInactivo = estadoRepository.findById(2L)
                .orElseThrow(() -> new RuntimeException("Estado Inactivo no existente"));

        servicio.setEstado(estadoInactivo);
        servicioRepository.save(servicio);
    }
}