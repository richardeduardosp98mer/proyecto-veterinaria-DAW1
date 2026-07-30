package web.veterinaria.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.veterinaria.dto.PagoRequest;
import web.veterinaria.dto.PagoResponse;
import web.veterinaria.service.PagoService;

import java.util.List;

@RestController
@RequestMapping("/api/pagos")
@RequiredArgsConstructor
public class PagoController {
    private final PagoService pagoService;

    @GetMapping("/cita/{idCita}")
    public ResponseEntity<List<PagoResponse>> listarPorCita(@PathVariable Long idCita) {
        return ResponseEntity.ok(pagoService.listarPorCita(idCita));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PagoResponse> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(pagoService.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<PagoResponse> registrar(@RequestBody PagoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(pagoService.registrar(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        pagoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
