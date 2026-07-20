package web.veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.veterinaria.entity.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
