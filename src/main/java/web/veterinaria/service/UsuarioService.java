package web.veterinaria.service;

import org.springframework.stereotype.Service;
import web.veterinaria.entity.Estado;
import web.veterinaria.entity.Usuario;
import web.veterinaria.repository.EstadoRepository;
import web.veterinaria.repository.UsuarioRepository;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepo;
    private final EstadoRepository estadoRepo;

    public UsuarioService(UsuarioRepository usuarioRepo, EstadoRepository estadoRepo) {
        this.usuarioRepo = usuarioRepo;
        this.estadoRepo = estadoRepo;
    }

    public Usuario registrar(Usuario usuario) {
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

    public Usuario login(String correo, String clave) {
        Usuario u = usuarioRepo.findByCorreo(correo).orElse(null);
        if (u != null && u.getClave().equals(clave)) {
            return u;
        }
        return null;
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
}