package web.veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.veterinaria.entity.Rol;

public interface RolRepository extends JpaRepository<Rol, Long> {
}
