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

        gameService.registerPlayer(0, 'bob', new HumanPlayerAgent());
        gameService.registerPlayer(1, 'robo betty', new AIPlayerAgent(greedyStrategy, scoreTallyHeuristic));

        console.log('starting game');
        gameService.startGame();
    }

    public getBoardState(): BoardState {
        return this.gameService.getGame().getBoardState();
    }
}
