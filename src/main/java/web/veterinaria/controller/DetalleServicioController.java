package web.veterinaria.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.veterinaria.dto.DetalleServicioRequest;
import web.veterinaria.dto.DetalleServicioResponse;
import web.veterinaria.service.DetalleServicioService;

import java.util.List;

@RestController
@RequestMapping("/api/detalle-servicios")
@RequiredArgsConstructor
public class DetalleServicioController {
    private final DetalleServicioService detalleServicioService;

    @GetMapping("/cita/{idCita}")
    public ResponseEntity<List<DetalleServicioResponse>> listarPorCita(@PathVariable Long idCita) {
        return ResponseEntity.ok(detalleServicioService.listarPorCita(idCita));
    }

    @PostMapping
    public ResponseEntity<DetalleServicioResponse> crear(@RequestBody DetalleServicioRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(detalleServicioService.crear(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DetalleServicioResponse> actualizar(@PathVariable Long id, @RequestBody DetalleServicioRequest request) {
        return ResponseEntity.ok(detalleServicioService.actualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        detalleServicioService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
