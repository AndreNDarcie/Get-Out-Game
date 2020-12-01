import { Dice } from '../entities/Dice';
import { Game } from '../Game';
import { GameStates } from '../enums/GameStates';
import { Choice } from '../entities/Event';

export enum SkillCheckResults {
    Success,
    CriticialSuccess,
    Failure,
    CriticalFailure
}

export class SkillCheckManager {
    private readonly _game: Game;
    private _travelBtn: HTMLButtonElement;
    private _firstDice: HTMLElement;
    private _secondDice: HTMLElement;
    private _skillCheckExpected: HTMLElement;
    private _skillCheckResultValue: HTMLElement;
    private _skillCheckResultValueLabel: HTMLElement;
    public _resultLabel: HTMLElement;
    private _diceTimer: any; 
    private _currentChoice: Choice;

    constructor() {
        this._game = Game.getInstance();

        this._resultLabel = document.querySelector("#skill-check-result-label");
        this._skillCheckResultValue = document.querySelector("#skill-check-result-value");
        this._skillCheckResultValueLabel = document.querySelector("#skill-check-result-value-label");

        this._travelBtn = document.querySelector("#skill-check-back-btn");
        this._firstDice = document.querySelector("#first-dice");
        this._secondDice = document.querySelector("#second-dice");
        this._skillCheckExpected = document.querySelector("#skill-check-expected");

        this._travelBtn.addEventListener('click', () => { this.onClickTravel() });
        
    }

    start(): void {
        let dice = new Dice();
        this._travelBtn.disabled = true;
        this._resultLabel.style.visibility = 'hidden';
        this._diceTimer = setInterval(() => { this.shakeDice(dice) }, 50);
        setTimeout(() => { this.stopShakeDice(dice) }, 500);
        this._currentChoice = this._game.eventManager.currentChoice;
    }

    onClickTravel() {
        if (this._game.skillCheckResult == SkillCheckResults.Success) {
            this._currentChoice.skillCheckFields.resultPath.success();
        } else if (this._game.skillCheckResult == SkillCheckResults.CriticialSuccess) {
            this._currentChoice.skillCheckFields.resultPath.criticalSuccess();
        } else if (this._game.skillCheckResult == SkillCheckResults.Failure) {
            this._currentChoice.skillCheckFields.resultPath.failure();
        } else if (this._game.skillCheckResult == SkillCheckResults.CriticalFailure) {
            this._currentChoice.skillCheckFields.resultPath.criticalFailure();
        }

        this._game.stateManager.goToState(GameStates.LOG);
    }

    private shakeDice(dice: Dice): void {
        let firstDiceValue = dice.roll();
        let secondDiceValue = dice.roll();
        this.showDiceValues(firstDiceValue, secondDiceValue);
    }

    private stopShakeDice(dice: Dice): void {
        clearInterval(this._diceTimer);
        this._resultLabel.style.visibility = 'visible';

        let firstDiceValue = dice.roll();
        let secondDiceValue = dice.roll();
        let characterStrength = 3;
        let expectedValue = this._currentChoice.skillCheckFields.difficulty;
        let finalValue = firstDiceValue + secondDiceValue + characterStrength;
        this.showDiceValues(firstDiceValue, secondDiceValue);

        this._skillCheckResultValue.style.textAlign = 'center';
        this._skillCheckResultValue.innerHTML = finalValue.toString();
        this._skillCheckExpected.innerHTML = 'Expected: ' + expectedValue.toString();

        this._travelBtn.disabled = false;

        if (firstDiceValue + secondDiceValue == 12) {
            this.setCriticalSuccess();
            this._game.skillCheckResult = SkillCheckResults.CriticialSuccess;
            return;
        }

        if (firstDiceValue + secondDiceValue == 2) {
            this.setCriticalFailure();
            this._game.skillCheckResult = SkillCheckResults.CriticalFailure;
            return;
        }

        if (finalValue >= expectedValue) {
            this.setSuccess();
            this._game.skillCheckResult = SkillCheckResults.Success;
            return;
        }

        if (finalValue < expectedValue) {
            this.setFailure();
            this._game.skillCheckResult = SkillCheckResults.Failure;
            return;
        }
    }

    private showDiceValues(firstDiceValue: number, secondDiceValue: number): void {
        this._firstDice.innerHTML = firstDiceValue.toString();
        this._secondDice.innerHTML = secondDiceValue.toString();
    }

    public setCriticalSuccess(): void {
        this._skillCheckResultValue.style.visibility = 'hidden';
        this._skillCheckResultValueLabel.style.visibility = 'hidden';
        this._skillCheckResultValue.classList.remove('red-color');
        this._skillCheckResultValue.classList.add('green-color');

        this._firstDice.classList.add('green-color');
        this._secondDice.classList.add('green-color');
        this._firstDice.classList.remove('red-color');
        this._secondDice.classList.remove('red-color');

        this._resultLabel.innerHTML = '[ CRITICIAL SUCCESS ]';
        this._resultLabel.style.fontSize = '1.3em';
        this._resultLabel.classList.remove('red-color');
        this._resultLabel.classList.add('green-color');
    }

    public setSuccess(): void {
        this._skillCheckResultValue.style.visibility = 'visible';
        this._skillCheckResultValueLabel.style.visibility = 'visible';
        this._skillCheckResultValue.classList.remove('red-color');
        this._skillCheckResultValue.classList.add('green-color');

        this._firstDice.classList.remove('green-color');
        this._secondDice.classList.remove('green-color');
        this._firstDice.classList.remove('red-color');
        this._secondDice.classList.remove('red-color');
        
        this._resultLabel.innerHTML = '[ SUCCESS ]';
        this._resultLabel.style.fontSize = '2.5em';
        this._resultLabel.classList.remove('red-color');
        this._resultLabel.classList.add('green-color');
    }

    public setCriticalFailure(): void {
        this._skillCheckResultValue.style.visibility = 'hidden';
        this._skillCheckResultValueLabel.style.visibility = 'hidden';
        this._skillCheckResultValue.classList.add('red-color');
        this._skillCheckResultValue.classList.remove('green-color');

        this._firstDice.classList.remove('green-color');
        this._secondDice.classList.remove('green-color');
        this._firstDice.classList.add('red-color');
        this._secondDice.classList.add('red-color');

        this._resultLabel.innerHTML = '[ CRITICIAL FAILURE ]';
        this._resultLabel.style.fontSize = '1.3em';
        this._resultLabel.classList.add('red-color');
        this._resultLabel.classList.remove('green-color');
    }

    public setFailure(): void {
        this._skillCheckResultValue.style.visibility = 'visible';
        this._skillCheckResultValueLabel.style.visibility = 'visible';
        this._skillCheckResultValue.classList.add('red-color');
        this._skillCheckResultValue.classList.remove('green-color');

        this._firstDice.classList.remove('green-color');
        this._secondDice.classList.remove('green-color');
        this._firstDice.classList.remove('red-color');
        this._secondDice.classList.remove('red-color');

        this._resultLabel.innerHTML = '[ FAILURE ]';
        this._resultLabel.style.fontSize = '2.5em';
        this._resultLabel.classList.add('red-color');
        this._resultLabel.classList.remove('green-color');
    }
}