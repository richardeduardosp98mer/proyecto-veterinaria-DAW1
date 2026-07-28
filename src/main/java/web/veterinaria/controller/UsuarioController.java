package web.veterinaria.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.veterinaria.dto.UsuarioRegistroRequest;
import web.veterinaria.dto.UsuarioResponse;
import web.veterinaria.entity.Estado;
import web.veterinaria.entity.Rol;
import web.veterinaria.entity.Usuario;
import web.veterinaria.service.UsuarioService;

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
    public ResponseEntity<UsuarioResponse> registrar(@RequestBody UsuarioRegistroRequest request) {
        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setCorreo(request.getCorreo());
        usuario.setClave(request.getClave());
        usuario.setCelular(request.getCelular());

        Rol rol = new Rol();
        rol.setIdRol(request.getIdRol());
        usuario.setRol(rol);

        Estado activo = new Estado();
        activo.setIdEstado(1L);
        usuario.setEstado(activo);

        Usuario guardado = usuarioService.registrar(usuario);
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