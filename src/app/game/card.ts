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

export var colorNames: Array<string> = [
    "yellow",
    "blue",
    "white",
    "green",
    "red"
];

export const enum Value {
    INVESTMENT = 0,
    ONE,
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
    Value.ONE,
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
    "one",
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

export class Card {
    constructor(
        public color: Color,
        public value: number
    )
    {
    }

    public toString(): string {
        return valueNames[this.value] + ':' + colorNames[this.color];
    }

    public equals(card: Card) {
        return (this.color === card.color) && (this.value === card.value);
    }
}
