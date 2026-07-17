package web.veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.veterinaria.entity.Estado;

public interface EstadoRepository extends JpaRepository<Estado, Long> {
}
