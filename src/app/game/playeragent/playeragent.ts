import { BoardState } from '../boardstate';

export abstract class PlayerAgent {
    abstract findMove(boardState: BoardState): Move;
}
