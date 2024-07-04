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
import { CursosComponent } from './mantenimientos/cursos/cursos.component';
import { MateriaComponent } from './mantenimientos/materias/materia.component';
import { MateriasComponent } from './mantenimientos/materias/materias.component';
import { NotasComponent } from './mantenimientos/notas/notas.component';
import { ResultadosComponent } from './mantenimientos/resultados/resultados.component';
import { EstudiantesComponent } from './mantenimientos/estudiantes/estudiantes.component';
import { EstudianteComponent } from './mantenimientos/estudiantes/estudiante.component';
import { CursoComponent } from './mantenimientos/cursos/curso.component';
import { PeriodosComponent } from './mantenimientos/periodos/periodos.component';
import { PeriodoComponent } from './mantenimientos/periodos/periodo.component';
import { RevisoComponent } from './mantenimientos/notas/reviso.component';
import { RevisionComponent } from './mantenimientos/revision/revision.component';


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
      {path: 'estudiantes', component: EstudiantesComponent   , data: {titulo: 'Cursos de la aplicación'}},
      {path: 'estudiante/:id', component: EstudianteComponent   , data: {titulo: 'Estudiante de la aplicación'}},
      {path: 'profesor/:id', component: ProfesorComponent   , data: {titulo: 'Profesor de la aplicación'}},


      //Rutas de Admin
      {path: 'usuarios',canActivate: [adminGuard],component: UsuariosComponent, data: {titulo: 'Usuario de la aplicación'}},
      {path: 'cursos',canActivate: [adminGuard],component: CursosComponent, data: {titulo: 'Cursos de la aplicación'}},
      {path: 'curso/:id',canActivate: [adminGuard],component: CursoComponent, data: {titulo: 'Curso de la aplicación'}},
      {path: 'materias',canActivate: [adminGuard],component: MateriasComponent, data: {titulo: 'Materias de la aplicación'}},
      {path: 'materia/:id',canActivate: [adminGuard],component: MateriaComponent, data: {titulo: 'Materia de la aplicación'}},
      {path: 'notas',canActivate: [adminGuard],component: NotasComponent, data: {titulo: 'Notas de la aplicación'}},
      {path: 'notas/:id',canActivate: [adminGuard],component: NotasComponent, data: {titulo: 'Notas de la aplicación'}},
      // {path: 'respaldo',canActivate: [adminGuard],component: RespladoComponent, data: {titulo: 'Notas de la aplicación'}},
      {path: 'resultados',canActivate: [adminGuard],component: ResultadosComponent, data: {titulo: 'Resultados de la aplicación'}},
      {path: 'periodos',canActivate: [adminGuard],component: PeriodosComponent, data: {titulo: 'Periodos de la aplicación'}},
      {path: 'periodo/:id',canActivate: [adminGuard],component: PeriodoComponent, data: {titulo: 'Periodos de la aplicación'}},
      {path: 'revision',canActivate: [adminGuard],component: RevisionComponent, data: {titulo: 'Periodos de la aplicación'}},
      {path: 'reviso/:id',canActivate: [adminGuard],component: RevisoComponent, data: {titulo: 'Periodos de la aplicación'}},

      //Rutas Admin : Materias y Cursos
]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
  
})
export class ChildRoutesModule { }
