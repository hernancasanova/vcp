import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-condition',
  templateUrl: './register-condition.component.html',
  styles: [
  ]
})
export class RegisterConditionComponent implements OnInit {

  registrando: boolean = false;
  registerForm = new FormGroup({
    cantidad: new FormControl(''),
    condicion: new FormControl(''),
    fecha: new FormControl(''),
    video: new FormControl(''),
  });

  constructor(private activatedRoute: ActivatedRoute, private service: ServicesService) { }

  ngOnInit(): void {
    this.cargarCondicion();
  }

  id:number=0;
  r:any;
  cargarCondicion(): void {
    this.activatedRoute.params.subscribe(
      e=>{
        let id = e['id'];
        if(id){
          this.service.getRegister(id).subscribe(r=>{
            console.log("register: ",r)
            this.id=r.id
            this.registerForm.setValue({
              cantidad: r.cantidad,
              condicion: r.condicion,
              fecha:r.fecha,
              video:''
            })
          });
        }
        console.log("Seteando el formulario")
      }
    )
  }


  async registerCondition(): Promise<void> 
  {
    this.registrando=true;
    let register: any = {};
    if(this.id!=0){
      register.id=this.id;
    }
    const formData = new FormData();
    register.cantidad=(document.getElementById('cantidad') as HTMLInputElement).value;
    register.condicion=(document.getElementById('condicion') as HTMLInputElement).value;
    register.fecha=(document.getElementById('fecha') as HTMLInputElement).value;
    formData.append('jsonregister',JSON.stringify(register))
    formData.append('file', (document.getElementById('video') as HTMLInputElement)?.files?.item(0) as any);
    let response: any = await fetch("http://localhost:8005/register",
                        {method:"POST",
                          body:formData
                          //body:JSON.stringify(register),
                          //body:JSON.stringify(register),
                         //Content-Type: application/json
                         //headers: {
                          //'Content-Type': 'application/json'
                          // 'Content-Type': 'application/x-www-form-urlencoded',
                        //},
                        })
                        .then(x=>x.json())
                        .then(x=>{setTimeout(()=>{},2000);this.registrando=false;
                        Swal.fire({
                          title: '',
                          text: "Registro creado exitosamente",
                          icon: 'success',
                          confirmButtonText: 'Aceptar'
                        })
                         return x;})
                        .catch(error=>console.log(error));
    console.log("response: ",response)
  }

}
