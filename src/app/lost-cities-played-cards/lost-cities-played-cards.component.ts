import {
    Component,
    Input
} from '@angular/core';

import { Card } from '../game/card';
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
}
