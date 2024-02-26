import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: ``
})
export class RxjsComponent implements OnDestroy{

    public intervalSubs: Subscription;

    constructor(){ 


      // this.retornaObservable().pipe(
      //   retry(1)
      // )
      // .subscribe(
      //   valor => console.log('subs:',valor),
      //   err => console.warn('Error',err),
      //   () => console.info('Obs$ se completo correctamente')
      
      // );

      this.intervalSubs = this.retornaIntervalo()
      .subscribe(console.log)


    }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

    retornaIntervalo(): Observable<number> {

        return interval(100)
        
                .pipe(  
                  map(valor => valor + 1 ),
                  filter(valor => (valor % 2 === 0 ) ? true:false )
                  // take(10),
              ) 

      }

    retornaObservable(): Observable<number>{
      
      let i = -1;

      return new Observable<number>( observer =>{
        

        const intevalo = setInterval( ()=> {

          i++;
          observer.next(i);
          if(i===4){
            clearInterval(intevalo);
            observer.complete();
          }
          // if(i===2){
          //   i = 0;
          //   observer.error('i llego al valor de 2')
          // }
        },1000)

      });

      

    }
    
    

}
