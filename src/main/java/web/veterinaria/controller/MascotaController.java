package web.veterinaria.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.veterinaria.dto.MascotaRequest;
import web.veterinaria.dto.MascotaResponse;
import web.veterinaria.service.MascotaService;

@RestController
@RequestMapping("/api/mascotas")
public class MascotaController {
    private final MascotaService mascotaService;

    public MascotaController(MascotaService mascotaService) {
        this.mascotaService = mascotaService;
    }

    //obtener la mascota x id
    @GetMapping("/{id}")
    public ResponseEntity<MascotaResponse> obtenerPorId(@PathVariable Long id){
        return ResponseEntity.ok(mascotaService.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<MascotaResponse> registrar(@RequestBody MascotaRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(mascotaService.registrarMascota(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MascotaResponse> actualizar(@PathVariable Long id, @RequestBody MascotaRequest request){
        return ResponseEntity.ok(mascotaService.actualizarMascota(id, request));
    }
}
