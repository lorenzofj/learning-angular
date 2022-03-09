import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  errores(code: string): string{
    switch(code){
      //Email ya registrado
      case 'auth/email-already-in-use':
        return 'El email ya está en uso';

      //Email invalido
      case 'auth/invalid-email':
        return 'El email ingresado no es valido';

      //Contraseña debil
      case 'auth/weak-password':
        return 'La contraseña es debil';

      case 'auth/user-not-found':
        return 'Usuario invalido';

      case 'auth/wrong-password':
        return 'La contraseña no es correcta';

      default:
        return 'Error desconocido';
    }
  }
}
