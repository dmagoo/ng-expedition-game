import { BoardState } from './boardstate';

export interface Move {
    apply(boardState: BoardState): BoardState;
}

//draw from deck
export class DrawBlindMove implements Move {
    public apply(boardState: BoardState): BoardState {
        return boardState;
    }
}

//draw from discard pile
export class DrawDiscardedMove implements Move {
    public apply(boardState: BoardState): BoardState {
        return boardState;
    }
}

//discard to a discard pile
export class DiscardMove implements Move {
    public apply(boardState: BoardState): BoardState {
        return boardState;
    }
}

export class PlayCardMove implements Move {
    public apply(boardState: BoardState): BoardState {
        return boardState;
    }
}
