import { BoardState } from '../boardstate';
import { Move } from '../move';

export abstract class PlayerAgent {
    abstract findMove(boardState: BoardState): Move;
}
