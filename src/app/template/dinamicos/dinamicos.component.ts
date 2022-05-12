import { Component, OnInit, ViewChild, enableProdMode } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  isEditableT: boolean = true;

  nuevoJuego: string = '';

  editar(i: number) {
    if (this.isEditableT) {
      this.isEditableT = false
    }
    else {
      this.isEditableT = true
    }
  }

  @ViewChild('miFormulario') miFormulario!: NgForm;
  persona: Persona = {
    nombre: 'Nicolas',
    favoritos: [
      {
        id: 1, nombre: 'Need For Speed 2'
      },
      {
        id: 2, nombre: 'GTA Vice City'
      }
    ]

  }
  constructor() { }

  ngOnInit(): void {
  }
  guardar() {

  }

  agregarJuego() {
    if (this.nuevoJuego == '') {
      return;
    }
    const nuevoFavorito: Favorito =
    {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }
    this.persona.favoritos.push({ ...nuevoFavorito });
    this.nuevoJuego = '';
  }

  eliminar(index: number) {
    this.persona.favoritos.splice(index, 1);
  }
}
