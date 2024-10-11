// import { initializeApp } from 'firebase/app';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PipesModule } from "./pipes/pipes.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RevisionComponent } from './pages/mantenimientos/revision/revision.component';


// import {AngularFireModule} from '@angular/fire/compat';
// import {AngularFirestore} from '@angular/fire/compat/firestore';


// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { environment } from '../environments/environment';
// import { ChatService } from './services/chat.service';
// import { NgChartsModule } from 'ng2-charts';


@NgModule({
    declarations: [
        AppComponent,
        NopagefoundComponent,
        RevisionComponent,
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PagesModule,
        SharedModule,
        AuthModule,
        PipesModule,
        BrowserAnimationsModule,
        // AngularFireModule.initializeApp(environment.firebase),
        // NgChartsModule
    ],
    // providers: [
    //     AngularFirestore, ChatService
    // ]
})
export class AppModule { }
