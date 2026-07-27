package web.veterinaria.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.veterinaria.dto.LoginRequest;
import web.veterinaria.dto.LoginResponse;
import web.veterinaria.entity.Usuario;
import web.veterinaria.service.UsuarioService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Usuario usuario = usuarioService.login(loginRequest.getCorreo(), loginRequest.getClave());
        if (usuario == null) {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }

        LoginResponse response = new LoginResponse(
                usuario.getIdUsuario(),
                usuario.getNombre(),
                usuario.getApellido(),
                usuario.getCorreo(),
                usuario.getRol().getTipoRol()
        );
        return ResponseEntity.ok(response);
    }
}