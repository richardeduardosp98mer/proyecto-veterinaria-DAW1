package web.veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.veterinaria.entity.Especie;

public interface EspecieRepository extends JpaRepository<Especie, Long> {
}
