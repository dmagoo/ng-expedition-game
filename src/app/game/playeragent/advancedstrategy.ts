import {
    BoardState,
    TurnPhase
} from '../boardstate';


import {
    Card,
    colors,
    Value,
    getColorScore
} from '../card';

import { Action,
         UseCardAction,
         DrawCardAction,
         listActions,
         DiscardCardAction,
         DrawDiscardedAction,
         DrawBlindAction,
         PlayCardAction
       } from '../action';
import { Turn } from '../turn';
import {
    Strategy,
    Heuristic
} from './ai';
import { scoreTallyHeuristic } from './scoretallyheuristic';

let advancedStrategy: Strategy;

let advancedStrategyOld: Strategy;

advancedStrategy = function(boardState: BoardState, heuristic: Heuristic): Turn {
    let bestTurn: Turn = null;
    let bestScore = -1000;
    let bestPlayAction: UseCardAction = null;
    let bestDrawAction: DrawCardAction = null;
    if(TurnPhase.PLAY_CARD !== boardState.turnPhase) {
        throw new Error('cannot start agent mid-turn');
    }

    //let possiblePlayActions = listActions(boardState);
    //let potentialColorScores = getPotentialColorScores(boardState);

    let playCandidates = [];
    let discardCandidates = [];
    let player = boardState.getCurrentPlayer();
    let boardAnalysis = new BoardAnalysis(boardState);
    let possibleActions = null;
    if(boardAnalysis.safePlayCards.length > 0) {
        playCandidates.push(new PlayCardAction(boardAnalysis.safePlayCards[0]));
    }

    if(boardAnalysis.safeDiscardCards.length > 0) {
        discardCandidates.push(new DiscardCardAction(boardAnalysis.safeDiscardCards[0]));
    }
    console.log(player.name + '\'s hand: ');
    console.log(player.hand);

    if(playCandidates.length > 0) {
        console.log(playCandidates);
        bestPlayAction = playCandidates[0];
        console.log('safe play');
        console.log(bestPlayAction);
    }
    else if(discardCandidates.length > 0) {
        bestPlayAction = discardCandidates[0];
        console.log('safe discard');
        console.log(bestPlayAction);        
    }
    else {
        //for now, just picking an arbitrary play move
        //todo pick better play option
        possibleActions =  listActions(boardState);
        //bestPlayAction = possibleActions[Math.floor(Math.random()*possibleActions.length)];

        let weightedActions = [];
        for(let action of possibleActions) {
            if(action instanceof PlayCardAction) {
                //jst play the lowest scoring card for now.. dumb, doesn't care about color potential
                weightedActions.push([boardAnalysis.getCardWorth(action.card), action]);
            }
            else if(action instanceof DiscardCardAction) {
                //discard something of low value
                weightedActions.push([boardAnalysis.getCardWorth(action.card), action]);
            }
        }
        weightedActions.sort(function(a,b) {
            return a[0] - b[0];
        });
        bestPlayAction = weightedActions[0][1];
    }

    //for now, just picking an arbitrary draw move
    let boardStateCopy = boardState.copy();
    bestPlayAction.applyTo(boardStateCopy);
    possibleActions =  listActions(boardStateCopy);

    let weightedActions = [];
    for(let action of possibleActions) {
        if(action instanceof DrawDiscardedAction) {
            //quick hack to avoid redrawing card they just discarded,
            //move this to "possible moves" funciton
            if(bestPlayAction instanceof DiscardCardAction)
            {
                if(bestPlayAction.card.color === action.color) {
                    continue;
                }
            }
            //jst draw a valuable card
            weightedActions.push(
                [
                boardAnalysis.getCardWorth(boardStateCopy.discardPiles[action.color].peekTopCard()),
                action
            ]
            );

        }
        else if(action instanceof DrawBlindAction) {
            //draw blind, arbitrary weight 5
            weightedActions.push([5, action]);
        }
    }

    weightedActions.sort(function(a,b) {
        return a[0] - b[0];
    });
    console.log('wd');
    console.log(weightedActions);
    bestDrawAction = weightedActions[weightedActions.length-1][1];

    //bestDrawAction =  possibleActions[Math.floor(Math.random()*possibleActions.length)];
    return  new Turn(bestPlayAction, bestDrawAction);

};


advancedStrategyOld = function(boardState: BoardState, heuristic: Heuristic): Turn {
    let bestTurn: Turn = null;
    let bestScore = -1000;

    if(TurnPhase.PLAY_CARD !== boardState.turnPhase) {
        throw new Error('cannot start agent mid-turn');
    }

    /*
      console.log('possible actions: ');
      console.log(listActions(boardState));
    */

    let potentialColorScores = getPotentialColorScores(boardState);
    //console.log('getting pot scores');
    //console.log(potentialColorScores);

    if(1===1*1 && (1===1+1)) {
        console.log(boardState);
        throw new Error('bail');
    }

    for(let playAction of listActions(boardState)) {
        let playActionBoardCopy = boardState.copy();

        playAction.applyTo(playActionBoardCopy);

        //console.log('peeking discard pile...');
        let potentialDiscardDraws = [];

        for(let discardPile of boardState.discardPiles) {
            try {
                potentialDiscardDraws.push(discardPile.peekTopCard());
// playActionBoardCopy.getCurrentPlayer().playedCards[discardPile.color].cardsByColorPlayer.length-1];
                //console.log(card);
            }
            catch(e) {
                //nothing to do
            }
        }

        //console.group();

        //for(let card of potentialDiscardDraws) {
          //  console.log(card);
            //console.log('potential: ' + potentialColorScores[card.color]);
//        }
  //      console.log('potential discard draws...');
    //    console.groupEnd();
        let drawAction = new DrawBlindAction();
      //  console.log('doing draw, applying action');
//        console.log(drawAction);

        drawAction.applyTo(playActionBoardCopy);

//        console.log('did draw');
        //        let newScore = advancedScore(playActionBoardCopy, heuristic, boardState.getCurrentPlayer().order, 0);
        let newScore = -10000;

        if (newScore > bestScore || null === bestTurn) {
                //console.log('new best turn');
            //console.log(playAction);
            //console.log('replaces');
            //console.log(bestTurn);
            bestScore = newScore;
            bestTurn = new Turn(playAction, drawAction);
            //console.log('new best');
//            console.log(bestTurn);
        }
        else {
            console.log('not the best');
        }
        
        /*
        for(let drawAction of listActions(playActionBoardCopy)) {
            let drawActionBoardCopy = playActionBoardCopy.copy();

            drawAction.applyTo(drawActionBoardCopy);

            let newScore = advancedScore(drawActionBoardCopy, heuristic, boardState.getCurrentPlayer().order, 3);

            if (newScore > bestScore || null === bestTurn) {
                //console.log('new best turn');
                //console.log(playAction);
                //console.log('replaces');
                //console.log(bestTurn);
                bestScore = newScore;
                bestTurn = new Turn(playAction, drawAction);
            }
        }
        */
    }
//    console.log('out of the loop');
  //  console.groupEnd();
//    console.log('returning best turn');
//    console.log(bestTurn);
    return bestTurn;

};

function advancedScore(boardState: BoardState, heuristic: Heuristic, maxPlayer: number, maxDepth: number) {

    let bestTurn = null;
    let bestScore = -1000;
    
    if(boardState.gameOver()) {
        //negate the score if the opponent is the current player
        //return normalizeScore(boardState, heuristic(boardState), maxPlayer);
        ///quick and dirty method to make a winner shine through
        return normalizeScore(boardState, scoreTallyHeuristic(boardState)*100, maxPlayer);
    }

    if(maxDepth !== -1 && maxDepth !== null) {
        maxDepth--;
    }
    


    //    let boardStateCopy = boardState.copy();
    for(let playAction of listActions(boardState)) {

        let playActionBoardCopy = boardState.copy();

        playAction.applyTo(playActionBoardCopy);

        for(let drawAction of listActions(playActionBoardCopy)) {
            let drawActionBoardCopy = playActionBoardCopy.copy();

            drawAction.applyTo(drawActionBoardCopy);

            var newScore;

            if(maxDepth !== -1) {
                newScore = advancedScore(drawActionBoardCopy, heuristic, maxPlayer, maxDepth);
            }
            else {
                newScore = normalizeScore(drawActionBoardCopy, heuristic(drawActionBoardCopy), maxPlayer);
            }

            
            if (newScore > bestScore || null === bestTurn) {
                bestScore = newScore;
                //bestTurn = new Turn(playAction, drawAction);
            }
           
                
        }

    }

    return bestScore;//heuristic(boardState);
}

//returns a score relative to maxPlayer (flipping to negative if max is the current opponent)
function normalizeScore(boardState: BoardState, score:number, maxPlayer: number): number {
    return (boardState.getCurrentPlayer().order === maxPlayer ? 1 : -1) * score;
}

function getPotentialColorScores(boardState: BoardState) {

    let currentPlayer = boardState.getCurrentPlayer();
    //let currentOpponent = boardState.getCurrentOpponent();
    let cardsByColorPlayer = [];
    //let cardsByColorOpponent = [];
    let maxPlayedCardsByColorPlayer = [];
    //let maxPlayedCardsByColorOpponent = [];

    //potential total score for a color
    let potentialScoreByColor = [];

    for(let color of colors) {
        //MAKE SURE IT'S A COPY! We're going to be messing w/ this array
        cardsByColorPlayer[color] = currentPlayer.playedCards[color].cards.slice();
        //cardsByColorOpponent[color] = currentOpponent.playedCards[color].cards;
        //maxPlayedCardsByColorPlayer[color] = cardsByColorPlayer[cardsByColorPlayer.length-1];
        maxPlayedCardsByColorPlayer[color] = cardsByColorPlayer[color].length > 0 ?
            cardsByColorPlayer[color][cardsByColorPlayer[color].length-1]:
            0;
        
        //maxPlayedCardsByColorOpponent[color] = cardsByColorOpponent[cardsByColorOpponent.length-1];
    }

    //cards in hand are potential for scoring
    for(let card of currentPlayer.hand) {
        if(card.value >= maxPlayedCardsByColorPlayer[card.color]) {
            cardsByColorPlayer[card.color].push(card);
        }
    }

    //discarded cards have potential for scoring if they are playable
    //by the current player
    for(let discardPile of boardState.discardPiles ) {
        for(let card of discardPile.cards) {
            if(card.value >= maxPlayedCardsByColorPlayer[card.color]) {
                cardsByColorPlayer[card.color].push(card);
            }
        }
    }

    for(let color of colors) {
        //todo, add any cards who may be in the deck (not in player's play area)
        //include unfound investment cards
        potentialScoreByColor[color] = getColorScore(cardsByColorPlayer[color]);
    }
    console.log('returning');
    //console.log(maxPlayedCardsByColorPlayer);
    //console.log(cardsByColorPlayer);
    return potentialScoreByColor;
}

class BoardAnalysis {

    public colorPriority: {[c: number]: number;};

    private maxPlayedByColorPlayer:  {[c: number]: number;};
    private maxPlayedByColorOpponent:   {[c: number]: number;};

    //map card hash to a value
    private cardWorth: {[c: string]: number;} = null;

    //return a list of cards that can be played into an existing
    //color pile (player has initiated the pile w/ a prior card)
    //without leaving any unrealized points (skipping cards)
    //take into account cards played by the opponent
    //so if player has played a two, and has a four
    //but opponent has played the three,
    //the card is safe to play
    public safePlayCards: Array<Card>;

    public safeDiscardCards: Array<Card>;
    
    constructor(private boardState: BoardState) {
        this.scanPlayAreas();
        this.scanHand();
    }

    //how much the card is worth (not in final scoring, but weighted, considering
    //opponent.  Mainly used for discard and draw considerations
    public getCardWorth(card: Card): number {
        if(null === this.cardWorth) {
            this.cardWorth = {};
        }

        if((card.color + ':' + card.value) in this.cardWorth) {
            return this.cardWorth[card.color + ':' + card.value];
        }

        let currentPlayer = this.boardState.getCurrentPlayer();
        let currentOpponent = this.boardState.getCurrentOpponent();


        let val = 0;

        for(let cardPile of [currentPlayer.playedCards[card.color],currentOpponent.playedCards[card.color]]) {
            if(cardPile.canAddCard(card)) {
                if(card.isInvestment()) {
                    val = 10;//todo: anything better
                }
                else {
                    val += (card.value * cardPile.investmentMultiplier());
                }
            }
        }

        this.cardWorth[card.color + ':' + card.value] = val;

        return val;
    }


    private scanHand():void {
        let currentPlayer = this.boardState.getCurrentPlayer();
        let currentOpponent = this.boardState.getCurrentOpponent();
        this.safePlayCards = [];
        this.safeDiscardCards = [];

        for(let card of currentPlayer.hand) {

            let cardSorted = false;
            
            if(currentPlayer.playedCards[card.color].canAddCard(card)) {

                //last card played was the previous card value
                //(one less or equal to)
                if(
                    (
                    (card.value !== Value.INVESTMENT) &&
                    (card.value - this.maxPlayedByColorPlayer[card.color]) < 1) &&
                        (currentPlayer.playedCards[card.color].length > 0)
                    
                ) {
                    this.safePlayCards.push(card);
                    cardSorted = true;
                }
                else {
                    //todo, scan lesser cards to see if they are in play by opponent
                    //determining whether by playing this card, we miss no opportunites
                    let i = card.value-1;
                    let safe = card.value !== Value.INVESTMENT;
                    while(i > this.maxPlayedByColorPlayer[card.color]) {
                        if(!currentOpponent.playedCards[card.color].cards.find(tmpCard => tmpCard.value === i)) {
                            safe = false;
                        }
                        i--;
                    }
                    if(safe) {
                        this.safePlayCards.push(card);
                        cardSorted = true;
                    }
                }
            }
            //else cannot play this card
            else {
                if(!currentOpponent.playedCards[card.color].canAddCard(card)) {
                    this.safeDiscardCards.push(card);
                }
            }
        }
    }

    private scanPlayAreas(): void {
        let currentPlayer = this.boardState.getCurrentPlayer();
        let currentOpponent = this.boardState.getCurrentOpponent();
        this.maxPlayedByColorPlayer = {};
        this.maxPlayedByColorOpponent = {};

        //make a list of the last played card of each color for each opponent
        for(let color of colors) {

            let playedCards = currentPlayer.playedCards[color].cards.slice();

            this.maxPlayedByColorPlayer[color] = playedCards.length > 0 ?
                playedCards[playedCards.length-1].value:
                0;


            playedCards = currentOpponent.playedCards[color].cards.slice();

            this.maxPlayedByColorOpponent[color] = playedCards.length > 0 ?
                playedCards[playedCards.length-1].value:
                0;
        }
    }

}






export { advancedStrategy }
