package web.veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.veterinaria.entity.Servicio;

public interface ServicioRepository extends JpaRepository<Servicio, Long> {
}
