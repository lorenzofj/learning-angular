import { Injectable } from '@angular/core';
import { collection, getFirestore, query, where } from 'firebase/firestore';
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
}
