import { PlayerAgent } from './playeragent';
import { BoardState } from '../boardstate';
import { Move } from '../move';

export class HumanPlayerAgent extends PlayerAgent {

    findMove(boardState: BoardState): Move {
        return null;
    }

}
