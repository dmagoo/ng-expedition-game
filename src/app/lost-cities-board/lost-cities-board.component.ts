import {
    Component,
    Input
} from '@angular/core';

import { Player } from '../game/player';
import { BoardState } from '../game/boardstate';
import { LostCitiesGameService } from '../services/lost-cities-game.service';

@Component({
    selector: 'lost-cities-board',
    templateUrl: './lost-cities-board.component.html',
    styleUrls: ['./lost-cities-board.component.scss']

})
export class LostCitiesBoardComponent {
    @Input() boardState: BoardState;

    constructor(private gameService: LostCitiesGameService) {
    }
    
    handleDeckClick(event: MouseEvent) {
        console.log('handling click, attempting to draw from deck');
        this.gameService.drawFromDeck();
    }

    getVisiblePlayer(): Player {
        return this.gameService.getVisiblePlayer();
    }

    getVisibleOpponent(): Player {
        return this.gameService.getVisibleOpponent();
    }
}
