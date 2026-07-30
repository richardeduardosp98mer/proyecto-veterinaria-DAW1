package web.veterinaria.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.veterinaria.dto.ActualizarUsuarioRequest;
import web.veterinaria.dto.UsuarioRegistroRequest;
import web.veterinaria.dto.UsuarioResponse;
import web.veterinaria.entity.Estado;
import web.veterinaria.entity.Rol;
import web.veterinaria.entity.Usuario;
import web.veterinaria.service.UsuarioService;
import web.veterinaria.dto.CambiarClaveRequest;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody UsuarioRegistroRequest request) {
        Usuario guardado = usuarioService.registrar(request);
        if (guardado == null) {
            return ResponseEntity.badRequest().body("El rol indicado no existe");
        }
        return ResponseEntity.ok(aResponse(guardado));
    }

    @GetMapping
    public List<UsuarioResponse> listar() {
        List<Usuario> usuarios = usuarioService.listar();
        List<UsuarioResponse> respuestas = new ArrayList<>();

        for (Usuario usuario : usuarios) {
            respuestas.add(aResponse(usuario));
        }

        return respuestas;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> obtener(@PathVariable Long id) {
        Usuario usuario = usuarioService.obtener(id);
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(aResponse(usuario));
    }

    @PutMapping("/{id}/clave")
    public ResponseEntity<?> cambiarClave(@PathVariable Long id, @RequestBody CambiarClaveRequest request) {
        String resultado = usuarioService.cambiarClave(id, request.getClaveActual(), request.getClaveNueva());

        if (resultado.equals("USUARIO_NO_ENCONTRADO")) {
            return ResponseEntity.notFound().build();
        }
        if (resultado.equals("CLAVE_ACTUAL_INCORRECTA")) {
            return ResponseEntity.status(401).body("La clave actual no es correcta");
        }
        if (resultado.equals("CLAVE_NUEVA_INVALIDA")) {
            return ResponseEntity.badRequest().body("La nueva clave no puede estar vacía");
        }

        return ResponseEntity.ok("Clave actualizada correctamente");
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponse> actualizar(@PathVariable Long id, @RequestBody ActualizarUsuarioRequest request) {
        Usuario actualizado = usuarioService.actualizar(id, request);
        if (actualizado == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(aResponse(actualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        boolean eliminado = usuarioService.eliminar(id);
        if (!eliminado) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    private UsuarioResponse aResponse(Usuario usuario) {
        return new UsuarioResponse(
                usuario.getIdUsuario(),
                usuario.getNombre(),
                usuario.getApellido(),
                usuario.getCorreo(),
                usuario.getCelular(),
                usuario.getRol().getTipoRol(),
                usuario.getEstado().getTipoEstado()
        );
    }
}