
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { CursoService } from '../../../services/curso.service';
import { MateriaService } from '../../../services/materia.service';
import { Curso } from '../../../models/curso.model';
import { Materia } from '../../../models/materia.model';
import { PeriodoService } from '../../../services/periodo.service';
import { Academia } from '../../../models/academia.model';
import { AcademiaService } from '../../../services/academia.service';
import { Periodo } from '../../../models/periodo.model';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';


@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styles: ``
})

export class PeriodoComponent implements OnInit {
  public cursos: Curso[] = [];
  public materias: Materia[] = [];
  public usuarios: Usuario[] = [];
  public academias : Academia[] = [];
  public materiaSeleccionada?: Materia;
  public academiaSeleccionada?: Academia;
  public usuariosTemp:Usuario[] =  [];
  public periodoForm!: FormGroup;
  public usuariosProfesor: Usuario[] = [];
  public periodoSeleccionado?: Periodo;
  public cargando: boolean = true;
  public totalUsuarios:number = 0;
  public desde: number = 0;
  public role: string = "PROFESOR_ROLE";

  public cursoSeleccionado?: Curso;

  yearsRange: number[] = [];
//indicamos valores del rango, inicio y final
public inicio = 2024
public final = 2050
//generamos array con los valores
public years = Array(this.final - this.inicio + 1).fill(0).map((_, i) => this.inicio + i);
public meses =[
  {id:'1',name:'enero'},
{id:'2',name:'febrero'},
{id:'3',name:'marzo'},
{id:'4',name:'abril'},
{id:'5',name:'mayo'},
{id:'6',name:'junio'},
{id:'7',name:'julio'},
{id:'8',name:'agosto'},
{id:'9',name:'septiembre'},
{id:'10',name:'octubre'},
{id:'11',name:'noviembre'},
{id:'12',name:'diciembre'},
]
  constructor(
            private fb: FormBuilder,
            private cursoService: CursoService,
           
            private periodoService:PeriodoService,
            private academiaService:AcademiaService,
            private usuarioService: UsuarioService,
            private router: Router,
            private activateRoute:ActivatedRoute

            
  ){
    const startYear = 2024;
    const endYear = 2035;
    this.yearsRange = Array.from({length: endYear - startYear + 1}, (value, index) => startYear + index);


  }
  ngOnInit(): void {

    this.activateRoute.params
    .subscribe( ({id}) => 
    {this.cargarPeriodo(id)});


this.periodoForm = this.fb.group({
  anio: ['', Validators.required],
  mes: ['', Validators.required],
  academia: ['', Validators.required],
  profesor: ['', Validators.required],
  curso: ['', Validators.required],
  modulos: ['', Validators.required],
  valor: ['', Validators.required],
})
    this.CargarUsuarios();
    
    this.cargarCurso();

    this.cargarAcademias();
    this.periodoForm.get('academia')?.valueChanges.
                                    subscribe( AcademiaId =>{
                                      this.academiaSeleccionada = this.academias.find(h => h._id === AcademiaId)
                                    })
                               
  }

  

  CargarUsuarios(){
    
    this.cargando = true;
    this.usuarioService.cargarUsuariosProfesor(this.desde)
    .subscribe(({total, usuarios})=>{
      this.totalUsuarios = total;

        
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
        
    })
  }

  cargarPeriodo(id:string){

    if (id === 'nuevo') {
      return;
    }
    

    this.periodoService.obtenerPeriodoPorId(id)
    
                              .pipe(
                                delay(100)
                              )
                              .subscribe( (periodo:any) => {   
                                  const { anio,mes, profesor, academia, curso,modulos, valor} = periodo
                                  this.periodoSeleccionado = periodo
                                  this.periodoForm.setValue( { anio: anio, mes: mes , academia: academia._id, profesor: profesor._id, curso: curso._id, modulos: modulos, valor: valor} )
                                  console.log(periodo  )
                              }, error => {
                                return this.router.navigateByUrl(`/dashboard/periodos`);
                              })
  }

  
  
  
  cargarAcademias(){
    this.academiaService.cargarAcademias()
                        .subscribe((academias:Academia[]) =>{
                          this.academias = academias;
                        })
  }
  

  cargarCurso(){
    

    this.cursoService.cargarCursos()
                        .subscribe((cursos:Curso[]) =>{
                          this.cursos = cursos;
                        })
  }


  guardarPeriodo(){
    const {anio,mes} =this.periodoForm.value;
    
    if (this.periodoSeleccionado) {
      //Actualizar
      const data = {
        ...this.periodoForm.value,
        _id:this.periodoSeleccionado._id
      } 
      this.periodoService.actualizarPeriodo(data)
      .subscribe(resp=>{
        console.log(resp )
        Swal.fire('Actualizado el Periodo',`${anio}`+' del mes '+ `${mes} actualizado correctamente`, 'success');
      })
    }else{

    const {periodo} =this.periodoForm.value;
    this.periodoService.crearPeriodo(this.periodoForm.value)
    .subscribe((resp:any) =>{
      Swal.fire('Creado',`${periodo}  creado correctamente`, 'success');
      this.router.navigateByUrl(`/dashboard/periodo/${resp.periodo._id}`)
    })
  }
  console.log(this.periodoForm.value)
  console.log("hola mundo")
  }


  


}



