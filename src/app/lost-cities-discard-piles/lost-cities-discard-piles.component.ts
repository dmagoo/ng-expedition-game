import {
    Component,
    Input
} from '@angular/core';

import { Card } from '../game/card';
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
        console.log('handling click, attempting to draw from discard pile: ' + discardPile.color);
        this.gameService.drawFromDiscardPile(discardPile);
    }

    droppedCard(event, discardPile: DiscardPile) {
        //console.log('dropped');
        //console.log(event);
        //throw new Error('invalid drop');
        console.log(event.dragData);
        console.log(event);
        this.gameService.discardCard(event.dragData);
    }

    allowCardDrop(discardPile: DiscardPile) {
        return (dragData: Card) => {
            //console.log('allow?');
            //console.log(dragData.color === discardPile.color ? 'Y' : 'N');
            return dragData.color === discardPile.color;
        }
    }
}
