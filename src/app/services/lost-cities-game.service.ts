import { Injectable } from '@angular/core';

import { Game } from '../game/game';
import { DiscardPile } from '../game/discardpile';
import { PlayerAgent } from '../game/playeragent/playeragent';

@Injectable()
export class LostCitiesGameService {

    private game: Game;
    
    constructor() {
        this.game = new Game();
    }

    public getGame(): Game {
        return this.game;
    }

    public registerPlayer(playerNumber: number, name: string, playerAgent: PlayerAgent) {
    }

    public startGame(): void {
        this.game.start();
    }

    public drawFromDiscardPile(discardPile: DiscardPile) {
        //        throw new Error('crumbs');
        //        console.log(discardPile);
    }
}
