import * as _ from "lodash";
import { Player } from './player';
import { Deck } from './deck';
import { DiscardPile } from './discardpile';

export const enum TurnPhase {
    PLAY_CARD = 0,
    DRAW_CARD
}

export class BoardState {

    constructor(
        private currentPlayerIndex: number,
        public turnPhase: TurnPhase,
        public playerList: Array<Player>,
        public deck: Deck, 
        public discardPiles: Array<DiscardPile>
    ) {

    }

    public getCurrentPlayer(): Player {
        return this.playerList[this.currentPlayerIndex];
    }

    public nextPhase() {
        if(TurnPhase.DRAW_CARD === this.turnPhase) {
            this.nextPlayer();
        }
        else {
            this.turnPhase = TurnPhase.DRAW_CARD;
        }
    }

    public nextPlayer() {
        //only works w/ 2 player game
        this.currentPlayerIndex = 1 - this.currentPlayerIndex;
        this.turnPhase = TurnPhase.PLAY_CARD;
    }
    
    //perform a deep copy of this board state,
    //including deck, player hands, etc
    public copy(): BoardState {
        return <BoardState>_.cloneDeep(this);
    }

    public gameOver(): boolean {
        return 0 === this.deck.length;
    }
}
