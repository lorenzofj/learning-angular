import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, query, where, getDocs, doc, onSnapshot } from 'firebase/firestore';
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

  private db = getFirestore();

  constructor() { 
    
  }

  agregarPregunta(pregunta: Pregunta){
    this.pregunta$.next(pregunta);
  }

  getPreguntas(): Observable<Pregunta>{
    return this.pregunta$.asObservable();
  }

  crearCuestionario(cuestionario: Cuestionario): Promise<any>{
    const cuesRef = collection(this.db, 'cuestionario');
    return addDoc(cuesRef, cuestionario);
  }

  getCuestionarioByUserId(uid: string): Observable<any>{
    const cuestionarioRef = collection(this.db, 'cuestionario');
    const cuestionarioSnap = query(cuestionarioRef, where('uid', '==', uid));

    return onSnapshot(cuestionarioSnap, (docs) => {
      const listCuestionarios = [];
      docs.forEach((doc) => {
        listCuestionarios.push(doc.data());
      });
    }) as unknown as Observable<any>;
  }

  eliminarCuestionario(idCuestionario: string)/*: Promise<any>*/{
    //return const cuestionarioRef = collection(this.db, 'cuestionario').doc(idCuestionario).delete();
  }

  getCuestionario(id: string)/*: Observable<any>*/{
    //return const cuestionarioRef = collection(this.db, 'cuestionario').doc(id).get();
  }
}
