var GameStates = {
    TRAVEL: 1,
    CAMP: 2,
    SLEEP: 3,
    HUNT: 4,
    HEAL: 5,
    STATS: 6,
    MAP: 7,
    EVENT: 8
};

var currentState = GameStates.TRAVEL;

var GamePages = {
    travelPage: document.getElementById("travel-page"),
    campPage: document.getElementById("camp-page"),
    sleepPage: document.getElementById("sleep-page"),
    huntPage: document.getElementById("hunt-page"),
    healPage: document.getElementById("heal-page"),
    statsPage: document.getElementById("stats-page"),
    mapPage: document.getElementById("map-page"),
    eventPage: document.getElementById("event-page"),
};

function stateController(){
    switch(currentState){
        case GameStates.TRAVEL: 
            showPage(GamePages.travelPage);
            hidePage(GamePages.campPage);
        break;
        case GameStates.CAMP: 
            hideAllPages();
            showPage(GamePages.campPage);
        break;
        case GameStates.SLEEP: 
            showPage(GamePages.sleepPage);
            hidePage(GamePages.campPage);
        break;
        case GameStates.HUNT: 
            showPage(GamePages.huntPage);
            hidePage(GamePages.campPage);
        break;
        case GameStates.HEAL: 
            showPage(GamePages.healPage);
            hidePage(GamePages.campPage);
        break;
        case GameStates.STATS: 
            showPage(GamePages.statsPage);
            hidePage(GamePages.campPage);
        break;
        case GameStates.MAP: 
            showPage(GamePages.mapPage);
            hidePage(GamePages.campPage);
        break;
        case GameStates.EVENT: 
            showPage(GamePages.eventPage);
            hidePage(GamePages.travelPage);
        break;
    }
}

function goToState(state){
    currentState = state;
    stateController();
}

function showPage(page){
    page.style.display = "block";
}

function hidePage(page){
    page.style.display = "none";
}

function hideAllPages(){
    hidePage(GamePages.travelPage);
    hidePage(GamePages.campPage);
    hidePage(GamePages.sleepPage);
    hidePage(GamePages.huntPage);
    hidePage(GamePages.healPage);
    hidePage(GamePages.statsPage);
    hidePage(GamePages.mapPage);
    hidePage(GamePages.eventPage);
}

gameStart();

function gameStart(){
    hideAllPages();
    showPage(GamePages.campPage);
}