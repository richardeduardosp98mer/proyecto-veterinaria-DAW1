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
        String resultado = usuarioService.login(loginRequest.getCorreo(), loginRequest.getClave());

        if (resultado.equals("CREDENCIALES_INVALIDAS")) {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
        if (resultado.equals("USUARIO_INACTIVO")) {
            return ResponseEntity.status(403).body("Tu cuenta está desactivada. Contacta al administrador");
        }

        Usuario usuario = usuarioService.buscarPorCorreo(loginRequest.getCorreo());
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