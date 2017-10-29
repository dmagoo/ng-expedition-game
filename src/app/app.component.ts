import { Component } from '@angular/core';

import { LostCitiesGameService } from './services/lost-cities-game.service'; 
import { BoardState } from './game/boardstate';

@Component({
  selector: 'lost-cities-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Game Thing';

    constructor(
        private gameService: LostCitiesGameService
    ) {
        console.log('starting game');
        gameService.startGame();
    }

    public getBoardState(): BoardState {
        return this.gameService.getGame().getBoardState();
    }
}
