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
        BrowserAnimationsModule
    ]
})
export class AppModule { }
