import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

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
        [Validators.required, Validators.pattern(this.vs.emailPattern)], [this.emailService],
      ],
      username: ['', [Validators.required, this.vs.noPuedeSerStrider]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [this.vs.camposIguales('password', 'password2')],
    }
  );

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.["required"]) {
      return 'Email es obligatorio';
    } else if (errors?.["pattern"]) {
      return 'No tiene el formato correcto';
    } else if (errors?.["emailTomado"]) {
      return 'El correo ya existe';
    }
    return '';
  }

  constructor(private fb: FormBuilder, private vs: ValidatorService, private emailService: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Nicolas Rodriguez',
      email: 'test@test.com',
      username: 'nicogr',
      password: '123456',
      password2: '123456'
    });
  }

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }
  // usernameInapropiado() {
  //   return (
  //     this.miFormulario.get('username')?.errors?.["noStrider"] &&
  //     this.miFormulario.get('username')?.touched
  //   );
  // }

  submitFormulario() {
    console.log(this.miFormulario.controls);
    this.miFormulario.markAllAsTouched();
  }
}
