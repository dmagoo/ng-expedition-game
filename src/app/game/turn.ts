import { BoardState } from './boardstate';
import { UseCardAction, DrawCardAction } from './action';
export class Turn {

    constructor(private useCardAction: UseCardAction, private drawCardAction: DrawCardAction) {
    }

    //applyTo a turn directly to the board state, no copying
    //mutates original object
    public applyTo(boardState: BoardState): void {
        this.useCardAction.applyTo(boardState);
        this.drawCardAction.applyTo(boardState);
    }
}
