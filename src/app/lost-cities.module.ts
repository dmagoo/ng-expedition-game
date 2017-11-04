import {
    DndModule
} from 'ng2-dnd';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LostCitiesAppComponent } from './lost-cities-app/lost-cities-app.component';

import { LostCitiesGameService } from './services/lost-cities-game.service';
import { LostCitiesBoardComponent } from './lost-cities-board/lost-cities-board.component';
import { LostCitiesCardComponent } from './lost-cities-card/lost-cities-card.component';
import { LostCitiesHandComponent } from './lost-cities-hand/lost-cities-hand.component';
import { LostCitiesDiscardPilesComponent } from './lost-cities-discard-piles/lost-cities-discard-piles.component';

import { CardColorPipe } from './pipes/cardcolor.pipe';
import { LostCitiesPlayedCardsComponent } from './lost-cities-played-cards/lost-cities-played-cards.component';


@NgModule({
    declarations: [
        LostCitiesAppComponent,
        LostCitiesBoardComponent,
        LostCitiesHandComponent,
        LostCitiesDiscardPilesComponent,
        CardColorPipe,
        LostCitiesCardComponent,
        LostCitiesPlayedCardsComponent
    ],
    imports: [
        BrowserModule,
        DndModule.forRoot()

    ],
    providers: [LostCitiesGameService],
    bootstrap: [LostCitiesAppComponent]
})
export class LostCitiesModule { }
