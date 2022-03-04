import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrarForm: FormGroup;

  constructor(private fb: FormBuilder,
              private afAuth: AngularFireAuth,
              private router: Router,
              private toastr: ToastrService) { 
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

    this.afAuth.createUserWithEmailAndPassword(email, password).then(
      rta => {
        this.toastr.success('El usuario fue registrado con exito', 'Usuario registrado');
        this.router.navigate(['/usuario']);
      }).catch(error => {
        this.toastr.error('Error', 'Opss ocurrio un error, inténtelo nuevamente');
      });
  }

}
