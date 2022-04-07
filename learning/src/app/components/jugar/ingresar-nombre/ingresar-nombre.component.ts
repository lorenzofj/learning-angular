import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestaQuizzService } from 'src/app/services/respuesta-quizz.service';

@Component({
  selector: 'app-ingresar-nombre',
  templateUrl: './ingresar-nombre.component.html',
  styleUrls: ['./ingresar-nombre.component.css']
})
export class IngresarNombreComponent implements OnInit {

  nombre = '';
  errorText = '';
  error = false;

  constructor(private respuestaQuizzService: RespuestaQuizzService,
              private router: Router) { }

  ngOnInit(): void {
    this.validarReffresh();
  }

  ingresarNombre(){
    if(this.nombre === ''){
      this.errorMensaje('Ingrese su nombre');
      return;
    }

    this.respuestaQuizzService.nombreParticipante = this.nombre;
    this.router.navigate(['/jugar/iniciarContador']);
  }

  validarReffresh() {
    if(this.respuestaQuizzService.cuestionario === undefined){
      this.router.navigate(['/']);
    }
  }

  errorMensaje(text : string) {
    this.errorText = text;
    this.error = true;

    setTimeout(() => {
      this.error = false;
    }, 4000);
  }

}
