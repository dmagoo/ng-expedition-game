import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

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

    //causes the game server to stick w/ the pov of one player
    //if null, defaults to logic outlined in "updatevisibleplayer" method
    private stickyPlayer: number = null;
    
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

    public setStickyPlayer(playerIndex:number) {
        if(playerIndex < 0 || playerIndex >= this.playerInfo.length) {
            throw new Error('cannot stick to non-existant player');
        }

        this.stickyPlayer = playerIndex;
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
        try {
            this.handleTurnEnd();
        }
        catch(e) {
            //if there are two bots, a game over exception will
            //fire before game renders
            //catch it here to see output
        }
    }

    public playCard(card: Card) {
        //todo make this a decorator
        if(this.getVisiblePlayer() === this.game.getCurrentPlayer()) {
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
            this.game.applyAction(new action.DrawDiscardedAction(discardPile.color));
        }
        else {
            throw new Error('Wait your turn.');
        }
        //todo, make this decorator
        this.updateVisiblePlayer();
        this.handleTurnEnd();
    }

    public drawFromDeck() {
        if(this.getVisiblePlayer() === this.game.getCurrentPlayer()) {
            this.game.applyAction(new action.DrawBlindAction());
        }
        else {
            throw new Error('Wait your turn.');
        }
        //todo, make this decorator
        this.updateVisiblePlayer();
        this.handleTurnEnd();
    }

    private handleTurnEnd() {
        //try AI Move
        let currentPlayer = this.game.getCurrentPlayer();
        if(this.playerIsHuman(currentPlayer)) {
            return;
        }

        let playerAgent = this.playerInfo[currentPlayer.order].playerAgent;


/*
        let boardState = this.game.getBoardState();
        
        console.log('played cards orig before observable creation');
        console.dir(JSON.stringify(boardState.getCurrentPlayer().playedCards));
        console.dir(boardState.getCurrentPlayer().playedCards);

        console.log('player hand before observable creation');
        console.dir(boardState.getCurrentPlayer().hand);

        let boardStateCopy = boardState.copy();

        console.log('played cards copy before observable creation');
        console.dir(boardStateCopy.getCurrentPlayer().playedCards);

        //let the turn happen async

        (function() {
            if ( typeof (Object as any).id == "undefined" ) {
                var id = 0;

                (Object as any).id = function(o) {
                    if ( typeof o.__uniqueid == "undefined" ) {
                        Object.defineProperty(o, "__uniqueid", {
                            value: ++id,
                            enumerable: false,
                            // This could go either way, depending on your
                            // interpretation of what an "id" is
                            writable: false
                        });
                    }

                    return o.__uniqueid;
                };
            }
        })();
        

  */      


        let boardState = this.game.getBoardState();
        let boardStateCopy = boardState.copy();
        //shuffle the deck of the copied board so the AI
        //can't know what cards there are
        //If we want to implement a cheating AI,
        //this line will have to be removed.
        boardStateCopy.deck.shuffle();
        let source = Observable.create( observer => {
            //always send a copy, so the AI doesn't corrupt the game
            let turn = playerAgent.findTurn(boardStateCopy);

            //needless rucursion if both players are AI?
            observer.next(turn);//this.game.getBoardState());
            observer.complete();

            //return () => console.log('clean up');
            //a delay just to let the game render and be seen in action
        }).delay(100);


        //subscribe to the above and apply the turn when found
        var subscription = source.subscribe(
            turn => {
                console.log(this.game.getCurrentPlayer().name + ' takes a turn');
                console.log(turn);
                turn.applyTo(this.game.getBoardState());
                this.handleTurnEnd();
                this.updateVisiblePlayer();
            },
            e => console.log('onError: %s', e),
            () => console.log('onCompleted')
        );
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
        if(null !== this.stickyPlayer) {
            this.visiblePlayer = this.game.getBoardState().playerList[this.stickyPlayer];
            return;
        }

        let currentPlayer = this.game.getCurrentPlayer();

        if(this.playerIsHuman(currentPlayer)) {
            this.visiblePlayer = currentPlayer;
        }
        else {
            let oppositePlayer = this.getOppositePlayer(currentPlayer);
            
            //if other player is non-human, then both players are non-human,
            if(!this.playerIsHuman(oppositePlayer)) {
                //so show current player
                this.visiblePlayer = currentPlayer;
            }
            else {
                //if other player IS human, but this one is not, show the human
                this.visiblePlayer = oppositePlayer;
            }
        }

    }

    private playerIsHuman(player: Player): boolean {
        return (this.playerInfo[player.order].playerAgent instanceof HumanPlayerAgent);
    }
}
