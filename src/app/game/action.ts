import { BoardState } from './boardstate';
import { Card } from './card';
import { Player } from './player';

//TODO, define a TURN as strictly a pair of actions, one draw action, one discard action
//redefine ai api to use these

export interface Action {
    apply(boardState: BoardState): BoardState;
}

export interface DrawCardAction extends Action {
}

export interface UseCardAction extends Action {
}

//draw from deck
export class DrawBlindAction implements DrawCardAction {
    public apply(boardState: BoardState): BoardState {
        return boardState;
    }
}

//draw from discard pile
export class DrawDiscardedAction implements DrawCardAction {
    public apply(boardState: BoardState): BoardState {
        return boardState;
    }
}

//discard to a discard pile
export class DiscardCardAction implements UseCardAction {

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

export class PlayCardAction implements UseCardAction {
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
