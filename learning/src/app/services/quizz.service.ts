import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  tituloCuestionario: String = '';
  descripcionCuestionario: String = '';

  constructor() { }
}
