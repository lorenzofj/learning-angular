import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { RespuestaQuizzService } from 'src/app/services/respuesta-quizz.service';

@Component({
  selector: 'app-realizar-quizz',
  templateUrl: './realizar-quizz.component.html',
  styleUrls: ['./realizar-quizz.component.css']
})
export class RealizarQuizzComponent implements OnInit, OnDestroy {

  cuestionario!: Cuestionario;
  nombreParticipante = '';
  indexPregunta = 0;
  segundos = 0;
  setInterval: any;
  loading = false;

  //Respuestas
  opcionSeleccionada: any;
  indexSeleccionado: any;
  cantidadCorrectas = 0;
  cantidadIncorrectas = 0;
  puntosTotales = 0;
  listRespuestasUsuario: any[] = [];

  constructor(private _respuestaQuizzService: RespuestaQuizzService,
              private router: Router) { }

  ngOnInit(): void {
    this.cuestionario = this._respuestaQuizzService.cuestionario;
    this.nombreParticipante = this._respuestaQuizzService.nombreParticipante;
    this.validateRefresh();
    this.iniciarContador();
  }

  ngOnDestroy(): void {
    clearInterval(this.setInterval);
  }

  validateRefresh() {
    if(this.cuestionario === undefined){
      this.router.navigate(['/']);
    }
  }

  obtenerSegundos(): number {
    return this.segundos;
  }

  obtenerTitulo(): string {
    return this.cuestionario.listPreguntas[this.indexPregunta].titulo;
  }

  iniciarContador() {
    this.segundos = this.cuestionario.listPreguntas[this.indexPregunta].segundos;

    this.setInterval = setInterval(() => {
      if(this.segundos === 0){
        this.agregarRespuesta();
      }
      this.segundos = this.segundos - 1;
    }, 1000);
  }

  respuestaSeleccionada(respuesta: any, index: number) {
    this.opcionSeleccionada = respuesta;
    this.indexSeleccionado = index;
  }

  addClassOption(respuesta: any): string {
    if(respuesta === this.opcionSeleccionada){
      return 'classSeleccionada';
    } 

    return '';
  }

  siguientePregunta() {
    clearInterval(this.setInterval);
    this.agregarRespuesta();
    this.iniciarContador();

  }

  agregarRespuesta() {
    //Incrementar contadores (correcta e incorrecta)
    this.contadorCorrectaIncorrecta()

    //Creacion objeto respuesta y se agrega al array
    const respuestaUsuario: any = {
      titulo: this.cuestionario.listPreguntas[this.indexPregunta].titulo,
      puntosObtenidos: this.obtenerPuntosPregunta(),
      segundos: this.obtenerSegundosRespondidos(),
      indexRespuestaSeleccionada: this.obtenerIndexSeleccionado(),
      listRespuestas: this.cuestionario.listPreguntas[this.indexPregunta].listaRespuestas
    }

    this.listRespuestasUsuario.push(respuestaUsuario);
    this.opcionSeleccionada = undefined;
    this.indexSeleccionado = undefined;

    //validar ultima pregunta
    if(this.cuestionario.listPreguntas.length - 1 === this.indexPregunta){
      //guardar respuestas en firebase
      this.guargarRespuestaCuestionario();
    } else {
      this.indexPregunta++;
      this.segundos = this.cuestionario.listPreguntas[this.indexPregunta].segundos;
    }
  }

  obtenerPuntosPregunta(): number {
    //usuario no selecciono ninguna pregunta
    if(this.opcionSeleccionada === undefined){
      return 0;
    }

    const puntosPreguntas = this.cuestionario.listPreguntas[this.indexPregunta].puntos;

    //validar si la pregunta es correcta
    if(this.opcionSeleccionada.esCorrecta == true){
      this.puntosTotales = this.puntosTotales + puntosPreguntas;
      return puntosPreguntas;
    } else {
      return 0;
    }
  }

  obtenerSegundosRespondidos(): string{
    //usuario no respondio la pregunta
    if(this.opcionSeleccionada === undefined){
      return 'Usuario no respondio';
    } else {
      const segundosPregunta = this.cuestionario.listPreguntas[this.indexPregunta].segundos;
      const segundosRespondidos = segundosPregunta - this.segundos;

      return segundosRespondidos.toString();
    }
  }

  obtenerIndexSeleccionado(): any {
    if(this.opcionSeleccionada === undefined){
      return '';
    } else {
      return this.indexSeleccionado;
    }
  }

  contadorCorrectaIncorrecta() {
    //Usuario selecciono una respuesta
    if(this.opcionSeleccionada === undefined){
      this.cantidadIncorrectas++;
      return;
    }

    //Opcion es incorrecta?
    if(this.opcionSeleccionada.esCorrecta === false){
      this.cantidadIncorrectas++;
    } else {
      this.cantidadCorrectas++;
    }
  }

  guargarRespuestaCuestionario() {
    const respuestaCuestionario: any = {
      idCuestionario: this.cuestionario.id,
      nombreParticipante: this.nombreParticipante,
      fecha: new Date(),
      cantidadPreguntas: this.cuestionario.cantPreguntas,
      cantidadCorrectas: this.cantidadCorrectas,
      cantidadIncorrectas: this.cantidadIncorrectas,
      puntosTotales: this.puntosTotales,
      listRespuestaUsuario: this.listRespuestasUsuario
    }

    this.loading = true;

    //Guardar la respuesta en la bd
    this._respuestaQuizzService.setRespuestaUsuario(respuestaCuestionario).then(
      data => {
        //redireccionar al proximo componente
        this.router.navigate(['/jugar/respuestaUsuario', data.id]);
      }, error => {
        console.log(error);
        this.router.navigate(['/']);
      });
  }

}
