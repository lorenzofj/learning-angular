import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {
  recuperarForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
              private afAuth: AngularFireAuth,
              private router: Router,
              private toastr: ToastrService,
              private _errorService: ErrorService) { 
    this.recuperarForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  recuperarPassword(){
    const email = this.recuperarForm.get('usuario')?.value;

    this.loading = true;

    this.afAuth.sendPasswordResetEmail(email).then(() =>{
      this.toastr.info('Le hemos enviado un email para restablecer su contraseña', 'Restablecer contraseña');
      this.router.navigate(['/usuario']);
    }).catch(error =>{
      this.loading = false;
      this.toastr.error(this._errorService.errores(error.code), 'Error');
      this.recuperarForm.reset();
    });
  }
}
