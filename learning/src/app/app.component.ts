import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nombre = 'Francisco';
  textoPlaceHolder = 'escriba algo aqui...';
  deshabilitado = true;
  //imgSrc = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhorus.com.uy%2Fimg%2Ftechnologies%2Fangular.png&f=1&nofb=1";
  textoEventBinding = 'prueba event binding';
  textoTwoWayDataBinding = '';
  listaEstudiantes: any[] = [
    {nombre: 'Tomas', estado: 'Regular'},
    {nombre: 'Matias', estado: 'Reprobado'},
    {nombre: 'Juan', estado: 'Ausente'}
  ]

  constructor(){
    setInterval(() => this.nombre = 'Martín', 3000);
    setInterval(() => this.deshabilitado = false, 3000);
  }

  getSuma(num1:number, num2:number){
    return num1 + num2;
  }

  cambiarTexto(): void{
    this.textoEventBinding = 'Este cambio es producido por event binding';
  }
}
