package web.veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.veterinaria.entity.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByCorreo(String correo);
}
