import {
    Color,
    Card
} from './card';

export class  DiscardPile {
    public cards: Array<Card>;
    public length: number = 0;
    constructor(public color: Color) {
        this.cards = [];
    }

    public discard(card: Card): void {
        if(card.color !== this.color) {
            throw new Error('cannot discard card of incorrect color');
        }
        this.cards.push(card);
        this.length++;
    }

    //remove top card
    public draw(): Card {
        if(this.cards.length <= 0) {
            throw Error('cannot draw from an empty pile');
        }
        this.length--;
        return this.cards.pop();

    }
    
    //look at top card without removing it
    public peekTopCard(): Card {
        if(this.cards.length <= 0) {
            throw Error('empty pile');
        }
        return this.cards[this.cards.length-1];
    }
}
