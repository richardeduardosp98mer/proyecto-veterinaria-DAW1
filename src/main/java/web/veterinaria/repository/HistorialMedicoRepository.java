package web.veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.veterinaria.entity.HistorialMedico;

public interface HistorialMedicoRepository extends JpaRepository<HistorialMedico, Long> {
}
