export var OVERHEAD_COST = 20;

//add a bonus if the pile contains more than
//this many cards
export var BONUS_COUNT = 8;

//the value of the bonus to add
export var BONUS_VALUE = 20;

export const enum Color {
    YELLOW = 0,
    BLUE,
    WHITE,
    GREEN,
    RED
}

export var colors: Array<Color> = [
    Color.YELLOW,
    Color.BLUE,
    Color.WHITE,
    Color.GREEN,
    Color.RED
];

let colorNames: Array<string> = [
    "yellow",
    "blue",
    "white",
    "green",
    "red"
];

export function getColorName(color: Color) {
    return colorNames[color];
}

export const enum Value {
    INVESTMENT = 0,
    INVALID, //ONE does not exist, this is a placeholder so array indexes align
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN
};

export var values: Array<Value> = [
    Value.INVESTMENT,
    Value.TWO,
    Value.THREE,
    Value.FOUR,
    Value.FIVE,
    Value.SIX,
    Value.SEVEN,
    Value.EIGHT,
    Value.NINE,
    Value.TEN
];

export var valueNames: Array<string> = [
    "investment",
    "invalid",//one does not exist
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten"
];

export function getColorScore(cards: Array<Card>): number {
    let num_investments = 0;
    let base_score = -OVERHEAD_COST;
    let score = 0;

    for(let i = 0; i < cards.length; i++) {
        let card = cards[i];

        if(card.isInvestment()) {
            num_investments++;
        }
        else {
            base_score += card.value;
        }
    }
    score = base_score * (num_investments + 1);
    if(cards.length >= BONUS_COUNT) {
        score += BONUS_VALUE;
    }
    return score;
}


export class Card {
    constructor(
        public color: Color,
        public value: number
    )
    {
    }

    public toString(): string {

        return this.value + ':' + valueNames[this.value] + ':' + colorNames[this.color];
    }

    public equals(card: Card) {
        return (this.color === card.color) && (this.value === card.value);
    }

    public isInvestment(): boolean {
        return this.value === Value.INVESTMENT;
    }
}
