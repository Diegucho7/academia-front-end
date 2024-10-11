import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ChatService } from '../../../services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class  ChatComponent{

  chats: Observable<any[]>;

  mensaje: string = '';
  elemento: any;
  constructor(public firestore: AngularFirestore, public cs: ChatService ) {
    
    this.chats = firestore.collection('chats').valueChanges();
   }

 

}
