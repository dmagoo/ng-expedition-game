import { Player } from './player';

export class BoardState {

    constructor(
        private currentPlayer: number,
        private playerList: Array<Player>
    ) {

    }

    public getCurrentPlayer(): Player {
        console.log('get cp');
        console.log(this.playerList[this.currentPlayer].hand);
        return this.playerList[this.currentPlayer];
    }

}
