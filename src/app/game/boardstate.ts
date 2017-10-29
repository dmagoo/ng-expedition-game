import * as _ from "lodash";
import { Player } from './player';
import { Deck } from './deck';
import { DiscardPile } from './discardpile';

export class BoardState {

    constructor(
        private currentPlayer: number,
        public playerList: Array<Player>,
        public deck: Deck, 
        public discardPiles: Array<DiscardPile>
    ) {

    }

    public getCurrentPlayer(): Player {
        return this.playerList[this.currentPlayer];
    }

    //perform a deep copy of this board state,
    //including deck, player hands, etc
    public copy(): BoardState {
        return <BoardState>_.cloneDeep(this);
    }
    
}
