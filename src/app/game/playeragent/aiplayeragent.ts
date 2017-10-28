import { PlayerAgent } from './playeragent';
import { BoardState } from '../boardstate';
import { Turn } from '../turn';

import {
    Strategy,
    Heuristic
} from './ai';

export class AIPlayerAgent extends PlayerAgent {

    constructor(private strategy: Strategy, private heuristic: Heuristic) {
        super();
    }

    findTurn(boardState: BoardState): Turn {
        return null;
    }

}
