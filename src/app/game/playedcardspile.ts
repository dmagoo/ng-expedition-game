import {
    Color,
    Card,
    Value,
    BONUS_COUNT,
    getColorScore
} from './card';

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
        this.score = getColorScore(this.cards)
    }

}
