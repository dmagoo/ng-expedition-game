import { Injectable } from '@angular/core';

import { Game } from '../game/game';
import { Player } from '../game/player';
import { DiscardPile } from '../game/discardpile';
import { PlayerAgent } from '../game/playeragent/playeragent';

var NUM_PLAYERS = 2;

@Injectable()
export class LostCitiesGameService {

    private game: Game;

    private playerInfo = [];

    constructor() {
        //this.game = new Game();
    }

    public getGame(): Game {
        return this.game;
    }

    public registerPlayer(playerNumber: number, name: string, playerAgent: PlayerAgent) {
        if(playerNumber >= NUM_PLAYERS || playerNumber < 0) {
            throw new Error('Invalid player number');
        }
        this.playerInfo[playerNumber] = {
            name: name,
            playerAgent: playerAgent
        };
    }

    public startGame(): void {
        //        this.game.start();
        if(2 !== this.playerInfo.length) {
            throw new Error('No players registered');
        }

        let players: Array<Player> = [];
        players.push(new Player(this.playerInfo[0].name));
        players.push(new Player(this.playerInfo[1].name));
        this.game = new Game(players);

    }

    public drawFromDiscardPile(discardPile: DiscardPile) {
        //        throw new Error('crumbs');
        //        console.log(discardPile);
    }

    public drawFromDeck() {
        //        throw new Error('crumbs');
        //        console.log(discardPile);
    }
}
