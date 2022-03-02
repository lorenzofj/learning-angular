import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'usuario', loadChildren: () => import('./components/usuario/usuario.module').then(m => m.UsuarioModule)},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
  //Si la ruta especificada no coincide con ninguna se redirecciona al index
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
