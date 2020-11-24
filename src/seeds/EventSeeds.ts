import { Character } from '../entities/Character';
import { Event, EventType } from '../entities/Event';
import { Item } from '../entities/Item';
import { Game } from '../Game';
import { ItemSeeds } from '../seeds/ItemSeeds';
import { LogType } from '../managers/LogManager';
import { DiceManager } from '../managers/DiceManager';
import { Dice } from '../entities/Dice';
import { SkillCheckResults } from '../managers/SkillCheckManager';
import { GameStates } from '../enums/GameStates';
import { AfflictionSeeds } from './AfflictionSeeds';

export class EventSeeds {
    private _events: Event[];
    private _game: Game;
    private _imageUrlList: string[] = [];

    constructor() {
        this._game = Game.getInstance();

        for (let i = 0; i < 8; i++) {
            this._imageUrlList[i] = (document.getElementById("event-page-image-" + (i + 1)) as HTMLImageElement).src;
        }

        this._events = [];
    }

    start() {
        this.events.push(new Event(
            'Wild Wolf Appeared',
            'He jumps furiously wanting blood!', 
            '',
            [{ 
                buttonText: 'Throw a stone',
                skillCheck: false,
                skillCheckResultPath: null,
                normalResultPath: () => {
                    this._game.log.addTempLog('You hit the rock and killed the wolf!', LogType.Result);
                }
            },
            { 
                buttonText: 'Run like a chicken',
                skillCheck: false,
                skillCheckResultPath: null,
                normalResultPath: () => {
                    this._game.log.addTempLog('Did you get away', LogType.Result);
                }
            }],
            EventType.Combat,
            null
        ));
    }

    get events() {
        return this._events;
    }

    public getPlaceEvent() {
        let names: string[] = [
            'Abandoned warehouse',
            'Strange building',
            'Very old house',
            'Abandoned supermarket',
            'Bus stop',
            'Abandoned hospital',
            'Abandoned Department Store',
            'Strange Fire department',
            'Musem',
            'Very old Mall',
            'School',
            'Movie Theater',
            'Very old Video Store',
            'Abandoned Police Station'
        ];

        let messagesWhenYouFoundNothing: string[] = [
            'You didnt find anything useful',
            'You find a lot of useless garbage',
            'Nothing important was found',
            'Unfortunately this place was totally empty',
            'Looks like someone already got everything they had here',
            'All things are burned, nothing can be recovered'
        ];

        const eventName: string = names[this._game.getRandomArbitrary(names.length - 1)];
        const messageWhenYouFoundNothing: string = messagesWhenYouFoundNothing[this._game.getRandomArbitrary(messagesWhenYouFoundNothing.length - 1)];
        const imageUrl: string = this._imageUrlList[this._game.getRandomArbitrary(this._imageUrlList.length - 2)];

        let enemyDificultie = 10;
        this._game.skillCheckDifficultie = enemyDificultie;

        return new Event(
            eventName,
            'No sign of life', 
            imageUrl,
            [{ 
                buttonText: 'Investigate (Exploration)',
                skillCheck: false,
                skillCheckResultPath: null,
                normalResultPath: () => {
                    let character = this._game.characterManager.picksACharacterAtRandom();
                    character.addAffliction(AfflictionSeeds.getOneRandomAffliction());
                }
            },
            {
                buttonText: 'Spy for possible dangers (Stealth)',
                skillCheck: true,
                skillCheckResultPath: {
                    success: () => {
                        this._game.log.addTempLog('Spy sucess', LogType.Result);
                    },
                    criticalSuccess: () => {
                        this._game.log.addTempLog('Spy critical success', LogType.Result);
                    },
                    failure: () => {
                        this._game.log.addTempLog('You tried to spy more, it made a lot of noise, theres someone in the house and heard you', LogType.Result);
                        this._game.log.addTempLog('You think it was better to run away to avoid problems', LogType.Result);
                    },
                    criticalFailure: () => {
                        this._game.log.addTempLog('Spy critical failure', LogType.Result);
                    }
                },
                normalResultPath: null
            },
            { 
                buttonText: 'Ignore',
                skillCheck: false,
                skillCheckResultPath: null,
                normalResultPath: () => {
                    this._game.log.addTempLog('You just ignored', LogType.Result);
                }
            }],
            EventType.Place,
            null
        )
    }

    public getCombatEvent() {
        let enemies: string[] = [
            'Wolf',
            'Timberwolf',
            'Bear',
            'Mercenary',
            'Bandit'
        ];

        let dice = new Dice();

        const enemy: string = enemies[this._game.getRandomArbitrary(enemies.length - 1)];
        let diceManager = new DiceManager();
        let enemyDificultie = 10;
        this._game.skillCheckDifficultie = enemyDificultie;
        diceManager.getDifficultLevel(enemyDificultie);

        return new Event(
            'Furious wolf appeared!',
            'You are in trouble',
            this._imageUrlList[6],
            [{
                buttonText: 'Fight [' + diceManager.getDifficultLevel(enemyDificultie) + ': ' + enemyDificultie + ']',
                skillCheck: true,
                skillCheckResultPath: {
                    success: () => {
                        this._game.log.addTempLog('With a lot of struggle you beat the wolf', LogType.Result);
                    },
                    criticalSuccess: () => {
                        this._game.log.addTempLog('You defeated the wolf easily', LogType.Result);
                    },
                    failure: () => {
                        this._game.log.addTempLog('The wolf has hurt you', LogType.Result);
                        this._game.characterManager.decreasesTheHealthOfSomeoneInTheGroup();
                    },
                    criticalFailure: () => {
                        this._game.log.addTempLog('The wolf left you devastated', LogType.Result);
                        this._game.characterManager.decreasesTheHealthOfSomeoneInTheGroup();
                        this._game.characterManager.decreasesTheHealthOfSomeoneInTheGroup();
                    }
                },
                normalResultPath: null
            },
            {
                buttonText: 'Try to escape',
                skillCheck: false,
                skillCheckResultPath: null,
                normalResultPath: () => {
                    this._game.log.addTempLog('You just ignored', LogType.Result);
                }
            }],
            EventType.Combat,
            null
        );
    }

    public getMileStoneEvent(): Event {
        return new Event('Milestone Reached! ',
        this._game.distanceToTheBorder + ' miles to the border',
        this._imageUrlList[7],
        [{
            buttonText: 'Back to travel',
            skillCheck: false,
            skillCheckResultPath: null,
            normalResultPath: () => {}
        },
        {
            buttonText: 'Back to travel',
            skillCheck: false,
            skillCheckResultPath: null,
            normalResultPath: () => {}
        }],
        EventType.Exploration, null
        );
    }
}