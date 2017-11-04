import {
    Component,
    Input
} from '@angular/core';

import { Card } from '../game/card';
import { TurnPhase } from '../game/boardstate';
import { PlayedCardsPile } from '../game/playedcardspile';
import { LostCitiesGameService } from '../services/lost-cities-game.service';

@Component({
  selector: 'lost-cities-played-cards',
  templateUrl: './lost-cities-played-cards.component.html',
  styleUrls: ['./lost-cities-played-cards.component.scss']
})
export class LostCitiesPlayedCardsComponent {
    @Input() playedCardsPiles: Array<PlayedCardsPile>;
    @Input() orientation: string;
    constructor(private gameService: LostCitiesGameService) {
    }

    droppedCard(event, playedCardsPile: PlayedCardsPile) {
        this.gameService.playCard(event.dragData);
    }

    allowCardDrop(playedCardsPile: PlayedCardsPile) {
        return (dragData: Card) => {
            if('flipped' === this.orientation) {
                return false;
            }

            return (TurnPhase.PLAY_CARD === this.gameService.getGame().getBoardState().turnPhase) &&
                (dragData.color === playedCardsPile.color);
        }
    }
}
