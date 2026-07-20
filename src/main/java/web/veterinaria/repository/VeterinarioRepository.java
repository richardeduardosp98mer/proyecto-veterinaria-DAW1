package web.veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.veterinaria.entity.Veterinario;

public interface VeterinarioRepository extends JpaRepository<Veterinario, Long> {
}
