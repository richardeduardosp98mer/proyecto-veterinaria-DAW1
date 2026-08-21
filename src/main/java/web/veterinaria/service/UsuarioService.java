package web.veterinaria.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import web.veterinaria.dto.ActualizarUsuarioRequest;
import web.veterinaria.dto.UsuarioRegistroRequest;
import web.veterinaria.entity.Estado;
import web.veterinaria.entity.Rol;
import web.veterinaria.entity.Usuario;
import web.veterinaria.repository.EstadoRepository;
import web.veterinaria.repository.RolRepository;
import web.veterinaria.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepo;
    private final EstadoRepository estadoRepo;
    private final RolRepository rolRepo;
    private final PasswordEncoder passwordEncoder;



    public UsuarioService(UsuarioRepository usuarioRepo, EstadoRepository estadoRepo, RolRepository rolRepo, PasswordEncoder passwordEncoder) {
        this.usuarioRepo = usuarioRepo;
        this.estadoRepo = estadoRepo;
        this.rolRepo = rolRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario registrar(UsuarioRegistroRequest request) {
        Rol rol = rolRepo.findById(request.getIdRol()).orElse(null);
        if (rol == null) {
            return null;
        }

        Estado activo = estadoRepo.findByTipoEstado("Activo").orElse(null);
        if (activo == null) {
            return null;
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setCorreo(request.getCorreo());
        usuario.setClave(passwordEncoder.encode(request.getClave()));
        usuario.setCelular(request.getCelular());
        usuario.setRol(rol);
        usuario.setEstado(activo);

        return usuarioRepo.save(usuario);
    }

    public Usuario registrar(Usuario usuario) {
        // cifra la clave solo si todavía no lo está (evita cifrar dos veces si ya viene hasheada)
        if (usuario.getClave() != null && !usuario.getClave().startsWith("$2")) {
            usuario.setClave(passwordEncoder.encode(usuario.getClave()));
        }
        return usuarioRepo.save(usuario);
    }

    public List<Usuario> listar() {
        return usuarioRepo.findAll();
    }

    public Usuario obtener(Long id) {
        return usuarioRepo.findById(id).orElse(null);
    }

    public Usuario buscarPorCorreo(String correo) {
        return usuarioRepo.findByCorreo(correo).orElse(null);
    }

    public String login(String correo, String clave) {
        Usuario u = usuarioRepo.findByCorreo(correo).orElse(null);
        if (u == null) {
            return "CREDENCIALES_INVALIDAS";
        }
        if (!passwordEncoder.matches(clave, u.getClave())) {
            return "CREDENCIALES_INVALIDAS";
        }
        if (!u.getEstado().getTipoEstado().equals("Activo")) {
            return "USUARIO_INACTIVO";
        }
        return "OK";
    }

    public Usuario actualizar(Long id, ActualizarUsuarioRequest request) {
        Usuario usuario = usuarioRepo.findById(id).orElse(null);
        if (usuario == null) {
            return null;
        }
        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setCelular(request.getCelular());
        return usuarioRepo.save(usuario);
    }

    public boolean eliminar(Long id) {
        Usuario usuario = usuarioRepo.findById(id).orElse(null);
        if (usuario == null) {
            return false;
        }

        Estado inactivo = estadoRepo.findByTipoEstado("Inactivo").orElse(null);
        if (inactivo == null) {
            return false;
        }

        usuario.setEstado(inactivo);
        usuarioRepo.save(usuario);
        return true;
    }

    public String cambiarClave(Long id, String claveActual, String claveNueva) {
        Usuario usuario = usuarioRepo.findById(id).orElse(null);
        if (usuario == null) {
            return "USUARIO_NO_ENCONTRADO";
        }

        if (!passwordEncoder.matches(claveActual, usuario.getClave())) {
            return "CLAVE_ACTUAL_INCORRECTA";
        }

        if (claveNueva == null || claveNueva.isBlank()) {
            return "CLAVE_NUEVA_INVALIDA";
        }

        usuario.setClave(passwordEncoder.encode(claveNueva));
        usuarioRepo.save(usuario);
        return "OK";
    }

}