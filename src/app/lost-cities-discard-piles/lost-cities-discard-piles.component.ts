import {
    Component,
    Input
} from '@angular/core';

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
}
