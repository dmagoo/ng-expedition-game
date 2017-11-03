import { BoardState } from '../boardstate'; 
import{ Heuristic } from './ai';
let scoreTallyHeuristic: Heuristic;

//not a useful heuristic, because the ai will always see starting a run as a negative
//ai will always discard
scoreTallyHeuristic = function(boardState: BoardState): number {
    return boardState.getCurrentPlayer().getScore() - boardState.getCurrentOpponent().getScore();
};
export { scoreTallyHeuristic };
