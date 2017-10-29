import { Injectable } from '@angular/core';

import { Game } from '../game/game';

@Injectable()
export class LostCitiesGameService {

    private game: Game;
    
    constructor() {
        this.game = new Game();
    }

    public getGame(): Game {
        return this.game;
    }

    public startGame(): void {
        this.game.start();
    }
}
