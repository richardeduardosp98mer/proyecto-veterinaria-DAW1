package web.veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.veterinaria.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
