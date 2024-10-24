import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxjsComponent } from './rxjs/rxjs.component';
// import { NgChartsModule } from 'ng2-charts' ;

import { ComponentsModule } from '../components/components.module';
import { SharedModule } from "../shared/shared.module";

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaComponent } from './grafica/grafica.component';
import { PagesComponent } from './pages.component';
import { DonaComponent } from '../components/dona/dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PomesasComponent } from './pomesas/pomesas.component';
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
import { RevisoComponent } from './mantenimientos/notas/reviso.component';
import { PagosComponent } from './mantenimientos/pagos/pagos.component';
import { RecibosComponent } from './mantenimientos/recibos/recibos.component';
import { ReciboComponent } from './mantenimientos/recibos/recibo.component';
import { NotasEstudinateComponent } from './mantenimientos/revision/notas-estudinate.component';
import { NotasCursosComponent } from './mantenimientos/notas/notas-cursos.component';
import { PagosEstudianteComponent } from './mantenimientos/pagos-id/pagos-estudiante.component';
import { PagosEstudianteCursosComponent } from './mantenimientos/pagos-id/pagos-estudiante-cursos.component';
import { PagosIdComponent } from './mantenimientos/pagos/pagos-id.component';
import { PizarraComponent } from './mantenimientos/pizarra/pizarra.component';


import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { ChatService } from '../services/chat.service';
import { ChatComponent } from './mantenimientos/chat/chat.component';
import { ChatsComponent } from '../components/chats/chats.component';
import { environment } from '../../environments/environment';
import { TareasComponent } from './mantenimientos/pizarra/tareas.component';


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
        RevisoComponent,
        PagosComponent,
        PagosIdComponent,
        RecibosComponent,
        ReciboComponent,
        NotasEstudinateComponent,
        NotasCursosComponent,
        PagosEstudianteComponent,
        PagosEstudianteCursosComponent,
        PizarraComponent,
        ChatComponent,
        TareasComponent,
        
        
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        GraficaComponent,
        PagesComponent,
        // DonaComponent,
        AccountSettingsComponent
    ],
    imports: [
        // NgChartsModule, //Modulos de Graficos
        CommonModule,
        RouterOutlet,
        ReactiveFormsModule,


        ComponentsModule,


        PipesModule,
        FormsModule,
        SharedModule,
        RouterLink,
        AngularFireModule.initializeApp(environment.firebase),
    ],
    providers: [AngularFirestore, ChatService],
//   bootstrap: [AppComponent]

})
export class PagesModule { }