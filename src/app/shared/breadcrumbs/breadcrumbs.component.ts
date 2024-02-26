import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter,map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: ``
})  
export class BreadcrumbsComponent implements OnDestroy {

    public titulo! : string;
    public tituloSubs$!: Subscription;

  constructor(private router: Router, private route: ActivatedRoute){
    this.tituloSubs$ = this.getDataRuta()
                        .subscribe(({titulo}) =>{
                        this.titulo = titulo;
                        document.title =`Academy - ${titulo}`;
                      }); 
  }


  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  
  getDataRuta(){
    return this.router.events
    .pipe(
            filter<any> ( event=> event instanceof ActivationEnd),
            filter((event:ActivationEnd) => event.snapshot.firstChild === null),
            map((event:ActivationEnd) => event.snapshot.data),
    )
    

  }

}
