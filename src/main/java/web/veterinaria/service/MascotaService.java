package web.veterinaria.service;

import org.springframework.stereotype.Service;
import web.veterinaria.dto.MascotaRequest;
import web.veterinaria.dto.MascotaResponse;
import web.veterinaria.entity.Cliente;
import web.veterinaria.entity.Especie;
import web.veterinaria.entity.Estado;
import web.veterinaria.entity.Mascota;
import web.veterinaria.repository.ClienteRepository;
import web.veterinaria.repository.EspecieRepository;
import web.veterinaria.repository.EstadoRepository;
import web.veterinaria.repository.MascotaRepository;

@Service
public class MascotaService {
    private final MascotaRepository mascotaRepository;
    private final ClienteRepository clienteRepository;
    private final EspecieRepository especieRepository;
    private final EstadoRepository estadoRepository;

    public MascotaService(MascotaRepository mascotaRepository, ClienteRepository clienteRepository, EspecieRepository especieRepository, EstadoRepository estadoRepository) {
        this.mascotaRepository = mascotaRepository;
        this.clienteRepository = clienteRepository;
        this.especieRepository = especieRepository;
        this.estadoRepository = estadoRepository;
    }

    //para transformar de entidad a response dto

    private MascotaResponse mapearAResponse(Mascota mascota){
        String nombreCliente = "";
        if(mascota.getCliente() != null && mascota.getCliente().getUsuario() != null){
            nombreCliente = mascota.getCliente().getUsuario().getNombre() + " " + mascota.getCliente().getUsuario().getApellido();
        }

        return MascotaResponse.builder()
                .idMascota(mascota.getIdMascota())
                .nombreMascota(mascota.getNombreMascota())
                .especie(mascota.getEspecie() != null ? mascota.getEspecie().getNombreEspecie() : null)
                .raza(mascota.getRaza())
                .fechaNacimiento(mascota.getFechaNacimiento())
                .sexo(mascota.getSexo())
                .peso(mascota.getPeso())
                .observaciones(mascota.getObservaciones())
                .estado(mascota.getEstado() != null ? mascota.getEstado().getTipoEstado() : null)
                .idCliente(mascota.getCliente() != null ? mascota.getCliente().getIdCliente() : null)
                .nombreCliente(nombreCliente)
                .build();
    }

    //para obtener mascota x id
    public MascotaResponse obtenerPorId(Long id){
        Mascota mascota = mascotaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada con Id: " + id));

        return mapearAResponse(mascota);
    }

    //para crear mascota
    public MascotaResponse registrarMascota(MascotaRequest request){
        Cliente cliente = clienteRepository.findById(request.getIdCliente())
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado con Id: " + request.getIdCliente()));

        Especie especie = especieRepository.findById(request.getIdEspecie())
                .orElseThrow(() -> new RuntimeException("Espece no encontrada con Id: " + request.getIdEspecie()));

        // asignando estado 1 por defecto
        Estado estadoActivo = estadoRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Estado por defecto no existente"));

        Mascota mascota = new Mascota();
        mascota.setCliente(cliente);
        mascota.setEspecie(especie);
        mascota.setNombreMascota(request.getNombreMascota());
        mascota.setRaza(request.getRaza());
        mascota.setFechaNacimiento(request.getFechaNacimiento());
        mascota.setSexo(request.getSexo());
        mascota.setPeso(request.getPeso());
        mascota.setObservaciones(request.getObservaciones());
        mascota.setEstado(estadoActivo);

        Mascota guardada = mascotaRepository.save(mascota);
        return mapearAResponse(guardada);
    }

    //para actualizar mascota
    public MascotaResponse actualizarMascota(Long id, MascotaRequest request){
        Mascota mascota = mascotaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada con id: " + id));

        Especie especie = especieRepository.findById(request.getIdEspecie())
                .orElseThrow(() -> new RuntimeException("Especie no encontrada con id: " + request.getIdEspecie()));

        mascota.setEspecie(especie);
        mascota.setNombreMascota(request.getNombreMascota());
        mascota.setRaza(request.getRaza());
        mascota.setFechaNacimiento(request.getFechaNacimiento());
        mascota.setSexo(request.getSexo());
        mascota.setPeso(request.getPeso());
        mascota.setObservaciones(request.getObservaciones());

        Mascota actualizada = mascotaRepository.save(mascota);
        return mapearAResponse(actualizada);
    }


}

