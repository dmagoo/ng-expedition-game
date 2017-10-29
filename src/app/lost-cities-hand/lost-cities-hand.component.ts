import {
    Component,
    OnInit,
    Input
} from '@angular/core';

import { Player } from '../game/player';

@Component({
    selector: 'lost-cities-hand',
    templateUrl: './lost-cities-hand.component.html',
    styleUrls: ['./lost-cities-hand.component.css']
})
export class LostCitiesHandComponent implements OnInit {

    @Input() player: Player;
    
    constructor() { }

    ngOnInit() {
    }

}
