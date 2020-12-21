import { Event, EventType } from '../entities/Event';
import { Game } from '../Game';
import { LogType } from '../managers/LogManager';
import { Skills } from '../enums/Skills';
import { Difficulties } from '../enums/Difficulties';

export class EventSeeds {
    private _events: Event[];
    private _game: Game;

    constructor() {
        this._game = Game.getInstance();
        this._events = [];
    }

    start() {
        this.events.push(new Event(
            'Wild Wolf Appeared',
            'Something that catches your eye',
            'He jumps furiously wanting blood!', 
            '',
            [{ 
                buttonText: 'Throw a stone',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.log.addTempLog('You hit the rock and killed the wolf!', LogType.Result);
                }
            },
            { 
                buttonText: 'Run like a chicken',
                skillCheck: false,
                skillCheckFields: null,
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
        const events: Event[] = [
            new Event(
                'Ferris wheel',
                'When you look up you feel a chill in your belly',
                'It seems like it’s not been used for a long time,' +
                ' a time when having fun still made sense',
                'ferris-wheel',
                [{
                    buttonText: 'Talk',
                    skillCheck: false,
                    skillCheckFields: null,
                    normalResultPath: () => {
                        this._game.log.addTempLog("You don't find anything interesting", LogType.Result);
                        this._game.log.addTempLog("Just look at the ferris wheel for a while, take a deep breath and walk away", LogType.Result);
                        this._game.characterManager.makeSomeoneInTheGroupGetStatus();
                    }
                },
                {
                    buttonText: 'Investigate',
                    skillCheck: true,
                    skillCheckFields: {
                        difficulty: Difficulties.MEDIUM,
                        skillToCheck: Skills.STRENGTH,
                        canGiveItems: true,
                        resultPath: {
                            success: () => {
                                this._game.log.addTempLog('You found some things of value', LogType.Result);
                            },
                            failure: () => {
                                this._game.log.addTempLog("You couldn't find anything", LogType.Result);
                            }
                        }
                    },
                    normalResultPath: null
                },
                {
                    buttonText: 'Continue the walk',
                    skillCheck: false,
                    skillCheckFields: null,
                    normalResultPath: () => {
                        this._game.log.addTempLog("You just go by the ferris wheel and go away, without looking back", LogType.Result);
                    }
                }],
                EventType.Combat,
                null
            ),
            new Event(
                'Abandoned Barn',
                'Just a normal place',
                'There is something unsettling about this place',
                'barn-abandoned-farm-homestead',
                [
                    {
                        buttonText: 'Continue',
                        skillCheck: false,
                        skillCheckFields: null,
                        normalResultPath: () => {
                            this._game.log.addTempLog("You just continue walking...", LogType.Result);
                        }
                    }
                ],
                EventType.Combat,
                null
            ),
            new Event(
                'Theme Park',
                'Just a normal place',
                'There is something unsettling about this place',
                'theme-park',
                [
                    {
                        buttonText: 'Continue',
                        skillCheck: false,
                        skillCheckFields: null,
                        normalResultPath: () => {
                            this._game.log.addTempLog("You just continue walking...", LogType.Result);
                        }
                    }
                ],
                EventType.Combat,
                null
            ),
            new Event(
                'Forest Fog',
                'Just a normal place',
                'There is something unsettling about this place',
                'forest-fog',
                [
                    {
                        buttonText: 'Continue',
                        skillCheck: false,
                        skillCheckFields: null,
                        normalResultPath: () => {
                            this._game.log.addTempLog("You just continue walking...", LogType.Result);
                        }
                    }
                ],
                EventType.Combat,
                null
            ),
            new Event(
                'Geyser',
                'Just a normal place',
                'There is something unsettling about this place',
                'geyser',
                [
                    {
                        buttonText: 'Continue',
                        skillCheck: false,
                        skillCheckFields: null,
                        normalResultPath: () => {
                            this._game.log.addTempLog("You just continue walking...", LogType.Result);
                        }
                    }
                ],
                EventType.Combat,
                null
            )
        ];

        return events[Math.floor(Math.random() * events.length)];
        //return events[0];
    }

    public getCombatEvent() {
        return new Event(
            'Furious wolf appeared!',
            'Something that catches your eye',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultricies, ' +
            'lorem semper scelerisque interdum, neque felis tincidunt enim, at iaculis elit dolor ut libero. ' +
            'Fusce a odio pellentesque, pretium ipsum non, scelerisque mi. Vivamus quis arcu vel sapien ultricies varius. Pellentesque elementum lobortis convallis.',
            '2',
            [{
                buttonText: 'Fight',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.VERY_HARD,
                    skillToCheck: Skills.STRENGTH,
                    canGiveItems: true,
                    resultPath: {
                        success: () => {
                            this._game.log.addTempLog('With a lot of struggle you beat the wolf', LogType.Result);
                        },
                        failure: () => {
                            this._game.log.addTempLog('The wolf has hurt you', LogType.Result);
                            this._game.characterManager.decreasesTheHealthOfSomeoneInTheGroup();
                        },
                    }
                },
                normalResultPath: null
            },
            {
                buttonText: 'Try to escape',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.CHALLENGING,
                    skillToCheck: Skills.STEALTH,
                    canGiveItems: true,
                    resultPath: {
                        success: () => {
                            this._game.log.addTempLog('You managed to escape the wolf', LogType.Result);
                        },
                        failure: () => {
                            this._game.log.addTempLog('You didnt get away', LogType.Result);
                            this._game.characterManager.decreasesTheHealthOfSomeoneInTheGroup();
                        },
                    }
                },
                normalResultPath: null
            }],
            EventType.Combat,
            null
        );
    }

    public getMileStoneEvent(): Event {
        return new Event('Milestone Reached! ',
        'Something that catches your eye',
        this._game.distanceToTheBorder + ' miles to the border',
        'milestone',
        [
        {
            buttonText: 'Back to travel',
            skillCheck: false,
            skillCheckFields: null,
            normalResultPath: () => {}
        }],
        EventType.Exploration, null
        );
    }
}