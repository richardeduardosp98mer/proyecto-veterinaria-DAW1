package web.veterinaria.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.veterinaria.dto.MetodoPagoRequest;
import web.veterinaria.dto.MetodoPagoResponse;
import web.veterinaria.service.MetodoPagoService;

import java.util.List;

@RestController
@RequestMapping("/api/metodos-pago")
@RequiredArgsConstructor
public class MetodoPagoController {
    private final MetodoPagoService metodoPagoService;

    @GetMapping
    public ResponseEntity<List<MetodoPagoResponse>> listar() {
        return ResponseEntity.ok(metodoPagoService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MetodoPagoResponse> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(metodoPagoService.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<MetodoPagoResponse> crear(@RequestBody MetodoPagoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(metodoPagoService.crear(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MetodoPagoResponse> actualizar(@PathVariable Long id, @RequestBody MetodoPagoRequest request) {
        return ResponseEntity.ok(metodoPagoService.actualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        metodoPagoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
