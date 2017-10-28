import { PlayerAgent } from './playeragent';
import { BoardState } from '../boardstate';
import { Turn } from '../turn';

export class HumanPlayerAgent extends PlayerAgent {

    findTurn(boardState: BoardState): Turn {
        return null;
    }

}
