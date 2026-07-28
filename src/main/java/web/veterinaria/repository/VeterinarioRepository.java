package web.veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.veterinaria.entity.Veterinario;

import java.util.List;
import java.util.Optional;

public interface VeterinarioRepository extends JpaRepository<Veterinario, Long> {
    List<Veterinario> findByEspecialidad(String especialidad);
    Optional<Veterinario> findByNumeroColegiatura(String numeroColegiatura);
    Optional<Veterinario> findByUsuario_IdUsuario(Long idUsuario);
}
