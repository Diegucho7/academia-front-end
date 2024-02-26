import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaComponent } from './grafica/grafica.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PomesasComponent } from './pomesas/pomesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { AcademiasComponent } from './mantenimientos/academias/academias.component';
import { ProfesoresComponent } from './mantenimientos/profesores/profesores.component';
import { ProfesorComponent } from './mantenimientos/profesores/profesor.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { adminGuard } from '../guards/admin.guard';


const childRoutes: Routes = [
      {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
      {path: 'acount-settings', component: AccountSettingsComponent, data: {titulo: 'acount-settings'}},
      {path: 'buscar/:termino', component: BusquedaComponent, data: {titulo: 'busquedas'}},
      {path: 'grafica1', component: GraficaComponent, data: {titulo: 'Grafica'}},
      {path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}},
      {path: 'progress', component: ProgressComponent, data: {titulo: 'Progreso'}},
      {path: 'promesas', component: PomesasComponent, data: {titulo: 'Promesas'}},
      {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de usuario'}},
      
      
      //Mantenimientos
      {path: 'academias', component: AcademiasComponent, data: {titulo: 'Academias de la aplicación'}},
      {path: 'profesores', component: ProfesoresComponent   , data: {titulo: 'Porfesores de la aplicación'}},
      {path: 'profesor/:id', component: ProfesorComponent   , data: {titulo: 'Profesor de la aplicación'}},


      //Rutas de Admin
      {path: 'usuarios',canActivate: [adminGuard],component: UsuariosComponent, data: {titulo: 'Usuario de la aplicación'}},

]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
  
})
export class ChildRoutesModule { }
