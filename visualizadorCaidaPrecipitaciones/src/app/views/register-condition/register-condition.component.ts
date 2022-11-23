import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register-condition',
  templateUrl: './register-condition.component.html',
  styles: [
  ]
})
export class RegisterConditionComponent implements OnInit {

  registerForm = new FormGroup({
    cantidad: new FormControl(''),
    condicion: new FormControl(''),
    fecha: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

  async registerCondition(): Promise<void> 
  {
    let register: any = {};
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
                        .then(x=>x)
                        .catch(error=>console.log(error));
    console.log("response: ",response)
  }

}
