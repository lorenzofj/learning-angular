import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RespuestaQuizzService } from 'src/app/services/respuesta-quizz.service';

@Component({
  selector: 'app-respuesta-usuario',
  templateUrl: './respuesta-usuario.component.html',
  styleUrls: ['./respuesta-usuario.component.css']
})
export class RespuestaUsuarioComponent implements OnInit {

  id: string;
  loading = false;
  respuestaCuestionario: any;

  constructor(private _respuestaUsuarioService: RespuestaQuizzService,
              private aRoute: ActivatedRoute){
    this.id = this.aRoute.snapshot.paramMap.get('id')!;
              }

  ngOnInit(): void {
    this.obtenerRespuestaUsuario();
  }

  obtenerRespuestaUsuario() {
    this.loading = true;
    /*this._respuestaUsuarioService.getRespuestaUsuario(this.id).subscribe(
      doc => {
        console.log(doc.data());
        this.respuestaCuestionario = doc.data();
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
      });*/
  }

}
