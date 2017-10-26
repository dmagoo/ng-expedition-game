import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { LostCitiesGameService } from './lost-cities-game.service';
import { LostCitiesBoardComponent } from './lost-cities-board.component';

@NgModule({
    declarations: [
        AppComponent,
        LostCitiesBoardComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [LostCitiesGameService],
    bootstrap: [AppComponent]
})
export class AppModule { }
