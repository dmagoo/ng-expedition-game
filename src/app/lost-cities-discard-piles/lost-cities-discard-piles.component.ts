import {
    Component,
    OnInit,
    Input
} from '@angular/core';

import { DiscardPile } from '../game/discardpile';

@Component({
    selector: 'lost-cities-discard-piles',
    templateUrl: './lost-cities-discard-piles.component.html',
    styleUrls: ['./lost-cities-discard-piles.component.css']
})
export class LostCitiesDiscardPilesComponent implements OnInit {
    @Input() discardPiles: Array<DiscardPile>;
    
    constructor() { }

    ngOnInit() {
    }

}
