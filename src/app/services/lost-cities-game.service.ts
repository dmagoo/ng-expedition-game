import { Injectable } from '@angular/core';

import { Game } from '../game/game';
import { Card } from '../game/card';
import { Player } from '../game/player';
import { DiscardPile } from '../game/discardpile';
import { PlayerAgent } from '../game/playeragent/playeragent';
import { HumanPlayerAgent } from '../game/playeragent/humanplayeragent';
import * as action from '../game/action';
var NUM_PLAYERS = 2;

@Injectable()
export class LostCitiesGameService {

    private game: Game;

    private playerInfo = [];

    //the player represented from POV of the GUI.
    //typically a game is one player v. AI, so
    //this will stay constant.
    private visiblePlayer: Player;

    constructor() {
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
        if(2 !== this.playerInfo.length) {
            throw new Error('No players registered');
        }

        let players: Array<Player> = [];
        players.push(new Player(0, this.playerInfo[0].name));
        players.push(new Player(1, this.playerInfo[1].name));
        this.game = new Game(players);
        this.updateVisiblePlayer();
    }

    public playCard(card: Card) {
        //todo make this a decorator
        if(this.getVisiblePlayer() === this.game.getCurrentPlayer()) {
            console.log('i can do this');
            this.game.applyAction(new action.PlayCardAction(card));
        }
        else {
            throw new Error('Wait your turn.');
        }
        //todo, make this decorator
        this.updateVisiblePlayer();
    }

    public discardCard(card: Card) {
        //todo make this a decorator
        if(this.getVisiblePlayer() === this.game.getCurrentPlayer()) {
            console.log('i can do this');
            this.game.applyAction(new action.DiscardCardAction(card));
        }
        else {
            throw new Error('Wait your turn.');
        }
        //todo, make this decorator
        this.updateVisiblePlayer();
    }

    public drawFromDiscardPile(discardPile: DiscardPile) {
        //todo make this a decorator
        if(this.getVisiblePlayer() === this.game.getCurrentPlayer()) {
            console.log('i can do this');
            this.game.applyAction(new action.DrawDiscardedAction(discardPile.color));
        }
        else {
            throw new Error('Wait your turn.');
        }
        //todo, make this decorator
        this.updateVisiblePlayer();
    }

    public drawFromDeck() {
        if(this.getVisiblePlayer() === this.game.getCurrentPlayer()) {
            console.log('i can do this');
            this.game.applyAction(new action.DrawBlindAction());
        }
        else {
            throw new Error('Wait your turn.');
        }
        //todo, make this decorator
        this.updateVisiblePlayer();
    }

    public getVisiblePlayer(): Player {
        return this.visiblePlayer;
    }
    public getVisibleOpponent(): Player {
        return this.getOppositePlayer(this.getVisiblePlayer());
    }
    private getOppositePlayer(player: Player) {
        return this.game.getBoardState().playerList[1 - player.order];
    }
    
    private updateVisiblePlayer(): void {
        let currentPlayer = this.game.getCurrentPlayer();

        if(this.playerIsHuman(currentPlayer)) {
            this.visiblePlayer = currentPlayer;
        }
        else {
            //if other player is non-human, then both players are non-human,
            //so show current player
            //if other player IS human, show them
            //
        }

    }

    private playerIsHuman(player: Player): boolean {
        return (this.playerInfo[player.order].playerAgent instanceof HumanPlayerAgent);
    }
}
