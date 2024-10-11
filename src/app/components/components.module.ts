import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { ChatsComponent } from './chats/chats.component';
import { LoginComponent } from './login/login.component';

import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { ChatService } from '../services/chat.service';

@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModalImagenComponent,
    ChatsComponent,
    LoginComponent
  ],
  exports:[
    IncrementadorComponent,
    DonaComponent,
    ModalImagenComponent,
    ChatsComponent,
    LoginComponent
  ],
  // providers: [
    // { provide: 
      // NgChartsConfiguration, useValue: { generateColors: false }}
  // ],
  imports: [
    CommonModule,
    FormsModule,
    // NgChartsModule
  ],
  providers: [
    AngularFirestore, ChatService
]
})
export class ComponentsModule { }
