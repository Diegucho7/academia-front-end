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
import { adminGuard, contadorGuard, estudianteGuard, profeGuard, reciboGuard, revisionGuard } from '../guards/admin.guard';
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
import { PagosComponent } from './mantenimientos/pagos/pagos.component';
import { PagosIdComponent } from './mantenimientos/pagos-id/pagos-id.component';
import { RecibosComponent } from './mantenimientos/recibos/recibos.component';
import { ReciboComponent } from './mantenimientos/recibos/recibo.component';
import { NotasEstudinateComponent } from './mantenimientos/revision/notas-estudinate.component';
import { NotasCursosComponent } from './mantenimientos/notas/notas-cursos.component';


const childRoutes: Routes = [
      {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
      {path: 'acount-settings', component: AccountSettingsComponent, data: {titulo: 'acount-settings'}},
      {path: 'buscar/:termino', component: BusquedaComponent, data: {titulo: 'busquedas'}},
      // {path: 'grafica1', component: GraficaComponent, data: {titulo: 'Grafica'}},
      // {path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}},
      // {path: 'progress', component: ProgressComponent, data: {titulo: 'Progreso'}},
      // {path: 'promesas', component: PomesasComponent, data: {titulo: 'Promesas'}},
      {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de usuario'}},
      
      
      //Mantenimientos
      {path: 'estudiantes', component: EstudiantesComponent   , data: {titulo: 'Cursos de la aplicación'}},
      {path: 'estudiante/:id', component: EstudianteComponent   , data: {titulo: 'Estudiante de la aplicación'}},
      
      
      //Rutas solo de Administrador
      {path: 'usuarios',canActivate: [adminGuard],component: UsuariosComponent, data: {titulo: 'Usuario de la aplicación'}},
      
      {path: 'academias',canActivate: [adminGuard], component: AcademiasComponent, data: {titulo: 'Academias de la aplicación'}},
      {path: 'cursos',canActivate: [adminGuard],component: CursosComponent, data: {titulo: 'Cursos de la aplicación'}},
      {path: 'curso/:id',canActivate: [adminGuard],component: CursoComponent, data: {titulo: 'Curso de la aplicación'}},
      
      
      {path: 'resultados',canActivate: [adminGuard],component: ResultadosComponent, data: {titulo: 'Resultados de la aplicación'}},
      {path: 'periodos',canActivate: [adminGuard],component: PeriodosComponent, data: {titulo: 'Periodos de la aplicación'}},
      {path: 'periodo/:id',canActivate: [adminGuard],component: PeriodoComponent, data: {titulo: 'Periodos de la aplicación'}},
      
      
      // Rutas del Profesor
      
      {path: 'profesores',canActivate:[profeGuard], component: ProfesoresComponent   , data: {titulo: 'Porfesores de la aplicación'}},
      {path: 'profesor/:id',canActivate:[profeGuard], component: ProfesorComponent   , data: {titulo: 'Profesor de la aplicación'}},
      // {path: 'materias',component: MateriasComponent, data: {titulo: 'Materias de la aplicación'}},
      // {path: 'materia/:id',component: MateriaComponent, data: {titulo: 'Materia de la aplicación'}},
      
      
      
      
      
      // RUTAS DE PROFESOR, ESTUDIANTE - ADMINISTRADOR
      {path: 'revision',canActivate: [revisionGuard],component: RevisionComponent, data: {titulo: 'Notas de la aplicación'}},
      {path: 'reviso/:id',canActivate: [revisionGuard],component: RevisoComponent, data: {titulo: 'Notas de la aplicación'}},
      
      
      //Ruta estudiantes - Administrador
      
      {path: 'notas',canActivate:[profeGuard],component: NotasComponent, data: {titulo: 'Notas de la aplicación'}},
      {path: 'notas/:id',canActivate:[profeGuard],component: NotasComponent, data: {titulo: 'Notas de la aplicación'}},
      
      
      {path: 'notas-estudiante',canActivate:[estudianteGuard],component: NotasEstudinateComponent, data: {titulo: 'Notas de la aplicación'}},
      {path: 'notas-curso',canActivate:[estudianteGuard],component: NotasCursosComponent, data: {titulo: 'Notas del estudiante'}},
      // {path: 'notas-estudiante/:id',canActivate:[estudianteGuard],component: NotasComponent, data: {titulo: 'Notas de la aplicación'}},
      


      
      // Rutas del Contador - ADMINISTRADOR
      {path: 'pagos',canActivate: [contadorGuard],component: PagosComponent, data: {titulo: 'Pagos de la aplicación'}},
      {path: 'pagos/:id',canActivate: [contadorGuard],component: PagosIdComponent, data: {titulo: 'Pagos de la aplicación'}},
      
      
      // RUTAS DE PROFESOR, ESTUDIANTE Y ADMINISTRADOR
      {path: 'recibos',canActivate: [reciboGuard],component: RecibosComponent, data: {titulo: 'Pagos de la aplicación'}},
      {path: 'recibo/:id',canActivate: [reciboGuard],component: ReciboComponent, data: {titulo: 'Pagos de la aplicación'}},
]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
  
})
export class ChildRoutesModule { }
