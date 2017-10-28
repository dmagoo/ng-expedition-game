import {
    Card,
    Value,
    colors,
    values
} from './card';

const NUM_INVESTMENTS: number = 3;

export class Deck {
    public cards: Array<Card>;
    
    constructor() {
        this.reset().shuffle();
    }

    public reset(): Deck {
        this.cards = [];
        for(let colorIndex of colors) {
            //add in extra investment cards
            for(let valueIndex of values.concat(Array(NUM_INVESTMENTS-1).fill(Value.INVESTMENT))) {
                this.cards.push(new Card(colorIndex, valueIndex));
            }
        }
        console.log('card thing');
        console.log(this.cards);            

        return this;
    }

    /**
     * Shuffles array in place using the fisher-yates algorithm.
     * @param {Array} a items An array containing the items.
     */
    public shuffle(): Deck {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        return this;
    }

    public draw(): Card {
        return this.cards.pop();
    }
}
