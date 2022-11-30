import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterConditionComponent } from '../register-condition/register-condition.component'
import { SpinnerModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [RegisterConditionComponent],
  imports: [
    CommonModule,
    SpinnerModule,
    ReactiveFormsModule
  ], 
  exports: [
    RegisterConditionComponent
  ]
})
export class RegisterConditionModule { }
