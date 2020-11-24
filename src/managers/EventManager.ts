import { Event, EventType, Choice } from '../entities/Event';
import { Game } from '../Game';
import { EventSeeds } from '../seeds/EventSeeds';
import { GameStates } from '../enums/GameStates';

export class EventManager {
    private _titleElement: HTMLElement;
    private _descriptionElement: HTMLElement;
    private _eventPageChoicesBtnListElement: HTMLElement;
    private _imageElement: HTMLImageElement;
    private _currentEvent: Event;
    public currentChoice: Choice;
    private readonly _game: Game;

    constructor() {
        this._titleElement = document.getElementById("event-page-title");
        this._descriptionElement = document.getElementById("event-page-description");
        this._eventPageChoicesBtnListElement = document.getElementById("event-page-choices-btn-list");
        this._imageElement = document.getElementById("event-page-image") as HTMLImageElement;
        this._game = Game.getInstance();
    }

    start(): void {
        this._eventPageChoicesBtnListElement.innerHTML = '';
        const eventSeeds = new EventSeeds();
        eventSeeds.start();
        let events = eventSeeds.events;

        let randomEventType: number = this._game.getRandomArbitrary(2);

        if (this.checkForMileStone()) {
            this._currentEvent = eventSeeds.getMileStoneEvent();
        } else if (randomEventType == 0) {
            this._currentEvent = eventSeeds.getCombatEvent();
        } else {
            this._currentEvent = eventSeeds.getPlaceEvent();
        }

        this.showWaitingMessage();
    }

    private showChoices() {
        this._eventPageChoicesBtnListElement.innerHTML = '';

        for (let choice of this.currentEvent.choices) {
            const button = document.createElement("button");
            button.appendChild(document.createTextNode(choice.buttonText));
            button.addEventListener('click', () => this.selectChoice(choice));
            this._eventPageChoicesBtnListElement.appendChild(button);
        }
    }

    private selectChoice(choice: Choice) {
        this.currentChoice = choice;

        if (this.currentChoice.skillCheck) {
            this._game.stateManager.goToState(GameStates.SKILLCHECK);
            return;
        }

        if (this.currentEvent.type == EventType.Place && choice.buttonText == 'Investigate (Exploration)') {
            this._game.stateManager.goToState(GameStates.ITEM_PICKER);
            return;
        }

        this.currentChoice.normalResultPath();
        this.checkLogs();
    }

    get currentEvent(): Event {
        return this._currentEvent;
    }

    private checkForMileStone(): boolean {
        return (this._game.distanceToTheBorder == 250 ||
            this._game.distanceToTheBorder == 200 ||
            this._game.distanceToTheBorder == 150 ||
            this._game.distanceToTheBorder == 100 ||
            this._game.distanceToTheBorder == 50);
    }

    showWaitingMessage(): void {
        this._titleElement.style.display = 'none';
        this._descriptionElement.innerHTML = 'Something happened!'
        this._imageElement.style.display = 'none';

        setTimeout(() => this.showEvent(), 1000);
    }

    showEvent(): void {
        this._titleElement.style.display = 'block';
        this._titleElement.innerHTML = this._currentEvent.name;
        this._descriptionElement.innerHTML = this._currentEvent.description;
        
        if (this._currentEvent.image != '') {
            this._imageElement.src = this._currentEvent.image;
        }

        this._imageElement.style.display = 'block';
        this.showChoices();
    }

    checkLogs(): void {
        if (this._game.log.isThereAnyTemporaryLog()) {
            this._game.stateManager.goToState(GameStates.LOG);
        } else {
            this._game.stateManager.goToState(GameStates.TRAVEL);
        }
    }
}