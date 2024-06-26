import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ComponentsModule } from '../components/components.module';
import { SharedModule } from "../shared/shared.module";

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaComponent } from './grafica/grafica.component';
import { PagesComponent } from './pages.component';
import { NgChartsModule } from 'ng2-charts';
import { DonaComponent } from '../components/dona/dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PomesasComponent } from './pomesas/pomesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { AcademiasComponent } from './mantenimientos/academias/academias.component';
import { ProfesoresComponent } from './mantenimientos/profesores/profesores.component';
import { CursosComponent } from './mantenimientos/cursos/cursos.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfesorComponent } from './mantenimientos/profesores/profesor.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MateriaComponent } from './mantenimientos/materias/materia.component';
import { MateriasComponent } from './mantenimientos/materias/materias.component';
import { NotasComponent } from './mantenimientos/notas/notas.component';
import { ResultadosComponent } from './mantenimientos/resultados/resultados.component';
import { EstudiantesComponent } from './mantenimientos/estudiantes/estudiantes.component';
import { EstudianteComponent } from './mantenimientos/estudiantes/estudiante.component';
import { CursoComponent } from './mantenimientos/cursos/curso.component';
import { PeriodosComponent } from './mantenimientos/periodos/periodos.component';
import { PeriodoComponent } from './mantenimientos/periodos/periodo.component';
import { RespladoComponent } from './mantenimientos/notas/respaldo.component';


@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        GraficaComponent,
        PagesComponent,
        AccountSettingsComponent,
        PomesasComponent,
        RxjsComponent,
        PerfilComponent,
        UsuariosComponent,
        AcademiasComponent,
        ProfesoresComponent,
        ProfesorComponent,
        BusquedaComponent,
        CursosComponent,
        MateriaComponent,
        MateriasComponent,
        NotasComponent,
        ResultadosComponent,
        EstudiantesComponent,
        EstudianteComponent,
        CursoComponent,
        PeriodosComponent,
        PeriodoComponent,
        RespladoComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        GraficaComponent,
        PagesComponent,
        DonaComponent,
        AccountSettingsComponent
    ],
    imports: [
        CommonModule,
        RouterOutlet,
        NgChartsModule, //Modulos de Graficos
        ReactiveFormsModule,




        PipesModule,
        FormsModule,
        SharedModule,
        ComponentsModule,
        RouterLink
    ]
})
export class PagesModule { }
