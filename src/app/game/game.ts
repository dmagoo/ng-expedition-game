import { Player, HAND_SIZE } from './player';
import { BoardState } from './boardstate';
import { Deck } from './deck';
import { DiscardPile } from './discardpile';
import { colors } from './card';
import { Move } from './move';


export class Game {

    private players: Array<Player>;
    private boardState: BoardState;
    private deck: Deck;
    
    private gameStarted: boolean = false;

    private discardPiles: Array<DiscardPile>;
    
    constructor() {
        this.players = [];
        this.players.push(new Player('Player A'));
        this.players.push(new Player('Player B'));
        this.boardState = new BoardState(0, this.players);
        this.deck = new Deck();
    }

    public getBoardState() {
        return this.boardState;
    }

    public start() {
        if(this.gameStarted) {
            throw new Error('game already started');
        }
        
        this.dealStartingHands();

        this.initDiscardPiles();
        
        this.gameStarted = true;

    }

    public applyMove(move: Move) {
        this.boardState = move.apply(this.boardState)
    }

    private dealStartingHands():void {
        for(let i = 0; i < HAND_SIZE; i++) {
            this.players[0].addCardToHand(this.deck.draw());
            this.players[1].addCardToHand(this.deck.draw());
        }
    }

    private initDiscardPiles() {
        this.discardPiles = [];
        for(let color of colors) {
            this.discardPiles[color] = new DiscardPile(color);
        }
    }

}
