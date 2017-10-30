import { BoardState } from '../boardstate';
import {
    Strategy,
    Heuristic
} from './ai';
import { Turn } from '../turn';

let greedyStrategy: Strategy;
greedyStrategy = function(boardState: BoardState, heuristic: Heuristic): Turn {
    return null;
};

export { greedyStrategy };
