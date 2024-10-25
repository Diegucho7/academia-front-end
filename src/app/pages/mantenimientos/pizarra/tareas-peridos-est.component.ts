import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Observable, Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';
import { NotaService } from '../../../services/nota.service';
import { Nota } from '../../../models/nota.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { PizarraService } from '../../../services/pizarra.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pizarra } from '../../../models/pizarra.model';
import { Periodo } from '../../../models/periodo.model';

@Component({
  selector: 'app-tareas-peridos-est',
  templateUrl: './tareas-peridos-est.component.html',
  styles: ``
})
export class TareasPeridosEstComponent implements OnInit {
  ngOnInit(): void {
    
    this.activateRoute.params
    .subscribe( ({id}) => 
    {this.cargarTareas(id)});
  }
  public cursos: Pizarra[] = [];
  public uid: string = ''
  public periodo: Periodo[]= [];
  public periodosTemp: Pizarra[]= [];
  
  public nota: Nota[] = [];
  public cargando: boolean = true;
  private imgSubs?: Subscription;


  private tareas : any[] = [];

  
  constructor(usuarioService:UsuarioService,
    private pizarraService: PizarraService,
    private router : Router,
    private activateRoute:ActivatedRoute

) {
  this.uid = usuarioService.uid
}



cargarTareas(id:string){
  this.cargando = true;
  this.pizarraService.obtenerPizarraPorPeriodo(id)
                      .subscribe( resp =>{
                        this.cargando = false;
                       this.cursos = resp; 

                      //  this.cursos   = resp;
                       this.periodosTemp = resp;
                       this.cargando = false;

                      })
}


// borrarTarea(tarea:Pizarra):any{
   

//     Swal.fire({
//       title: "¿Borrar tarea?",
//       text: `Esta a punto de eliminar la tarea con el asunto ${tarea.asunto } de la fecha ${tarea.fecha }`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Si, eliminar tarea"
//     }).then((result) => {
//       if (result.value) {
//         this.pizarraService.borrarPizarra(tarea._id)
//         .subscribe(resp => {
//           this.cargarTareas(this.activateRoute.snapshot.params['id']);
//           Swal.fire('Tarea borrada',
//                     `${tarea.asunto} fue eliminado correctamente`,
//                     'success'
//             )

//             }
//           );
        
//       }
      
//     });
//   }
}
