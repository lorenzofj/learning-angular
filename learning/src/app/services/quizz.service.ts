import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Pregunta } from '../models/Pregunta';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  tituloCuestionario: String = '';
  descripcionCuestionario: String = '';
  private pregunta$ = new Subject<Pregunta>();

  constructor() { }

  agregarPregunta(pregunta: Pregunta){
    this.pregunta$.next(pregunta);
  }

  getPreguntas(): Observable<Pregunta>{
    return this.pregunta$.asObservable();
  }
}
