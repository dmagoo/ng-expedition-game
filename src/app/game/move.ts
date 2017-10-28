import { BoardState } from './boardstate';
import { Card } from './card';
import { Player } from './player';

export interface Move {
    apply(boardState: BoardState): BoardState;
}

//draw from deck
export class DrawBlindMove implements Move {
    public apply(boardState: BoardState): BoardState {
        return boardState;
    }
}

//draw from discard pile
export class DrawDiscardedMove implements Move {
    public apply(boardState: BoardState): BoardState {
        return boardState;
    }
}

//discard to a discard pile
export class DiscardCardMove implements Move {

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

export class PlayCardMove implements Move {
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
