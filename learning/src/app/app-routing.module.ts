import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'usuario', loadChildren: () => import('./components/usuario/usuario.module').then(m => m.UsuarioModule)},
  {path: 'dashboard', component: DashboardComponent, loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/', pathMatch: 'full'},
    //Si la ruta especificada no coincide con ninguna se redirecciona al index
  {path: 'jugar', loadChildren: () => import('./components/jugar/jugar.module').then(m => m.JugarModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
