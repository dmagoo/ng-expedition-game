import { BoardState } from '../boardstate';
import { Turn } from '../turn';

//a function that returns a score describing the strength of the board state for the current player
//higher is better
export interface Heuristic {
    (boardState: BoardState): number;
}

//a function that returns the "best" turn as described by a search strategy (min/max, greedy, etc)
//and a board-evaluation heuristic
export interface Strategy {
    (boardState: BoardState, heuristic: Heuristic): Turn;
}
