import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-crear-preguntas',
  templateUrl: './crear-preguntas.component.html',
  styleUrls: ['./crear-preguntas.component.css']
})
export class CrearPreguntasComponent implements OnInit {
  agregarPregunta: FormGroup;

  constructor(private _quizzService: QuizzService,
              private fb: FormBuilder){
      this.agregarPregunta = this.fb.group({
        titulo: ['', Validators.required],
        segundos: [10 , Validators.required],
        puntos: [50 , Validators.required],
        respuesta1: this.fb.group({
          titulo: ['', Validators.required],
          esCorrecta: [false, Validators.required]
        }),
        respuesta2: this.fb.group({
          titulo: ['', Validators.required],
          esCorrecta: [false, Validators.required]
        }),
        respuesta3: this.fb.group({
          titulo: '',
          esCorrecta: false
        }),
        respuesta4: this.fb.group({
          titulo: '',
          esCorrecta: false
        }),
    });
  }

  ngOnInit(): void {
  }

  get seg() { return this.agregarPregunta.get('segundos')?.value }
  get puntos() { return this.agregarPregunta.get('puntos')?.value }

  sumarRestarSegundos(numero: number) {
    if(this.seg <= 3) return;
    
    this.agregarPregunta.patchValue({
      segundos: this.seg + numero
    });
  }

  esCorrecta(index: string){
    let stringRta = "respuesta";
    let nroRespuesta = stringRta.concat(index);
    this.setFalseRespuesta(nroRespuesta);

    const estadoRta = this.obtenerEstadoRespuesta(nroRespuesta);

    this.agregarPregunta.get(nroRespuesta)?.patchValue({
      esCorrecta: !estadoRta
    });
  }

  setFalseRespuesta(nroRespuestas: string){
    const array = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4'];

    //Recorremos el array y seteamos todas las respuestas en false menos la que el usuario selecciono
    for (let i = 0; i < array.length; i++) {
      if(array[i] !== nroRespuestas){
        this.agregarPregunta.get(array[i])?.patchValue({
          esCorrecta: false
        });
      }
      
    }
  }

  obtenerEstadoRespuesta(nroRespuesta: string): boolean {
    return this.agregarPregunta.get(nroRespuesta)?.get('esCorrecta')?.value;
  }

  agregarPreg(){
    console.log(this.agregarPregunta);
  }

}
