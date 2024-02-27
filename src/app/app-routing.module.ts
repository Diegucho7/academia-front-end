import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const routes: Routes = [

  //path:'./dashboard' PagesRouting
  //path:'./auth' AuthRouting
  //path:'./medicos' MedicosRouting
  //path:'./compras' ComprasRouting
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: '**', component:NopagefoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}),
  PagesRoutingModule,
  AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
