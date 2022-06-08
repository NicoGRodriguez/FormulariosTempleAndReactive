import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [],
})
export class RegistroComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group(
    {
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(this.vs.nombreApellidoPattern),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(this.vs.emailPattern)],
      ],
      username: ['', [Validators.required, this.vs.noPuedeSerStrider]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [this.vs.camposIguales('password', 'password2')],
    }
  );

  constructor(private fb: FormBuilder, private vs: ValidatorService) {}

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Nicolas Rodriguez',
      email: 'test@hola.com',
      username: 'nicogr',
    });
  }

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  submitFormulario() {
    console.log(this.miFormulario.controls);
    this.miFormulario.markAllAsTouched();
  }
}
