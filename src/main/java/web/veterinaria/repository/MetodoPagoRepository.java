package web.veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.veterinaria.entity.MetodoPago;

public interface MetodoPagoRepository extends JpaRepository<MetodoPago, Long>{

}