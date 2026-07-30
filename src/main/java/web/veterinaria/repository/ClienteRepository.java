package web.veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.veterinaria.entity.Cliente;

import java.util.List;
import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    List<Cliente> findByUsuario_NombreContaining(String nombre);
    Optional<Cliente> findByDni(String dni);
    Optional<Cliente> findByUsuario_IdUsuario(Long idUsuario);
}
