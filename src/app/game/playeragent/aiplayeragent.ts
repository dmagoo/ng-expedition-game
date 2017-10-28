import { PlayerAgent } from './playeragent';
import { BoardState } from '../boardstate';
import { Move } from '../move';

import {
    Strategy,
    Heuristic
} from './ai';

export class AIPlayerAgent extends PlayerAgent {

    constructor(private strategy: Strategy, private heuristic: Heuristic) {
        super();
    }

    findMove(boardState: BoardState): Move {
        return null;
    }

}
