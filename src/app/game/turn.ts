import { BoardState } from './boardstate';
import { DiscardCardAction, DrawDiscardedAction, UseCardAction, DrawCardAction } from './action';
export class Turn {

    constructor(private useCardAction: UseCardAction, private drawCardAction: DrawCardAction) {
        //cannot make an invalid turn
        if(useCardAction instanceof DiscardCardAction && drawCardAction instanceof DrawDiscardedAction) {
            if(useCardAction.card.color === drawCardAction.color) {
                throw new Error('player cannot play a card and immediately draw it');
            }
        }
    }

    //applyTo a turn directly to the board state, no copying
    //mutates original object
    public applyTo(boardState: BoardState): void {
        this.useCardAction.applyTo(boardState);
        this.drawCardAction.applyTo(boardState);
    }
}
