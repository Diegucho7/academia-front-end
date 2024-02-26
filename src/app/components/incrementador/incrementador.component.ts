import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: ``
})
export class IncrementadorComponent implements OnInit{
      ngOnInit(): void {
        
        this.btnClass = `btn ${this.btnClass}`
        
      }
      @Input('valor') progreso: number = 70;
      @Input() btnClass: string = ' btn-primary';



      @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter;
      
      // get getPorcentaje(){
      //   return `${this.progreso}%`
      // }

      cambiarValor (valor: number)  {
        if (this.progreso >= 100 && valor >= 0 ){
          this.valorSalida.emit(100);
          this.progreso = 95;
        } 

        if (this.progreso <= 0 && valor <= 0 ){
          this.valorSalida.emit(0);
          this.progreso = 5;
        } 
        this.progreso = this.progreso + valor;
        this.valorSalida.emit(this.progreso);

      }
      onChange( nuevoValor:number ){
        
        if(nuevoValor >= 100){
          this.progreso=100
          this.valorSalida.emit(this.progreso)
        }else if(nuevoValor <= 0){
          this.progreso = 0
          this.valorSalida.emit(this.progreso)
        }else{
          this.valorSalida.emit(this.progreso)
        }
        
      }
}
