import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { Observable, Subject } from 'rxjs';
import { Cuestionario } from '../models/Cuestionario';
import { Pregunta } from '../models/Pregunta';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  tituloCuestionario: string = '';
  descripcionCuestionario: string = '';
  private pregunta$ = new Subject<Pregunta>();

  constructor(private _firestone: Firestore) { 
    this._firestone = getFirestore();
  }

  agregarPregunta(pregunta: Pregunta){
    this.pregunta$.next(pregunta);
  }

  getPreguntas(): Observable<Pregunta>{
    return this.pregunta$.asObservable();
  }

  crearCuestionario(cuestionario: Cuestionario): Promise<any>{
    const cuesRef = collection(this._firestone, 'cuestionario');
    return addDoc(cuesRef, cuestionario);
  }
}
