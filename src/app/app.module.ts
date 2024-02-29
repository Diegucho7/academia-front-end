import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { MateriasComponent } from './pages/mantenimientos/materias/materias.component';
import { PipesModule } from "./pipes/pipes.module";


@NgModule({
    declarations: [
        AppComponent,
        NopagefoundComponent,
        MateriasComponent,
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PagesModule,
        SharedModule,
        AuthModule,
        PipesModule
    ]
})
export class AppModule { }
