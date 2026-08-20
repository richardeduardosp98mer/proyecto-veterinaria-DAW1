package web.veterinaria.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.veterinaria.dto.CitaRequest;
import web.veterinaria.dto.CitaResponse;
import web.veterinaria.service.CitaService;

import java.util.List;

@RestController
@RequestMapping("/api/citas")
@RequiredArgsConstructor
public class CitaController {
    private final CitaService citaService;

    @GetMapping
    public ResponseEntity<List<CitaResponse>> listar() {
        return ResponseEntity.ok(citaService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CitaResponse> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(citaService.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<CitaResponse> registrar(@RequestBody CitaRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(citaService.crear(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CitaResponse> actualizar(@PathVariable Long id, @RequestBody CitaRequest request) {
        return ResponseEntity.ok(citaService.actualizarCita(id, request));
    }

    // no se hace borrado físico: la cita tiene registros dependientes (DetalleServicio, Pago, HistorialMedico)
    @DeleteMapping("/{id}")
    public ResponseEntity<CitaResponse> cancelar(@PathVariable Long id) {
        return ResponseEntity.ok(citaService.cancelarCita(id));
    }

}
