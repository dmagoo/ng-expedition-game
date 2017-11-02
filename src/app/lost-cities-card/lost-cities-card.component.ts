import {
    Component,
    Input
} from '@angular/core';

import { Card } from '../game/card';

@Component({
    selector: 'lost-cities-card',
    templateUrl: './lost-cities-card.component.html',
    styleUrls: ['./lost-cities-card.component.scss']
})
export class LostCitiesCardComponent {
    @Input() card: Card;
}
