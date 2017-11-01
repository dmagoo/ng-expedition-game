import { Card } from './card';

export const HAND_SIZE: number = 8;

export class Player {

    public hand: Array<Card>;

    public playedCards: Array<Array<Card>>;
    
    constructor(public order: number, public name: string) {
        this.hand = [];
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
}
