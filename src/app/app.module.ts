import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { LostCitiesGameService } from './services/lost-cities-game.service';
import { LostCitiesBoardComponent } from './lost-cities-board/lost-cities-board.component';
import { LostCitiesHandComponent } from './lost-cities-hand/lost-cities-hand.component';

@NgModule({
    declarations: [
        AppComponent,
        LostCitiesBoardComponent,
        LostCitiesHandComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [LostCitiesGameService],
    bootstrap: [AppComponent]
})
export class AppModule { }
