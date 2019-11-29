import { Game, GameStates } from '../Game';

export class Character {
    private _name: string;
    private _health: number;
    private _kinship: string;
    private _isDead: boolean = false;
    private _sick: boolean = false;
    private _hungry: number;
    private _thirst: number;
    private _cold: boolean = false;
    private _maxHealth: number;
    private _limitForHungry: number;
    private _stamina: number;
    private _maxStamina: number = 100;
    private readonly _game: Game;

    constructor(name: string, health: number, kinship: string, sick: boolean, hungry: number, thirst: number, cold: boolean, maxHealth: number, limitForHungry: number) {
        this._name = name;
        this._health = health;
        this._kinship = kinship;
        this._isDead = false;
        this._sick = sick;
        this._hungry = hungry;
        this._cold = cold;
        this._maxHealth = maxHealth;
        this._thirst = thirst;
        this._limitForHungry = limitForHungry;
        this._stamina = this._maxStamina;
        this._game = Game.getInstance();
    }

    get name() {
        return this._name;
    }

    get isDead() {
        return this._isDead;
    }

    get health() {
        return this._health;
    }

    get stamina() {
        return this._stamina;
    }

    get kinship() {
        return this._kinship;
    }

    get maxHealth() {
        return this._maxHealth;
    }

    increaseHungry() {
        if (this._hungry >= this._limitForHungry) {
            this.looseHealth(1);

            if (this._isDead) {
                this._game.log.addTempLog(this._name + ' starved to death at day ' + this._game.currentDay);
            } else {
                this._game.log.addTempLog(this._name + ' is starving to death');
            }
            
        } else {
            this._hungry++;
        }
    }

    increaseStaminaToMax() {
        this._stamina = this._maxStamina;
    }

    decreaseStamina(staminaToDecrease: number) {
        if (staminaToDecrease <= 0) {
            throw new Error('Stamina value must be greater than zero');
        }

        this._stamina = this._stamina - staminaToDecrease;

        if (this._stamina <= 0) {
            this._stamina = 0;

            this.looseHealth(1);

            if (this._isDead) {
                this._game.log.addTempLog(this._name + ' died of exhaustion at day ' + this._game.currentDay);
            } else {
                this._game.log.addTempLog(this._name + ' is dying of tiredness');
            }
        }
    }

    decreaseHungry(hungryToDecrease: number) {
        if (hungryToDecrease < 0) {
            throw new Error('Hungry value must be greater than zero');
        }

        if (this._hungry > 0) {
            this._hungry = this._hungry - hungryToDecrease;
        }
    }

    getHungry(): string {
        if (this._hungry >= 6 && this._hungry < 12) {
            return '[HUNGRY]';
        } else if (this._hungry >= 12) {
            return '[VERY HUNGRY]'
        }

        return '';
    }

    getStamina(): string {
        if (this._stamina < (this._maxStamina / 3)) {
            return '[VERY TIRED]';
        } else if (this._stamina < ((this._maxStamina / 3) * 2)) {
            return '[TIRED]';
        }

        return '';
    }

    looseHealth(healthToLoose: number): void {
        if (healthToLoose < 0 || healthToLoose > this._maxHealth) {
            throw new Error('Invalid value for healthToLoose');
        }

        if (this._health > 0) {
            this._health -= healthToLoose;

            if (this._health <= 0) {
                this._health = 0;
                this._isDead = true;

                if (this._kinship == 'you') {
                    this._game.goToState(GameStates.GAME_OVER);
                }
            }
        }
    }
}