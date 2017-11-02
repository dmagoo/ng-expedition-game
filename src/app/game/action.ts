import {
    BoardState,
    TurnPhase
} from './boardstate';
import {
    Card,
    Color
} from './card';
import { Player } from './player';

//decorator to check that the board state is in the correct phase,
//will also advance phase after the action
function Phase(turnPhase: TurnPhase) {

    return function(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const originalMethod = descriptor.value; // save a reference to the original method
        descriptor.value = function(boardState: BoardState) {
            if(turnPhase !== boardState.turnPhase) {
                throw new Error("invalid turn phase");            
            }
            //console.log(boardState);            
            // run and store result
            let player: Player = boardState.getCurrentPlayer();
            if(turnPhase === TurnPhase.DRAW_CARD) {
                if(!player.needsCards()) {
                    throw new Error('player has a full hand');
                }
            }

            if(turnPhase === TurnPhase.PLAY_CARD) {
                if(!player.hasCardInHand(this.card)) {
                    throw new Error('player does not have this card');
                }
            }


            const result = originalMethod.apply(this, [boardState]);

            boardState.nextPhase();
            
            return result;
        };

        return descriptor;
    }
}

export interface Action {
    applyTo(boardState: BoardState): void;
}

export interface DrawCardAction extends Action {
}

export interface UseCardAction extends Action {
}

//draw from deck
export class DrawBlindAction implements DrawCardAction {
    @Phase(TurnPhase.DRAW_CARD)
    public applyTo(boardState: BoardState): void {
        console.log('drawing from deck');
        console.log(boardState);
        boardState.getCurrentPlayer().addCardToHand(boardState.deck.draw());
    }
}

//draw from discard pile
export class DrawDiscardedAction implements DrawCardAction {
    constructor(private color: Color) {
    }

    @Phase(TurnPhase.DRAW_CARD)
    public applyTo(boardState: BoardState): void {
        console.log('drawing from discard pile');
        boardState.getCurrentPlayer()
            .addCardToHand(
                boardState.discardPiles[this.color].draw()
            );
    }
}

//discard to a discard pile
export class DiscardCardAction implements UseCardAction {

    constructor(private card: Card) {
    }

    @Phase(TurnPhase.PLAY_CARD)
    public applyTo(boardState: BoardState): void {
        boardState.getCurrentPlayer().removeCardFromHand(this.card);
        boardState.discardPiles[this.card.color].discard(this.card);
    }
}

export class PlayCardAction implements UseCardAction {
    constructor(private card: Card) {
    }

    @Phase(TurnPhase.PLAY_CARD)
    public applyTo(boardState: BoardState): void {
        boardState.getCurrentPlayer().playCard(this.card);
    }
}
