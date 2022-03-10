import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
              private afAuth: AngularFireAuth,
              private _errorService: ErrorService,
              private toastr: ToastrService,
              private router: Router) { //inyeccion de dependencia en el constructor
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  } 

  ngOnInit(): void {
  }

  login(){
    const usuario = this.loginForm.get('usuario')?.value;
    const password = this.loginForm.get('password')?.value;

    this.loading = true;

    this.afAuth.signInWithEmailAndPassword(usuario, password).then((response) => {
      this.loading = false;
      if(!response.user?.emailVerified){
        //Si el email no está verificado
        this.router.navigate(['/usuario/verificarEmail']);
      }
      else{
        //Si el email está verificado
        
      }
    }, error => {
      this.loading = false;
      this.toastr.error(this._errorService.errores(error.code), 'Error');
      this.loginForm.reset();
    });
  }

}
