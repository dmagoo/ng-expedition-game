import { BoardState } from '../boardstate';
import { Move } from '../move';

//a function that returns a score describing the strength of the board state for the current player
//higher is better
interface Heuristic {
    (boardState: BoardState): number;
}

//a function that returns the "best" move as described by a search strategy (min/max, greedy, etc)
//and a board-evaluation heuristic
interface Strategy {
    (boardState: BoardState, heuristic: Heuristic): Move;
}
