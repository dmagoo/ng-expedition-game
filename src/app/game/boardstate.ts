import { Player } from './player';
import { Deck } from './deck';
import { DiscardPile } from './discardpile';

export class BoardState {

    constructor(
        private currentPlayer: number,
        private playerList: Array<Player>,
        private deck: Deck, 
        private discardPiles: Array<DiscardPile>
    ) {

    }

    public getCurrentPlayer(): Player {
        console.log('get cp');
        console.log(this.playerList[this.currentPlayer].hand);
        return this.playerList[this.currentPlayer];
    }

}
