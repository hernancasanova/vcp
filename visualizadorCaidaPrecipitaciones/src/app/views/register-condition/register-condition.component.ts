import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

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
              fecha:r.fecha
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
    register.cantidad=(document.getElementById('cantidad') as HTMLInputElement).value;
    register.condicion=(document.getElementById('condicion') as HTMLInputElement).value;
    register.fecha=(document.getElementById('fecha') as HTMLInputElement).value;
    let response: any = await fetch("http://localhost:8005/register",
                        {method:"POST",
                          body:JSON.stringify(register),
                         //Content-Type: application/json
                         headers: {
                          'Content-Type': 'application/json'
                          // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        })
                        .then(x=>x.json())
                        .then(x=>{setTimeout(()=>{},2000);this.registrando=false; return x;})
                        .catch(error=>console.log(error));
    console.log("response: ",response)
  }

}
