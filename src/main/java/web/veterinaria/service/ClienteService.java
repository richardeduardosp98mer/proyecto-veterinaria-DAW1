package web.veterinaria.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import web.veterinaria.entity.Cliente;
import web.veterinaria.repository.ClienteRepository;

import java.util.List;

@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;

    @PersistenceContext
    private EntityManager em;

    //hacer alt + insert para crear el constructor
    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> listarTodos(){
        return em.createQuery("SELECT c FROM Cliente c", Cliente.class)
                .setHint("org.hibernate.fetchSize", 5).getResultList();
    }

    public List<Cliente> buscar(String nombre){
        return clienteRepository.findByNombreCliente(nombre);
    }

    public Cliente registrar(Cliente cliente) {
        return clienteRepository.save(cliente);
    }
}
