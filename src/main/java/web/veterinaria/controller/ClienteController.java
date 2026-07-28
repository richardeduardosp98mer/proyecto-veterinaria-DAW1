package web.veterinaria.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.veterinaria.dto.ClienteResponse;
import web.veterinaria.dto.RegistroClienteRequest;
import web.veterinaria.entity.Cliente;
import web.veterinaria.entity.Estado;
import web.veterinaria.entity.Rol;
import web.veterinaria.entity.Usuario;
import web.veterinaria.service.ClienteService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody RegistroClienteRequest request) {
        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setCorreo(request.getCorreo());
        usuario.setClave(request.getClave());
        usuario.setCelular(request.getCelular());

        Rol rolCliente = new Rol();
        rolCliente.setIdRol(3L);
        usuario.setRol(rolCliente);

        Estado activo = new Estado();
        activo.setIdEstado(1L);
        usuario.setEstado(activo);

        Cliente cliente = new Cliente();
        cliente.setDni(request.getDni());
        cliente.setDireccion(request.getDireccion());

        Cliente guardado = clienteService.registrarCliente(usuario, cliente);
        if (guardado == null) {
            return ResponseEntity.badRequest().body("El correo o el DNI ya están registrados");
        }
        return ResponseEntity.ok(aResponse(guardado));
    }

    @GetMapping
    public List<ClienteResponse> listar() {
        List<Cliente> clientes = clienteService.listar();
        List<ClienteResponse> respuestas = new ArrayList<>();

        for (Cliente cliente : clientes) {
            respuestas.add(aResponse(cliente));
        }

        return respuestas;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponse> obtener(@PathVariable Long id) {
        Cliente cliente = clienteService.obtener(id);
        if (cliente == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(aResponse(cliente));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteResponse> actualizar(@PathVariable Long id, @RequestBody Cliente datosActualizados) {
        Cliente actualizado = clienteService.actualizar(id, datosActualizados);
        if (actualizado == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(aResponse(actualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        boolean eliminado = clienteService.eliminar(id);
        if (!eliminado) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    private ClienteResponse aResponse(Cliente cliente) {
        return new ClienteResponse(
                cliente.getIdCliente(),
                cliente.getUsuario().getNombre(),
                cliente.getUsuario().getApellido(),
                cliente.getUsuario().getCorreo(),
                cliente.getUsuario().getCelular(),
                cliente.getDni(),
                cliente.getDireccion()
        );
    }
}