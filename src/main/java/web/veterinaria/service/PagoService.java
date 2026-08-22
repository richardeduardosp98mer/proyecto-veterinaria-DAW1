package web.veterinaria.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import web.veterinaria.dto.PagoRequest;
import web.veterinaria.dto.PagoResponse;
import web.veterinaria.entity.Cita;
import web.veterinaria.entity.MetodoPago;
import web.veterinaria.entity.Pago;
import web.veterinaria.repository.CitaRepository;
import web.veterinaria.repository.MetodoPagoRepository;
import web.veterinaria.repository.PagoRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PagoService {
    private final PagoRepository pagoRepository;
    private final CitaRepository citaRepository;
    private final MetodoPagoRepository metodoPagoRepository;

    public List<PagoResponse> listarPorCita(Long idCita) {
        return pagoRepository.findByCita_IdCita(idCita).stream()
                .map(this::toResponse)
                .toList();
    }

    public PagoResponse obtenerPorId(Long id) {
        Pago pago = pagoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pago no encontrado con id: " + id));
        return toResponse(pago);
    }

    public PagoResponse registrar(PagoRequest request) {
        Cita cita = citaRepository.findById(request.getIdCita())
                .orElseThrow(() -> new RuntimeException("Cita no encontrada con id: " + request.getIdCita()));

        MetodoPago metodoPago = metodoPagoRepository.findById(request.getIdMetodoPago())
                .orElseThrow(() -> new RuntimeException("Método de pago no encontrado con id: " + request.getIdMetodoPago()));

        Pago pago = new Pago();
        pago.setCita(cita);
        pago.setMetodoPago(metodoPago);
        pago.setMonto(request.getMonto());
        pago.setReferencia(request.getReferencia());

        return toResponse(pagoRepository.save(pago));
    }

    public void eliminar(Long id) {
        if (!pagoRepository.existsById(id)) {
            throw new RuntimeException("Pago no encontrado con id: " + id);
        }
        pagoRepository.deleteById(id);
    }

    private PagoResponse toResponse(Pago pago) {
        String nombreMascota = pago.getCita().getMascota().getNombreMascota();

        String nombreCliente = pago.getCita().getMascota().getCliente().getUsuario().getNombre() + " "
                + pago.getCita().getMascota().getCliente().getUsuario().getApellido();

        return new PagoResponse(
                pago.getIdPago(),
                pago.getCita().getIdCita(),
                nombreMascota,
                nombreCliente,
                pago.getMetodoPago().getNombreMetodoPago(),
                pago.getMonto(),
                pago.getFechaPago(),
                pago.getReferencia()
        );

    }
}
