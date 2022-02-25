import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nombre = 'Francisco';

  constructor(){
    setInterval(() => this.nombre = 'Martín', 3000);
  }

  getSuma(num1:number, num2:number){
    return num1 + num2;
  }
}
