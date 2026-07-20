package web.veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.veterinaria.entity.Mascota;

public interface MascotaRepository extends JpaRepository<Mascota, Long> {
}
