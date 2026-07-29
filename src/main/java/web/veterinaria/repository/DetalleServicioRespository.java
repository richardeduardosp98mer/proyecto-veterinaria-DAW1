package web.veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.veterinaria.entity.DetalleServicio;

import java.util.List;

public interface DetalleServicioRespository extends JpaRepository<DetalleServicio, Long> {
    List<DetalleServicio> findByCita_IdCita(Long idCita);
}
