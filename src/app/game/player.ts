import { Card } from './card';

export const HAND_SIZE: number = 8;

export class Player {

    public name;

    public hand: Array<Card>;

    public playedCards: Array<Array<Card>>;
    
    constructor(name: string) {
        this.hand = [];
    }

    public hasCardInHand(card: Card): boolean {
        //todo, implement comparison operator in card object
        return true;
    }
    
    public addCardToHand(card: Card): void {
        if(this.hand.length >= HAND_SIZE) {
            throw new Error('hand limit reached');
        }
        this.hand.push(card);
        console.log('Added card to ' + this.name + ': ' + card)
    }

    //move to Move interface / object
    public removeCardFromHand(card: Card) {
        if(!this.hasCardInHand(card)) {
            throw new Error('player does not have this card');
        }
        //todo, implement comparison operator in card object
        //if card is in hand, remove it
    }
    
    /*
    //move to Move interface / object
    public playCard(card: Card) {
        if(!this.hasCardInHand(card)) {
            throw new Error('player does not have this card');
        }
    }

    public discardCard(card: Card) {
        if(!this.hasCardInHand(card)) {
            throw new Error('player does not have this card');
        }
    }
    */

}
