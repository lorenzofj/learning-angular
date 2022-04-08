import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, getFirestore, query, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Cuestionario } from '../models/Cuestionario';

@Injectable({
  providedIn: 'root'
})
export class RespuestaQuizzService {

  private db = getFirestore();
  cuestionario!: Cuestionario;
  nombreParticipante = '';

  constructor() { }

  searchByCode(code : string) /*: Observable<any>*/ {
    const cuesRef = collection(this.db, "cuestionarios");
    const cuestionarioSnap = query(cuesRef, where('codigo', '==', code));
    return;
  }

  setRespuestaUsuario(respuestaUsuario : any): Promise<any> {
    const respuestaRef = collection(this.db, "respuestas");
    return addDoc(respuestaRef, respuestaUsuario);
  }

  getRespuestaUsuario(id : string)/*: Observable<any>*/ {
    /*const respuestaRef = collection(this.db, "respuestas");
    const respuestaSnap = query(respuestaRef, where('id', '==', id));
    return respuestaSnap;*/
  }

  getRespuestaByIdCuestionario(id: string)/*: Observable<any>*/ {
    const respuestaRef = collection(this.db, "respuestas");
    const respuestaSnap = query(respuestaRef, where('idCuestionario', '==', id));
    return respuestaSnap;
  }

  deleteRespuestaUsuario(id: string)/*: Promise<any>*/ {
    /*const respuestaRef = collection(this.db, "respuestas");
    return deleteDoc(respuestaSnap);*/
  }
}
