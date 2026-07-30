package web.veterinaria.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.veterinaria.dto.ActualizarClienteRequest;
import web.veterinaria.entity.Cliente;
import web.veterinaria.entity.Usuario;
import web.veterinaria.repository.ClienteRepository;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepo;
    private final UsuarioService usuarioService;

    public ClienteService(ClienteRepository clienteRepo, UsuarioService usuarioService) {
        this.clienteRepo = clienteRepo;
        this.usuarioService = usuarioService;
    }

    public List<Cliente> listar() {
        return clienteRepo.findAll();
    }

    public Cliente obtener(Long id) {
        return clienteRepo.findById(id).orElse(null);
    }

    public Cliente buscarPorDni(String dni) {
        return clienteRepo.findByDni(dni).orElse(null);
    }

    public List<Cliente> buscarPorNombre(String nombre) {
        return clienteRepo.findByUsuario_NombreContaining(nombre);
    }

    public Cliente buscarPorIdUsuario(Long idUsuario) {
        return clienteRepo.findByUsuario_IdUsuario(idUsuario).orElse(null);
    }

    @Transactional
    public Cliente registrarCliente(Usuario datosUsuario, Cliente datosCliente) {
        Usuario usuarioExistente = usuarioService.buscarPorCorreo(datosUsuario.getCorreo());
        if (usuarioExistente != null) {
            return null; // ya existe un usuario con ese correo
        }

        Cliente clienteExistente = clienteRepo.findByDni(datosCliente.getDni()).orElse(null);
        if (clienteExistente != null) {
            return null; // ya existe un cliente con ese DNI
        }

        Usuario usuarioGuardado = usuarioService.registrar(datosUsuario);
        datosCliente.setUsuario(usuarioGuardado);
        return clienteRepo.save(datosCliente);
    }

    // ClienteService.java
    @Transactional
    public Cliente actualizar(Long id, ActualizarClienteRequest request) {
        Cliente cliente = clienteRepo.findById(id).orElse(null);
        if (cliente == null) {
            return null;
        }

        cliente.setDireccion(request.getDireccion());
        cliente.getUsuario().setNombre(request.getNombre());
        cliente.getUsuario().setApellido(request.getApellido());
        cliente.getUsuario().setCelular(request.getCelular());

        return clienteRepo.save(cliente);
    }

    public boolean eliminar(Long id) {
        Cliente cliente = clienteRepo.findById(id).orElse(null);
        if (cliente == null) {
            return false;
        }
        return usuarioService.eliminar(cliente.getUsuario().getIdUsuario());
    }
}