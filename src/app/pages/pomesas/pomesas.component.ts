import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pomesas',
  templateUrl: './pomesas.component.html',
  styles: ``
})
export class PomesasComponent implements OnInit{

  constructor(){

  }

    ngOnInit(): void {
      this.getUsuarios()
          .then(usuarios=>{
            console.log(usuarios);
          });
      //   const promesa = new Promise( (resolve, reject) => {

      //     if(true){
      //       resolve('Hola Mundo');
      //     }else{
      //       reject('Algo salió mal');
      //     }
     
      // }) ;

      //     promesa.then((mensaje)=>{
      //             console.log(mensaje);
      // })
      //            .catch((error)=>{
      //             console.log('Error en mi promise', error)

      //         })
      
      // console.log('Fin de Init');





    }

    getUsuarios(){

      const promesa = new Promise ((resolve)=>{
        
        fetch('https://reqres.in/api/users?page=2')
          .then(resp=> resp.json())
          .then(body => resolve(body.data));
      
        });

      return promesa;

    }
    

}
