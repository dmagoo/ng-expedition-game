import {
    Component,
    OnInit,
    Input
} from '@angular/core';

import { Player } from '../game/player';
import { Card } from '../game/card';
import { LostCitiesGameService } from '../services/lost-cities-game.service';

@Component({
    selector: 'lost-cities-hand',
    templateUrl: './lost-cities-hand.component.html',
    styleUrls: ['./lost-cities-hand.component.scss']
})
export class LostCitiesHandComponent implements OnInit {

    @Input() player: Player;
    
    constructor(private gameService: LostCitiesGameService) { }

    ngOnInit() {
    }

    handleClick(event: MouseEvent, card: Card) {

        if(event.shiftKey) {
//            console.log('handling click, attempting to play a hand card: ' + card.color);
//            this.gameService.discardCard(card);
        } else {
//            console.log('handling click, attempting to play a hand card: ' + card.color);
//            this.gameService.playCard(card);
        }

    }


}
