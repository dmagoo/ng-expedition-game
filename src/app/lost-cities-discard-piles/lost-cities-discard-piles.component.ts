import {
    Component,
    Input
} from '@angular/core';

import { Card } from '../game/card';
import { TurnPhase } from '../game/boardstate';
import { DiscardPile } from '../game/discardpile';
import { LostCitiesGameService } from '../services/lost-cities-game.service'; 

@Component({
    selector: 'lost-cities-discard-piles',
    templateUrl: './lost-cities-discard-piles.component.html',
    styleUrls: ['./lost-cities-discard-piles.component.scss']
})
export class LostCitiesDiscardPilesComponent {
    @Input() discardPiles: Array<DiscardPile>;
    constructor(private gameService: LostCitiesGameService) {
    }

    handleClick(event: MouseEvent, discardPile: DiscardPile) {
        this.gameService.drawFromDiscardPile(discardPile);
    }

    droppedCard(event, discardPile: DiscardPile) {
        this.gameService.discardCard(event.dragData);
    }

    allowCardDrop(discardPile: DiscardPile) {
        return (dragData: Card) => {
            return (TurnPhase.PLAY_CARD === this.gameService.getGame().getBoardState().turnPhase) &&
            (dragData.color === discardPile.color);
        }
    }
}
