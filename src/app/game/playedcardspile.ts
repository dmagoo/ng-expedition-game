import {
    Color,
    Card,
    Value
} from './card';

export var OVERHEAD_COST = 20;

//add a bonus if the pile contains more than
//this many cards
export var BONUS_COUNT = 8;

//the value of the bonus to add
export var BONUS_VALUE = 20;

export class  PlayedCardsPile {
    public cards: Array<Card>;
    public length: number = 0;
    public score: number = 0;

    constructor(public color: Color) {
        this.cards = [];
    }

    public addCard(card: Card): void {
        if(card.color !== this.color) {
            throw new Error('cannot play card of incorrect color');
        }
        if(!this.canAddCard(card)) {
            throw new Error('invalid card');
        }
        this.cards.push(card);
        this.length++;
        this.updateScore();
    }

    public canAddCard(card: Card): boolean {
        if(this.cards.length <= 0) {
            return true;
        }

        return this.cards[this.cards.length-1].value <= card.value;
    }

    public hasBonus() {
        return this.length >= BONUS_COUNT;
    }
    private updateScore(): void {
        this.score = 0;
        let num_investments = 0;
        let base_score = -OVERHEAD_COST;
        for(let i = 0; i < this.length; i++) {
            let card = this.cards[i];

            if(Value.INVESTMENT === card.value) {
                num_investments++;
            }
            else {
                base_score += card.value;
            }
        }

        this.score = base_score * (num_investments + 1);
        if(this.hasBonus()) {
            this.score += BONUS_VALUE;
        }
    }

}
