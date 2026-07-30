package web.veterinaria.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.veterinaria.dto.ActualizarVeterinarioRequest;
import web.veterinaria.dto.RegistroVeterinarioRequest;
import web.veterinaria.dto.VeterinarioResponse;
import web.veterinaria.entity.Estado;
import web.veterinaria.entity.Rol;
import web.veterinaria.entity.Usuario;
import web.veterinaria.entity.Veterinario;
import web.veterinaria.service.VeterinarioService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/veterinarios")
public class VeterinarioController {

    private final VeterinarioService veterinarioService;

    public VeterinarioController(VeterinarioService veterinarioService) {
        this.veterinarioService = veterinarioService;
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody RegistroVeterinarioRequest request) {
        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setCorreo(request.getCorreo());
        usuario.setClave(request.getClave());
        usuario.setCelular(request.getCelular());

        Rol rolVeterinario = new Rol();
        rolVeterinario.setIdRol(2L);
        usuario.setRol(rolVeterinario);

        Estado activo = new Estado();
        activo.setIdEstado(1L);
        usuario.setEstado(activo);

        Veterinario veterinario = new Veterinario();
        veterinario.setEspecialidad(request.getEspecialidad());
        veterinario.setNumeroColegiatura(request.getNumeroColegiatura());

        Veterinario guardado = veterinarioService.registrarVeterinario(usuario, veterinario);
        if (guardado == null) {
            return ResponseEntity.badRequest().body("El correo ya está registrado");
        }
        return ResponseEntity.ok(aResponse(guardado));
    }

    @GetMapping
    public List<VeterinarioResponse> listar() {
        List<Veterinario> veterinarios = veterinarioService.listar();
        List<VeterinarioResponse> respuestas = new ArrayList<>();

        for (Veterinario veterinario : veterinarios) {
            respuestas.add(aResponse(veterinario));
        }

        return respuestas;
    }

    @GetMapping("/{id}")
    public ResponseEntity<VeterinarioResponse> obtener(@PathVariable Long id) {
        Veterinario veterinario = veterinarioService.obtener(id);
        if (veterinario == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(aResponse(veterinario));
    }

    @GetMapping("/buscar")
    public List<VeterinarioResponse> buscarPorEspecialidad(@RequestParam String especialidad) {
        List<Veterinario> veterinarios = veterinarioService.buscarPorEspecialidad(especialidad);
        List<VeterinarioResponse> respuestas = new ArrayList<>();
        for (Veterinario veterinario : veterinarios) {
            respuestas.add(aResponse(veterinario));
        }
        return respuestas;
    }

    @GetMapping("/colegiatura/{numeroColegiatura}")
    public ResponseEntity<VeterinarioResponse> buscarPorNumeroColegiatura(@PathVariable String numeroColegiatura) {
        Veterinario veterinario = veterinarioService.buscarPorNumeroColegiatura(numeroColegiatura);
        if (veterinario == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(aResponse(veterinario));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VeterinarioResponse> actualizar(@PathVariable Long id, @RequestBody ActualizarVeterinarioRequest request) {
        Veterinario actualizado = veterinarioService.actualizar(id, request);
        if (actualizado == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(aResponse(actualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        boolean eliminado = veterinarioService.eliminar(id);
        if (!eliminado) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    private VeterinarioResponse aResponse(Veterinario veterinario) {
        return new VeterinarioResponse(
                veterinario.getIdVeterinario(),
                veterinario.getUsuario().getNombre(),
                veterinario.getUsuario().getApellido(),
                veterinario.getUsuario().getCorreo(),
                veterinario.getUsuario().getCelular(),
                veterinario.getEspecialidad(),
                veterinario.getNumeroColegiatura()
        );
    }
}