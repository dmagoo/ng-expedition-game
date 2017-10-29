import { BoardState } from './boardstate';
import { UseCardAction, DrawCardAction } from './action';
export class Turn {

    constructor(private useCardAction: UseCardAction, private drawCardAction: DrawCardAction) {
    }

    public apply(boardState: BoardState): BoardState {
        boardState = this.useCardAction.apply(boardState);
        boardState = this.drawCardAction.apply(boardState);
        return boardState;
    }
}
