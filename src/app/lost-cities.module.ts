import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LostCitiesAppComponent } from './lost-cities-app/lost-cities-app.component';

import { LostCitiesGameService } from './services/lost-cities-game.service';
import { LostCitiesBoardComponent } from './lost-cities-board/lost-cities-board.component';
import { LostCitiesHandComponent } from './lost-cities-hand/lost-cities-hand.component';
import { LostCitiesDiscardPilesComponent } from './lost-cities-discard-piles/lost-cities-discard-piles.component';

import { CardColorPipe } from './pipes/cardcolor.pipe';

@NgModule({
    declarations: [
        LostCitiesAppComponent,
        LostCitiesBoardComponent,
        LostCitiesHandComponent,
        LostCitiesDiscardPilesComponent,
        CardColorPipe
    ],
    imports: [
        BrowserModule
    ],
    providers: [LostCitiesGameService],
    bootstrap: [LostCitiesAppComponent]
})
export class LostCitiesModule { }
