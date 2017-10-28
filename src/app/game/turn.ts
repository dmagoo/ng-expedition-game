import { BoardState } from './boardstate';
import { UseCardAction, DrawCardAction } from './action';
export class Turn {

    constructor(private useCardAction: UseCardAction, private drawCardAction: DrawCardAction) {
    }

    public apply(boardState: BoardState): BoardState {
        return null;
    }
}
