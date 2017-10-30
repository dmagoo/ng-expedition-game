import { BoardState } from '../boardstate'; 
import{ Heuristic } from './ai';
let scoreTallyHeuristic: Heuristic;
scoreTallyHeuristic = function(boardState: BoardState): number {
    return 1;
};
export { scoreTallyHeuristic };
