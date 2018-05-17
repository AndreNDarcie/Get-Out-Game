var GameStates = {
    TRAVEL: 1,
    CAMP: 2,
    SLEEP: 3,
    HUNT: 4,
    HEAL: 5,
    STATS: 6,
    MAP: 7,
    EVENT: 8,
    GAME_OVER: 9
};

var Globals = {
    currentState: GameStates.TRAVEL,
    currentDay: 0,
    characters: []
}

var GamePages = {
    travelPage: document.getElementById("travel-page"),
    campPage: document.getElementById("camp-page"),
    sleepPage: document.getElementById("sleep-page"),
    huntPage: document.getElementById("hunt-page"),
    healPage: document.getElementById("heal-page"),
    statsPage: document.getElementById("stats-page"),
    mapPage: document.getElementById("map-page"),
    eventPage: document.getElementById("event-page"),
    gameOverPage: document.getElementById("game-over-page"),
};