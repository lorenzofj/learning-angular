import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { RespuestaQuizzService } from 'src/app/services/respuesta-quizz.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy {
  error = false;
  pin = '';
  errorText = '';
  loading = false;
  subscriptionCode : Subscription = new Subscription;

  constructor(private respuestaService : RespuestaQuizzService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptionCode.unsubscribe();
  }

  ingresar(){
    //Validar que el pin no esté vacio
    if(this.pin == ''){
      this.error = true;
      
      this.errorMensaje('Por favor ingrese un pin valido');
    }

    this.loading = true;

    /*this.subscriptionCode = this.respuestaService.searchByCode(this.pin).subscribe(
      data => {
        this.loading = false;
        if(data.empty) {
          this.errorMensaje('Por favor ingrese un pin valido');
        } else {
          data.forEach((element : any) => {
            const cuestionario: Cuestionario = {
              id: element.id,
              ...element.data()
            }
            this.respuestaService.cuestionario = cuestionario;
          });
        }
      }, error => {
        console.log(error);
        this.loading = false;
      }
    );*/
  }

  errorMensaje(text : string) {
    this.errorText = text;
    this.error = true;
    this.pin = '';

    setTimeout(() => {
      this.error = false;
    }, 4000);
  }

}
