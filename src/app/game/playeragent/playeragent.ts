import { BoardState } from '../boardstate';
import { Turn } from '../turn';

export abstract class PlayerAgent {
    abstract findTurn(boardState: BoardState): Turn;
}
