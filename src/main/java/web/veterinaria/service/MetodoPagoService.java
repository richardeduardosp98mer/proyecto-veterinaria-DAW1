package web.veterinaria.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import web.veterinaria.dto.MetodoPagoRequest;
import web.veterinaria.dto.MetodoPagoResponse;
import web.veterinaria.entity.MetodoPago;
import web.veterinaria.repository.MetodoPagoRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MetodoPagoService {
    private final MetodoPagoRepository metodoPagoRepository;

    public List<MetodoPagoResponse> listar() {
        return metodoPagoRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public MetodoPagoResponse obtenerPorId(Long id) {
        MetodoPago metodoPago = metodoPagoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Método de pago no encontrado con id: " + id));
        return toResponse(metodoPago);
    }

    public MetodoPagoResponse crear(MetodoPagoRequest request) {
        MetodoPago metodoPago = new MetodoPago();
        metodoPago.setNombreMetodoPago(request.getNombreMetodoPago());
        return toResponse(metodoPagoRepository.save(metodoPago));
    }

    public MetodoPagoResponse actualizar(Long id, MetodoPagoRequest request) {
        MetodoPago metodoPago = metodoPagoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Método de pago no encontrado con id: " + id));
        metodoPago.setNombreMetodoPago(request.getNombreMetodoPago());
        return toResponse(metodoPagoRepository.save(metodoPago));
    }

    public void eliminar(Long id) {
        if (!metodoPagoRepository.existsById(id)) {
            throw new RuntimeException("Método de pago no encontrado con id: " + id);
        }
        metodoPagoRepository.deleteById(id);
    }

    private MetodoPagoResponse toResponse(MetodoPago metodoPago) {
        return new MetodoPagoResponse(metodoPago.getIdMetodoPago(), metodoPago.getNombreMetodoPago());
    }
}
