import { Component } from '@angular/core';

import { LostCitiesGameService } from '../services/lost-cities-game.service'; 
import { BoardState } from '../game/boardstate';
import { HumanPlayerAgent } from '../game/playeragent/humanplayeragent';
import { AIPlayerAgent } from '../game/playeragent/aiplayeragent';
import { greedyStrategy } from '../game/playeragent/greedystrategy';
import { advancedStrategy } from '../game/playeragent/advancedstrategy';
import { scoreTallyHeuristic } from '../game/playeragent/scoretallyheuristic';
import { simpleEvaluationHeuristic } from '../game/playeragent/simpleevaluationheuristic';

@Component({
  selector: 'lost-cities-app',
  templateUrl: './lost-cities-app.component.html',
  styleUrls: ['./lost-cities-app.component.css']
})
export class LostCitiesAppComponent {
  title = 'Game Thing';

    constructor(
        private gameService: LostCitiesGameService
    ) {
        //gameService.registerPlayer(0, 'Chuck Mann', new HumanPlayerAgent());
        //gameService.registerPlayer(0, 'Anne Droid', new AIPlayerAgent(greedyStrategy, scoreTallyHeuristic));
        gameService.registerPlayer(0, 'Will Clunk', new AIPlayerAgent(greedyStrategy, simpleEvaluationHeuristic));
        //gameService.registerPlayer(0, 'Min Max', new AIPlayerAgent(advancedStrategy, simpleEvaluationHeuristic));
        //gameService.registerPlayer(1, 'Sarah Human', new HumanPlayerAgent());
        //gameService.registerPlayer(1, 'Dumbot', new AIPlayerAgent(greedyStrategy, scoreTallyHeuristic))
        gameService.registerPlayer(1, 'Hal', new AIPlayerAgent(advancedStrategy, simpleEvaluationHeuristic));
        //gameService.registerPlayer(1, 'Robo-Betty', new AIPlayerAgent(greedyStrategy, simpleEvaluationHeuristic));

        console.log('setting game to stick w/ player-1 pov');
        gameService.setStickyPlayer(0);
        
        console.log('starting game');
        gameService.startGame();
    }

    public getBoardState(): BoardState {
        return this.gameService.getGame().getBoardState();
    }
}
