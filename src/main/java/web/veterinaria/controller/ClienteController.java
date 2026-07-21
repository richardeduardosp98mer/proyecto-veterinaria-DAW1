package web.veterinaria.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.veterinaria.entity.Cliente;
import web.veterinaria.service.ClienteService;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping("/registrar")
    public ResponseEntity<Cliente> registrar(@RequestBody Cliente cliente){
        Cliente clienteRegistrado = clienteService.registrar(cliente);
        return ResponseEntity.ok(clienteRegistrado);
    }

    @GetMapping
    public List<Cliente> listar(){
        return clienteService.listarTodos();
    }

    @GetMapping("/buscar/{nombre}")
    public List<Cliente> buscarPorNombre(@PathVariable String nombre){
        return clienteService.buscar(nombre);
    }


}
