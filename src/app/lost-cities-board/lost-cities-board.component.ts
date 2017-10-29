import {
    Component,
    Input
} from '@angular/core';

import { BoardState } from '../game/boardstate';

@Component({
    selector: 'lost-cities-board',
    templateUrl: './lost-cities-board.component.html',
    styles: ['lost-cities-board.component.css']

})
export class LostCitiesBoardComponent {
    @Input() boardState: BoardState;
}
