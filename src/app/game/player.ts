import {
    Card,
    colors
} from './card';
import { PlayedCardsPile } from './playedcardspile';
export const HAND_SIZE: number = 8;

export class Player {

    public hand: Array<Card>;
    public playedCards: Array<PlayedCardsPile>;
    
    constructor(public order: number, public name: string) {
        this.hand = [];
        this.playedCards = [];
        
        for(let color of colors) {
            this.playedCards[color] = new PlayedCardsPile(color);
        }

    }

    public hasCardInHand(card: Card): boolean {
        return -1 !== this.hand.findIndex(c => c.equals(card));
    }
    
    public addCardToHand(card: Card): void {
        if(this.hand.length >= HAND_SIZE) {
            throw new Error('hand limit reached');
        }
        this.hand.push(card);
    }

    public playCard(card: Card) {
        if(!this.hasCardInHand(card)) {
            throw new Error('player does not have this card');
        }
        this.playedCards[card.color].addCard(card);
        this.removeCardFromHand(card);
    }
    
    public needsCards(): boolean {
        return this.hand.length < HAND_SIZE;
    }
    
    //move to Move interface / object
    public removeCardFromHand(card: Card) {
        if(!this.hasCardInHand(card)) {
            throw new Error('player does not have this card');
        }
        this.hand.splice(
            this.hand.findIndex(c => c.equals(card)),
            1
        );
    }

    public getScore(): number {
        let score = 0;
        for(let i = 0; i < this.playedCards.length; i++) {
            score += this.playedCards[i].score;            
        }

        return score;
    }

}
