import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrarForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
              private afAuth: AngularFireAuth,
              private router: Router,
              private toastr: ToastrService,
              private _errorService: ErrorService) { 
    this.registrarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['']
    }, {validator: this.checkPassword});
  }

  ngOnInit(): void {
  }

  checkPassword(group: FormGroup): any{
    const pass = group.controls['password']?.value;
    const confirmPass = group.controls['repetirPassword']?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  registrarUsuario(){
    const email = this.registrarForm.get('email')?.value;
    const password = this.registrarForm.get('password')?.value;

    this.loading = true;

    this.afAuth.createUserWithEmailAndPassword(email, password).then(
      rta => {
        rta.user?.sendEmailVerification();
        this.toastr.success('Ha sido enviado un email para verificar su cuenta!', 'Usuario registrado');
        this.router.navigate(['/usuario']);
      }).catch(error => {
        this.registrarForm.reset();
        this.loading = false;
        this.toastr.error(this._errorService.errores(error.code), 'Opss ocurrio un error, inténtelo nuevamente');
      });
  }

  /* errorRegistro(code: string): string{
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

      default:
        return 'Error desconocido';
    } 
  } */

}
