package web.veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.veterinaria.entity.Cita;

public interface CitaRepository extends JpaRepository<Cita, Long> {
}
