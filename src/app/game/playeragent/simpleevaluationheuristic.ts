import {
    BoardState,
    TurnPhase
} from '../boardstate'; 
import { Heuristic } from './ai';
import {
    colors,
    getColorScore
} from '../card';

let simpleEvaluationHeuristic: Heuristic;

//not a useful heuristic, because the ai will always see starting a run as a negative
//ai will always discard
simpleEvaluationHeuristic = function(boardState: BoardState): number {
    //let score = boardState.getCurrentPlayer().getScore() - boardState.getCurrentOpponent().getScore();
    let currentPlayer = boardState.getCurrentPlayer();
    let currentOpponent = boardState.getCurrentOpponent();
    let cardsByColorPlayer = [];
    let cardsByColorOpponent = [];
    let maxPlayedCardsByColorPlayer = [];
    let maxPlayedCardsByColorOpponent = [];

    for(let color of colors) {
        cardsByColorPlayer[color] = currentPlayer.playedCards[color].cards;
        cardsByColorOpponent[color] = currentOpponent.playedCards[color].cards;
        maxPlayedCardsByColorPlayer[color] = cardsByColorPlayer[cardsByColorPlayer.length-1];
        maxPlayedCardsByColorOpponent[color] = cardsByColorOpponent[cardsByColorOpponent.length-1];
    }

    for(let card of currentPlayer.hand) {
        if(card.value >= maxPlayedCardsByColorPlayer[card.color]) {
            cardsByColorPlayer[card.color].push(card);
        }
    }

    for(let card of currentOpponent.hand) {
        if(card.value >= maxPlayedCardsByColorOpponent[card.color]) {
            cardsByColorOpponent[card.color].push(card);
        }
    }

    //if we are in draw phase, value top card of each pile as well
    for(let color of colors) {
        if(TurnPhase.DRAW_CARD === boardState.turnPhase) {
            try {
                let card = boardState.discardPiles[color].peekTopCard();
                if(card.value >= maxPlayedCardsByColorPlayer[card.color]) {
                    cardsByColorPlayer[card.color].push(card);
                }
            }
            catch(e) {
                //empty stack
            }
        }
    }   

    
    let playerScore = 0;
    let opponentScore = 0;

    for(let color of colors) {
        playerScore += getColorScore(cardsByColorPlayer[color]);
        opponentScore += getColorScore(cardsByColorOpponent[color]);
    }

    return playerScore - opponentScore;

};
export { simpleEvaluationHeuristic };
