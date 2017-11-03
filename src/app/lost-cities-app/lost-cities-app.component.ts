import { Component } from '@angular/core';

import { LostCitiesGameService } from '../services/lost-cities-game.service'; 
import { BoardState } from '../game/boardstate';
import { HumanPlayerAgent } from '../game/playeragent/humanplayeragent';
import { AIPlayerAgent } from '../game/playeragent/aiplayeragent';
import { greedyStrategy } from '../game/playeragent/greedystrategy';
import { scoreTallyHeuristic } from '../game/playeragent/scoretallyheuristic';

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

        gameService.registerPlayer(0, 'Chuck', new HumanPlayerAgent());
        //gameService.registerPlayer(0, 'Anne Droid', new AIPlayerAgent(greedyStrategy, scoreTallyHeuristic));
        gameService.registerPlayer(1, 'Robo-Betty', new AIPlayerAgent(greedyStrategy, scoreTallyHeuristic));
        //gameService.registerPlayer(1, 'Sarah', new HumanPlayerAgent());

        console.log('starting game');
        gameService.startGame();
    }

    public getBoardState(): BoardState {
        return this.gameService.getGame().getBoardState();
    }
}
