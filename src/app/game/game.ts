import {
    Player,
    HAND_SIZE
} from './player';
import {
    BoardState,
    TurnPhase
} from './boardstate';
import { Deck } from './deck';
import { DiscardPile } from './discardpile';
import { colors } from './card';
import { Turn } from './turn';
import { Action } from './action';


export class Game {
    private boardState: BoardState;
    
    constructor(players: Array<Player>) {
        let deck = new Deck();
        this.initPlayers(deck, players);
        this.boardState = new BoardState(
            0,
            TurnPhase.PLAY_CARD,
            players,
            deck,
            this.initDiscardPiles()
        );
    }

    public getBoardState() {
        return this.boardState;
    }

    //apply a turn directly to the board state
    public applyTurn(turn: Turn) {
        turn.applyTo(this.boardState)
    }

    //apply a turn directly to the board state
    public applyAction(action: Action) {
        console.log('applying an action');
        action.applyTo(this.boardState);
    }

    //passthrough to board state for convenience
    public getCurrentPlayer(): Player {
        return this.boardState.getCurrentPlayer();
    }
    
    private initPlayers(deck: Deck, players: Array<Player>): void {
        //let players: Array<Player> = [];
        //players.push(new Player('Player A'));
        //players.push(new Player('Player B'));
        this.dealStartingHands(players, deck);
        //return players;
    }
    private dealStartingHands(players, deck: Deck):void {
        for(let i = 0; i < HAND_SIZE; i++) {
            players[0].addCardToHand(deck.draw());
            players[1].addCardToHand(deck.draw());
        }
    }

    private initDiscardPiles() {
        let discardPiles: Array<DiscardPile> = [];
        for(let color of colors) {
            discardPiles[color] = new DiscardPile(color);
        }
        return discardPiles;
    }
}
