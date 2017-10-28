import { BoardState } from './boardstate';
import { Card } from './card';
import { Player } from './player';

//TODO, define a TURN as strictly a pair of actions, one draw action, one discard action
//redefine ai api to use these

export interface Action {
    apply(boardState: BoardState): BoardState;
}

//draw from deck
export class DrawBlindAction implements Action {
    public apply(boardState: BoardState): BoardState {
        return boardState;
    }
}

//draw from discard pile
export class DrawDiscardedAction implements Action {
    public apply(boardState: BoardState): BoardState {
        return boardState;
    }
}

//discard to a discard pile
export class DiscardCardAction implements Action {

    constructor(private card: Card) {
    }

    public apply(boardState: BoardState): BoardState {
        let player: Player = boardState.getCurrentPlayer();
        if(!player.hasCardInHand(this.card)) {
            throw new Error('player does not have this card');
        }

        

        return boardState;
    }
}

export class PlayCardAction implements Action {
    constructor(private card: Card) {
    }

    public apply(boardState: BoardState): BoardState {
        let player: Player = boardState.getCurrentPlayer();
        if(!player.hasCardInHand(this.card)) {
            throw new Error('player does not have this card');
        }
        return boardState;
    }
}
