package com.vcp.controllers;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.Files;
import com.vcp.models.Register;
import com.vcp.services.IRegisterService;

@RestController
public class RegisterController {
	@Autowired
	private IRegisterService registerService;
	
	@GetMapping("/listar")
	public List<Register> listar(){
		return registerService.findAll();
	}
	
	@GetMapping("/test")
	public int test(){
		return 33333;
	}
	
	@GetMapping("/edit/{id}")
	public int edit(@PathVariable Long id) {
		int statusCode;
		try {
			statusCode=200;
			registerService.edit(id);
			return statusCode;
		}catch(Exception e){
			System.out.println("No se pudo editar: "+e);
			statusCode=500;
			return statusCode;
		}
	}
	
	@PostMapping(value="/register", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	//public String register() {
	public int register(@RequestParam String jsonregister, @RequestParam(required=false) MultipartFile file) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			String extension;
			Register register = objectMapper.readValue(jsonregister, Register.class);
			if(file != null) {
				register.setVid(true);
			}
			//Long id=bovineService.register(bovine);
			Long id= registerService.register(register);
			if(file != null) {
				System.out.println("Pasé por donde no debía");
				String fileName = file.getOriginalFilename();
				extension= Files.getFileExtension(fileName);
				if(extension=="")extension="mp4";
				Path path = Paths.get("src/main/resources/videos/"+id+"."+extension).toAbsolutePath();
				file.transferTo(path.toFile());
			}
			//registerService.register(register);
			return 200;
		}catch(Exception e){
			System.out.println("No se pudo guardar: "+e);
			return 500;
		}
	}
	
	
	
	@GetMapping("/videos/{id}")
    public ResponseEntity<Resource> getVideo(@PathVariable String id) throws IOException {
        Resource videoResource = new ClassPathResource("videos/"+id+".mp4");
        
        // Verificar que el recurso exista
        if (!videoResource.exists()) {
            return ResponseEntity.notFound().build();
        }
        
        // Configurar el encabezado de respuesta
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=03-05-2023.mp4");
        
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(videoResource);
    }
	
	
	
//	@GetMapping("/images/bovines/{nombre}")
//    public ResponseEntity<Resource> obtenerImagen(@PathVariable String nombre) {
//        try {
//            // Carga la imagen desde el directorio de recursos
//            Resource resource = new ClassPathResource("images/"+nombre+".jpg");
//
//            // Verifica si la imagen existe
//            if (resource.exists()) {
//                // Establece el tipo de contenido de la respuesta como imagen
//                MediaType mediaType = MediaType.IMAGE_JPEG; // O MediaType.IMAGE_PNG para imágenes PNG
//
//                // Retorna la imagen en la respuesta
//                return ResponseEntity.ok()
//                        .contentType(mediaType)
//                        .body(resource);
//            } else {
//                // Retorna una respuesta de error si la imagen no existe
//                return ResponseEntity.notFound().build();
//            }
//        } catch (Exception e) {
//            // Manejo de excepciones
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
	
	
	@GetMapping("/listar/{id}")
	public Register obtenerRegister(@PathVariable Long id) {
		return registerService.findById(id);
	}
}
