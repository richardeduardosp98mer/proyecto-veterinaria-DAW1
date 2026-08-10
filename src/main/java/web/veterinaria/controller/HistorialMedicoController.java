package web.veterinaria.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.veterinaria.dto.HistorialMedicoRequest;
import web.veterinaria.dto.HistorialMedicoResponse;
import web.veterinaria.service.HistorialMedicoService;

import java.util.List;

@RestController
@RequestMapping("/api/historial-medico")
@RequiredArgsConstructor
public class HistorialMedicoController {

    private final HistorialMedicoService historialMedicoService;

    @GetMapping("/mascota/{idMascota}")
    public ResponseEntity<List<HistorialMedicoResponse>> listarPorMascota(@PathVariable Long idMascota) {
        return ResponseEntity.ok(historialMedicoService.listarPorMascota(idMascota));
    }

    @GetMapping("/{id}")
    public ResponseEntity<HistorialMedicoResponse> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(historialMedicoService.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<HistorialMedicoResponse> registrar(@RequestBody HistorialMedicoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(historialMedicoService.crear(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<HistorialMedicoResponse> actualizar(@PathVariable Long id, @RequestBody HistorialMedicoRequest request) {
        return ResponseEntity.ok(historialMedicoService.actualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        historialMedicoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }


}
