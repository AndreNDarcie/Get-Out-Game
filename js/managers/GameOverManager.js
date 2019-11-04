import { Globals } from '../Globals.js';

export class GameOverManager {
    
    constructor(game) {
        this.game = game;

        this.gameOverMessage = document.querySelector("#game-over-message");
    }

    start() {

        let livingCharacters = 0;

        for (var i = 0; i < Globals.characters.length; i++){
            const character = Globals.characters[i];

            if (character.health > 0) {
                livingCharacters++;
            }
        }

        this.setGameOverMessage(livingCharacters + " of " + Globals.characters.length + " survived!");
    }

    setGameOverMessage(message) {
        this.gameOverMessage.innerHTML = message;
    }
}