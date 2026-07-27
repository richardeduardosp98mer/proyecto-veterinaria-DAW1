package web.veterinaria.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.veterinaria.entity.Usuario;
import web.veterinaria.entity.Veterinario;
import web.veterinaria.repository.VeterinarioRepository;

import java.util.List;

@Service
public class VeterinarioService {

    private final VeterinarioRepository veterinarioRepo;
    private final UsuarioService usuarioService;

    public VeterinarioService(VeterinarioRepository veterinarioRepo, UsuarioService usuarioService) {
        this.veterinarioRepo = veterinarioRepo;
        this.usuarioService = usuarioService;
    }

    public List<Veterinario> listar() {
        return veterinarioRepo.findAll();
    }

    public Veterinario obtener(Long id) {
        return veterinarioRepo.findById(id).orElse(null);
    }

    @Transactional
    public Veterinario registrarVeterinario(Usuario datosUsuario, Veterinario datosVeterinario) {
        Usuario usuarioExistente = usuarioService.buscarPorCorreo(datosUsuario.getCorreo());
        if (usuarioExistente != null) {
            return null; // ya existe un usuario con ese correo
        }

        Usuario usuarioGuardado = usuarioService.registrar(datosUsuario);
        datosVeterinario.setUsuario(usuarioGuardado);
        return veterinarioRepo.save(datosVeterinario);
    }

    public Veterinario actualizar(Long id, Veterinario datosActualizados) {
        Veterinario veterinario = veterinarioRepo.findById(id).orElse(null);
        if (veterinario == null) {
            return null;
        }
        veterinario.setEspecialidad(datosActualizados.getEspecialidad());
        veterinario.setNumeroColegiatura(datosActualizados.getNumeroColegiatura());
        return veterinarioRepo.save(veterinario);
    }

    public boolean eliminar(Long id) {
        Veterinario veterinario = veterinarioRepo.findById(id).orElse(null);
        if (veterinario == null) {
            return false;
        }
        return usuarioService.eliminar(veterinario.getUsuario().getIdUsuario());
    }
}