import { Player, HAND_SIZE } from './player';
import { BoardState } from './boardstate';
import { Deck } from './deck';
import { DiscardPile } from './discardpile';
import { colors } from './card';
import { Move } from './move';


export class Game {
    private boardState: BoardState;
    private gameStarted: boolean = false;
    
    constructor() {
    }

    public getBoardState() {
        return this.boardState;
    }

    public start() {
        if(this.gameStarted) {
            throw new Error('game already started');
        }
        let deck = new Deck();
        this.boardState = new BoardState(
            0,
            this.initPlayers(deck),
            deck,
            this.initDiscardPiles()

        );
        
        this.gameStarted = true;

    }

    public applyMove(move: Move) {
        this.boardState = move.apply(this.boardState)
    }

    private initPlayers(deck: Deck): Array<Player> {
        let players: Array<Player> = [];
        players.push(new Player('Player A'));
        players.push(new Player('Player B'));
        this.dealStartingHands(players, deck);
        return players;
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
