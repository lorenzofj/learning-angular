import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrarForm: FormGroup;

  constructor(private fb: FormBuilder) { 
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

  }

}
