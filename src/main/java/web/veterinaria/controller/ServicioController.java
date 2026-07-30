package web.veterinaria.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.veterinaria.dto.ServicioRequest;
import web.veterinaria.dto.ServicioResponse;
import web.veterinaria.service.ServicioService;

import java.util.List;

@RestController
@RequestMapping("/api/servicios")
public class ServicioController {
    private final ServicioService servicioService;

    public ServicioController(ServicioService servicioService) {
        this.servicioService = servicioService;
    }

    @GetMapping
    public ResponseEntity<List<ServicioResponse>> listar() {
        return ResponseEntity.ok(servicioService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServicioResponse> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(servicioService.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<ServicioResponse> registrar(@RequestBody ServicioRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(servicioService.registrarServicio(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServicioResponse> actualizar(@PathVariable Long id, @RequestBody ServicioRequest request) {
        return ResponseEntity.ok(servicioService.actualizarServicio(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        servicioService.eliminarServicio(id);
        return ResponseEntity.noContent().build();
    }
}