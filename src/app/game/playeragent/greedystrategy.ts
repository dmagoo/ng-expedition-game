import {
    BoardState,
    TurnPhase
} from '../boardstate';
import { Action,
         listActions
       } from '../action';
import { Turn } from '../turn';
import {
    Strategy,
    Heuristic
} from './ai';


let greedyStrategy: Strategy;
greedyStrategy = function(boardState: BoardState, heuristic: Heuristic): Turn {
    let bestPlayAction: Action = null;
    let bestDrawAction: Action = null;
    
    if(TurnPhase.PLAY_CARD !== boardState.turnPhase) {
        throw new Error('cannot start agent mid-turn');
    }

    //get all play options
    let possibleActions = listActions(boardState);

    if(0 === possibleActions.length) {
        throw new Error('No possible play actions found.');
    }

    let boardStateCopy;
    let bestScore = -1000;
    for(let action of possibleActions) {
        boardStateCopy = boardState.copy();

        action.applyTo(boardStateCopy);
        if(null === bestPlayAction) {
            bestPlayAction = action;
        }
    }

    boardStateCopy = boardState.copy();
    bestPlayAction.applyTo(boardStateCopy);

    //get all draw options
    possibleActions = listActions(boardStateCopy);

    let boardStateSecondCopy;
    bestScore = -1000;
    for(let action of possibleActions) {
        boardStateSecondCopy = boardStateCopy.copy();
        action.applyTo(boardStateSecondCopy);
        if(null === bestDrawAction) {
            bestDrawAction = action;
        }
    }

    return new Turn(bestPlayAction, bestDrawAction);
};

export { greedyStrategy };
