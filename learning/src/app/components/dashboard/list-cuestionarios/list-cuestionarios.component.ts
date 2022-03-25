import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-list-cuestionarios',
  templateUrl: './list-cuestionarios.component.html',
  styleUrls: ['./list-cuestionarios.component.css']
})
export class ListCuestionariosComponent implements OnInit, OnDestroy {
  suscriptionUser: Subscription = new Subscription();
  suscriptionQuizz: Subscription = new Subscription();
  listCuestionarios: Cuestionario[] = [];
  loading = false;

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private _quizzService: QuizzService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loading = true;
    this.suscriptionUser = this.afAuth.user.subscribe(user => {
      if(user && user.emailVerified){
        this.getCuestionarios(user.uid);
      }
      else{
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    this.suscriptionUser.unsubscribe();
    this.suscriptionQuizz.unsubscribe();
  }

  getCuestionarios(uid: string){
    this.suscriptionQuizz == this._quizzService.getCuestionarioByUserId(uid).subscribe(data => {
      this.listCuestionarios = [];
      this.loading = false;
      data.foreach((doc: Cuestionario) => {
        this.listCuestionarios.push(doc);
      })
    }, error => {
      console.log(error);
      this.toastr.error('Oppss... ocurrio un error', 'Error');
      this.loading = false;
    });
  }

  eliminarCuestionario(id: string){
    this.loading = true;
    this._quizzService.eliminarCuestionario(id)/*.then(data => {
      this.toastr.error('El cuestionario fue eliminado con exito', 'Cuestionario eliminado');
      this.loading = false;
    }).catch(() => {
      this.loading = false;
      this.toastr.error('Oppss... ocurrio un error', 'Error');
    });*/
  }

}
