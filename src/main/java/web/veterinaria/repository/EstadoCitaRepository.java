package web.veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.veterinaria.entity.EstadoCita;

public interface EstadoCitaRepository extends JpaRepository<EstadoCita, Long> {
}
