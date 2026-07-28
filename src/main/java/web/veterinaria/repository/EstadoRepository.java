package web.veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.veterinaria.entity.Estado;

import java.util.Optional;

public interface EstadoRepository extends JpaRepository<Estado, Long> {
    Optional<Estado> findByTipoEstado(String tipoEstado);
}
