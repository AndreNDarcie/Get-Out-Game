parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"xGbl":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../Game"),e=function(){function e(){var e=this;this._campImg=document.querySelector("#camp-img"),this._travelBtn=document.querySelector("#travel-btn"),this._bagBtn=document.querySelector("#bag-btn"),this._travelBtn.addEventListener("click",function(){e.onClickTravel()}),this._bagBtn.addEventListener("click",function(){e.onClickBag()}),this._game=t.Game.getInstance()}return e.prototype.start=function(){},e.prototype.onClickTravel=function(){this._game.goToState(t.GameStates.TRAVEL)},e.prototype.onClickBag=function(){this._game.goToState(t.GameStates.BAG)},e}();exports.CampManager=e;
},{"../Game":"LMN3"}],"Yaha":[function(require,module,exports) {
"use strict";var e;Object.defineProperty(exports,"__esModule",{value:!0}),function(e){e[e.Exploration=0]="Exploration",e[e.Combat=1]="Combat"}(e=exports.EventType||(exports.EventType={}));var t=function(){function e(e,t,n,r){this._items=[],this._name=e,this._description=t,this._type=n,this._items=r}return Object.defineProperty(e.prototype,"name",{get:function(){return this._name},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"description",{get:function(){return this._description},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"type",{get:function(){return this._type},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"items",{get:function(){return this._items},enumerable:!0,configurable:!0}),e.prototype.willGiveItems=function(){return!!this._items&&this._items.length>0},e}();exports.Event=t;
},{}],"SNDR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(t,e,n){this._name=t,this._description=e,this._amount=n}return Object.defineProperty(t.prototype,"name",{get:function(){return this._name},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"description",{get:function(){return this._description},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"amount",{get:function(){return this._amount},enumerable:!0,configurable:!0}),t.prototype.getNameWithAmount=function(){return this.name+(this.amount>1?" x "+this.amount:"")},t.prototype.decreaseAmount=function(){this._amount--},t.prototype.increaseAmount=function(){this._amount++},t}();exports.Item=t;
},{}],"XVIc":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../entities/Event"),e=require("../Game"),n=require("../entities/Item"),i=function(){function i(){var t=this;this._titleElement=document.getElementById("event-page-title"),this._descriptionElement=document.getElementById("event-page-description"),this._imageElement=document.getElementById("event-page-image"),this._yesButton=document.getElementById("event-page-yes-btn"),this._noButton=document.getElementById("event-page-no-btn"),this._yesButton.addEventListener("click",function(){t.onEventPageYesBtn()}),this._noButton.addEventListener("click",function(){t.onEventPageNoBtn()}),this._game=e.Game.getInstance()}return i.prototype.start=function(){var e=[new t.Event("Abandoned house","No sign of life. Explore the house?",t.EventType.Exploration,[new n.Item("Food","",1)]),new t.Event("Wild Wolf Appeared","Fight with the wolf?",t.EventType.Combat)],i=this.getRandomArbitrary(e.length);this._currentEvent=e[i],this.showWaitingMessage()},i.prototype.showWaitingMessage=function(){var t=this;this._titleElement.style.display="none",this._descriptionElement.innerHTML="Something happened!",this._imageElement.style.display="none",this._yesButton.style.display="none",this._noButton.style.display="none",setTimeout(function(){return t.showEvent()},1e3)},i.prototype.showEvent=function(){this._titleElement.style.display="block",this._titleElement.innerHTML=this._currentEvent.name,this._descriptionElement.innerHTML=this._currentEvent.description,this._imageElement.style.display="block",this.showButtons()},i.prototype.showButtons=function(){switch(this._yesButton.style.display="inline-block",this._noButton.style.display="inline-block",this._currentEvent.type){case t.EventType.Exploration:this._yesButton.innerHTML="Explore",this._noButton.innerHTML="Ignore";break;case t.EventType.Combat:this._yesButton.innerHTML="Fight",this._noButton.innerHTML="Run away"}},i.prototype.onEventPageYesBtn=function(){var n=this.getRandomArbitrary(this._game.characters.length),i=this._game.characters[n];switch(this._currentEvent.type){case t.EventType.Exploration:this._game.log.addTempLog(i.name+" found food!");break;case t.EventType.Combat:i.looseHealth(1)}if(this._currentEvent.willGiveItems())for(var o=0,s=this._currentEvent.items;o<s.length;o++){var a=s[o];this._game.bagManager.putItem(a)}this._game.log.isThereAnyTemporaryLog()?this._game.goToState(e.GameStates.LOG):this._game.goToState(e.GameStates.TRAVEL)},i.prototype.onEventPageNoBtn=function(){this._game.log.isThereAnyTemporaryLog()?this._game.goToState(e.GameStates.LOG):this._game.goToState(e.GameStates.TRAVEL)},i.prototype.getRandomArbitrary=function(t){return Math.floor(Math.random()*t)},i}();exports.EventManager=i;
},{"../entities/Event":"Yaha","../Game":"LMN3","../entities/Item":"SNDR"}],"te8u":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../Game"),t=function(){function t(){this._gameOverMessage=document.querySelector("#game-over-message"),this._game=e.Game.getInstance()}return t.prototype.start=function(){for(var e=0,t=0;t<this._game.characters.length;t++){this._game.characters[t].health>0&&e++}this.setGameOverMessage(e+" of "+this._game.characters.length+" survived!")},t.prototype.setGameOverMessage=function(e){this._gameOverMessage.innerHTML=e},t}();exports.GameOverManager=t;
},{"../Game":"LMN3"}],"f4fg":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../Game"),t=function(){function t(){this._game=e.Game.getInstance(),this._currentCharacterIndex=0,this._charactersList=[],this.getPageElements()}return t.prototype.start=function(){this.showCharacters()},t.prototype.getPageElements=function(){var e=this;this._charactersList[0]={},this._charactersList[0].nameField=document.querySelector("#first-character-name-field"),this._charactersList[0].healthField=document.querySelector("#first-character-health-field"),this._charactersList[0].atributesField=document.querySelector("#first-character-atributes-field"),this._charactersList[1]={},this._charactersList[1].nameField=document.querySelector("#second-character-name-field"),this._charactersList[1].healthField=document.querySelector("#second-character-health-field"),this._charactersList[1].atributesField=document.querySelector("#second-character-atributes-field"),this._charactersList[2]={},this._charactersList[2].nameField=document.querySelector("#third-character-name-field"),this._charactersList[2].healthField=document.querySelector("#third-character-health-field"),this._charactersList[2].atributesField=document.querySelector("#third-character-atributes-field"),this._charactersList[3]={},this._charactersList[3].nameField=document.querySelector("#fourth-character-name-field"),this._charactersList[3].healthField=document.querySelector("#fourth-character-health-field"),this._charactersList[3].atributesField=document.querySelector("#fourth-character-atributes-field"),this._charactersList[4]={},this._charactersList[4].nameField=document.querySelector("#fifth-character-name-field"),this._charactersList[4].healthField=document.querySelector("#fifth-character-health-field"),this._charactersList[4].atributesField=document.querySelector("#fifth-character-atributes-field"),this._backCharacterBtn=document.querySelector("#back-character-btn"),this._backCharacterBtn.addEventListener("click",function(){e.onClickBackCharacter()})},t.prototype.showCharacters=function(){for(var e=this._game.characters,t=0;t<e.length;t++){var r=e[t];this._charactersList[t].nameField.innerHTML=r.name+" - "+r.kinship,r.isDead?(this._charactersList[t].healthField.innerHTML="Is Dead",this._charactersList[t].atributesField.style.display="none"):(this._charactersList[t].healthField.innerHTML="Health: "+r.health,this._charactersList[t].atributesField.innerHTML=r.getHungry())}},t.prototype.onClickBackCharacter=function(){this._game.goToState(e.GameStates.TRAVEL)},t}();exports.StatsManager=t;
},{"../Game":"LMN3"}],"B4ph":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../Game"),e=function(){function e(){var e=this;this._game=t.Game.getInstance(),this._travelPage=document.querySelector("#travel-page"),this._travelImage=document.querySelector("#travel-img"),this._travelledDistanceField=document.querySelector("#travelled-distance"),this._currentTimeField=document.querySelector("#current-time-field"),this._progressBar=document.getElementById("progress-bar"),this._walkBtn=document.querySelector("#walk-btn"),this._campBtn=document.querySelector("#camp-btn"),this._statsBtn=document.querySelector("#stats-btn"),this._walkBtn.addEventListener("click",function(){e.onClickWalkBtn()}),this._campBtn.addEventListener("click",function(){e.onClickCampBtn()}),this._statsBtn.addEventListener("click",function(){e.onClickStatsBtn()}),this.showTravelledDistance()}return e.prototype.start=function(){this.showTime()},e.prototype.onClickWalkBtn=function(){this.passOneHour(),this.checkEvent()?this._game.goToState(t.GameStates.EVENT):this._game.log.isThereAnyTemporaryLog()&&this._game.goToState(t.GameStates.LOG)},e.prototype.onClickCampBtn=function(){this._game.goToState(t.GameStates.CAMP)},e.prototype.onClickStatsBtn=function(){this._game.goToState(t.GameStates.STATS)},e.prototype.passOneHour=function(){12==this._game.clock.currentHour&&this._game.clock.anteMeridiem&&this.gotoNextDay(),this._game.clock.nextHour(),this.walkOneHour(),this._game.characterManager.increaseHungryOfAllCharacters(),this.showTime()},e.prototype.checkEvent=function(){return this.getRandomArbitrary(1,100)<=25},e.prototype.getRandomArbitrary=function(t,e){return Math.random()*(e-t)+t},e.prototype.gotoNextDay=function(){this._game.addDaysToCurrentDay(1),this.showTime()},e.prototype.showTime=function(){this._currentTimeField.innerHTML=this._game.clock.showTime()+" - day "+this._game.currentDay,this._game.clock.anteMeridiem?this._game.clock.currentHour>6&&this._game.clock.currentHour<12?this._currentTimeField.innerHTML+=" - daylight":this._currentTimeField.innerHTML+=" - night":this._game.clock.currentHour>6&&this._game.clock.currentHour<12?this._currentTimeField.innerHTML+=" - night":this._currentTimeField.innerHTML+=" - daylight"},e.prototype.walkOneHour=function(){this._game.addDistanceToTravelledDistance(2),this.increaseProgressBar(),this.showTravelledDistance(),this._game.characterManager.checkIfAllCharactersAreDead()&&this._game.goToState(t.GameStates.GAME_OVER),this._game.travelledDistance>this._game.distanceToGoal&&this.arrivedAtTheGoal()},e.prototype.increaseProgressBar=function(){var t=321/this._game.distanceToGoal;this._progressBar.style.width=this._game.travelledDistance*t+"px"},e.prototype.getRandomCharacter=function(){return Math.floor(Math.random()*this._game.characters.length)},e.prototype.showTravelledDistance=function(){this._travelledDistanceField.innerHTML="Travelled distance: "+this._game.travelledDistance+" miles"},e.prototype.arrivedAtTheGoal=function(){this._game.goToState(t.GameStates.GAME_OVER)},e}();exports.TravelManager=e;
},{"../Game":"LMN3"}],"pbwm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../Game"),o=function(){function o(){var o=this;this._tempLogs=[],this._logs=[],this._game=t.Game.getInstance(),this._logList=document.querySelector("#log-list"),this._travelBtn=document.querySelector("#log-back-character-btn"),this._travelBtn.addEventListener("click",function(){o.onClickTravel()})}return o.prototype.start=function(){this.showLogs()},o.prototype.showLogs=function(){if(this._tempLogs.length<=0)throw new Error("No logs found");for(var t="",o=0;o<this._tempLogs.length;o++)t+="<li>"+this._tempLogs[o]+"</li>";this._logs=this._tempLogs,this._tempLogs=[],this._logList.innerHTML=t},o.prototype.clearLogs=function(){this._logList.innerHTML=""},o.prototype.log=function(t){this._tempLogs.push(t)},o.prototype.onClickTravel=function(){this._game.goToState(t.GameStates.TRAVEL)},o.prototype.isThereAnyTemporaryLog=function(){return this._tempLogs.length>0},o.prototype.addTempLog=function(t){this._tempLogs.push(t)},o}();exports.LogManager=o;
},{"../Game":"LMN3"}],"hQTy":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../Game"),t=function(){function t(){var t=this;this._items=[],this._game=e.Game.getInstance(),this._itemListElement=document.querySelector("#bag-item-list"),this._selectedItemElement=document.getElementById("bag-selected-item"),this._bagCloseBtn=document.querySelector("#bag-close-btn"),this._bagThrowAwayBtn=document.getElementById("bag-throw-away-btn"),this._bagCloseBtn.addEventListener("click",function(){t.onClickBagClose()}),this._bagThrowAwayBtn.addEventListener("click",function(){t.onClickThrowAway()})}return t.prototype.start=function(){this.hideSelectedItem(),this.showItems(),this._bagThrowAwayBtn.style.display="none"},t.prototype.onClickBagClose=function(){this._game.goToState(e.GameStates.CAMP)},t.prototype.onClickThrowAway=function(){this.removeOrDecreaseItem(),this._itemListElement.innerHTML="",this.showItems(),this._bagThrowAwayBtn.style.display="none"},t.prototype.hideSelectedItem=function(){this._selectedItemElement.innerHTML="",this._selectedItemElement.style.display="none"},t.prototype.showSelectedItem=function(){this._selectedItemElement.style.display="block"},t.prototype.showItems=function(){var e=this;if(this._itemListElement.innerHTML="",0!=this._items.length)for(var t=function(t){var i=document.createElement("li"),s=document.createElement("input");s.type="button",s.value=n._items[t].getNameWithAmount(),s.addEventListener("click",function(){return e.selectItem(e._items[t])}),i.appendChild(s),n._itemListElement.appendChild(i)},n=this,i=0;i<this._items.length;i++)t(i);else this._itemListElement.innerHTML="Empty"},t.prototype.putItem=function(e){var t=this._items.findIndex(function(e){return e.name==e.name});t>=0?this._items[t].increaseAmount():this._items.push(e)},t.prototype.showCharacters=function(){for(var e=this,t=function(t){var i=document.createElement("li"),s=document.createElement("input");s.type="button",s.value=n._game.characters[t].name,s.addEventListener("click",function(){return e.useItem(t)}),i.appendChild(s),n._itemListElement.appendChild(i)},n=this,i=0;i<this._game.characters.length;i++)t(i)},t.prototype.selectItem=function(e){this._selectedItem=e,this._itemListElement.innerHTML="",this._selectedItemElement.innerHTML="Give "+this._selectedItem.name+" to",this.showSelectedItem(),this.showCharacters(),this._bagThrowAwayBtn.style.display="block"},t.prototype.useItem=function(e){this.removeOrDecreaseItem(),this.hideSelectedItem(),this.showItems(),this._game.characters[e].decreaseHungry(12),this._bagThrowAwayBtn.style.display="none"},t.prototype.removeOrDecreaseItem=function(){this._selectedItem.amount>1?this._selectedItem.decreaseAmount():this.removeItem(this._selectedItem)},t.prototype.removeItem=function(e){this._items=this._items.filter(function(t){return t.name!==e.name})},t}();exports.BagManager=t;
},{"../Game":"LMN3"}],"X9QG":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../Game"),e=function(){function e(e,i,r,h,n,a,s){this._isDead=!1,this._sick=!1,this._cold=!1,this._limitForHungry=18,this._name=e,this._health=i,this._kinship=r,this._isDead=!1,this._sick=h,this._hungry=n,this._cold=s,this._maxHealth=i,this._thirst=a,this._game=t.Game.getInstance()}return Object.defineProperty(e.prototype,"name",{get:function(){return this._name},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isDead",{get:function(){return this._isDead},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"health",{get:function(){return this._health},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"kinship",{get:function(){return this._kinship},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"maxHealth",{get:function(){return this._maxHealth},enumerable:!0,configurable:!0}),e.prototype.increaseHungry=function(){this._hungry>=this._limitForHungry?(this._isDead||this._game.log.addTempLog(this._name+" is starving to death"),this.looseHealth(1)):this._hungry++},e.prototype.decreaseHungry=function(t){if(t<0)throw new Error("Invalid value for hungryToDecrease");this._hungry>0&&(this._hungry=this._hungry-t)},e.prototype.getHungry=function(){return this._hungry>=6&&this._hungry<12?"[HUNGRY]":this._hungry>=12?"[VERY HUNGRY]":""},e.prototype.looseHealth=function(t){if(t<0||t>this._maxHealth)throw new Error("Invalid value for healthToLoose");this._health>0&&(this._health-=t,this._health<=0?(this._health=0,this._hungry>=this._limitForHungry?this._game.log.addTempLog(this._name+" starved to death at day "+this._game.currentDay):this._game.log.addTempLog(this._name+" died at day "+this._game.currentDay),this._isDead=!0):this._game.log.addTempLog(this._name+" lost -"+t+" health"))},e}();exports.Character=e;
},{"../Game":"LMN3"}],"vgbH":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../Game"),r=function(){function r(){this._game=e.Game.getInstance()}return r.prototype.start=function(){},r.prototype.checkIfAllCharactersAreDead=function(){return this._game.characters.every(function(e){return e.isDead})},r.prototype.increaseHungryOfAllCharacters=function(){for(var e=0,r=this._game.characters;e<r.length;e++){r[e].increaseHungry()}},r.prototype.getNumberOfCharactersAlive=function(){return this._game.characters.filter(function(e){return!e.isDead}).length},r}();exports.CharacterManager=r;
},{"../Game":"LMN3"}],"XxXA":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,r){this._currentHour=e,this._anteMeridiem=r}return Object.defineProperty(e.prototype,"currentHour",{get:function(){return this._currentHour},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"anteMeridiem",{get:function(){return this._anteMeridiem},enumerable:!0,configurable:!0}),e.prototype.nextHour=function(){11==this._currentHour&&(this._anteMeridiem=!this._anteMeridiem),12==this._currentHour?this._currentHour=1:this._currentHour++},e.prototype.showTime=function(){return(this._currentHour<=9?"0":"")+this._currentHour.toString()+":00 "+(this._anteMeridiem?"a.m":"p.m")},e}();exports.Clock=e;
},{}],"LMN3":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e,t=require("./managers/CampManager"),a=require("./managers/EventManager"),r=require("./managers/GameOverManager"),s=require("./managers/StatsManager"),n=require("./managers/TravelManager"),i=require("./managers/LogManager"),h=require("./managers/BagManager"),o=require("./entities/Character"),g=require("./managers/CharacterManager"),c=require("./entities/Item"),u=require("./entities/Clock");!function(e){e[e.TRAVEL=0]="TRAVEL",e[e.CAMP=1]="CAMP",e[e.STATS=2]="STATS",e[e.EVENT=3]="EVENT",e[e.GAME_OVER=4]="GAME_OVER",e[e.LOG=5]="LOG",e[e.BAG=6]="BAG"}(e=exports.GameStates||(exports.GameStates={}));var l=function(){function l(){this._currentState=1,this._currentDay=1,this._hours=0,this._characters=[],this._travelledDistance=0,this._distanceToGoal=300,this._travelPage=document.getElementById("travel-page"),this._logPage=document.getElementById("log-page"),this._campPage=document.getElementById("camp-page"),this._statsPage=document.getElementById("stats-page"),this._eventPage=document.getElementById("event-page"),this._gameOverPage=document.getElementById("game-over-page"),this._bagPage=document.getElementById("bag-page")}return l.getInstance=function(){return l._instance||(l._instance=new l),l._instance},l.prototype.start=function(){this._bag=new h.BagManager,this._camp=new t.CampManager,this._events=new a.EventManager,this._gameOver=new r.GameOverManager,this._stats=new s.StatsManager,this._travel=new n.TravelManager,this._characterManager=new g.CharacterManager,this._clock=new u.Clock(8,!0),this._log=new i.LogManager,this.createAllCharacters(),this.hideAllPages(),this.addItemsToBag(),this.showPage(this._campPage)},Object.defineProperty(l.prototype,"log",{get:function(){return this._log},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"clock",{get:function(){return this._clock},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"characterManager",{get:function(){return this._characterManager},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"bagManager",{get:function(){return this._bag},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"hours",{get:function(){return this._hours},set:function(e){this._hours=e},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"currentDay",{get:function(){return this._currentDay},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"distanceToGoal",{get:function(){return this._distanceToGoal},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"travelledDistance",{get:function(){return this._travelledDistance},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"characters",{get:function(){return this._characters},enumerable:!0,configurable:!0}),l.prototype.addDistanceToTravelledDistance=function(e){this._travelledDistance+=e},l.prototype.addDaysToCurrentDay=function(e){this._currentDay+=e},l.prototype.createAllCharacters=function(){this._characters.push(new o.Character("Ethan",5,"father",!0,0,0,!1)),this._characters.push(new o.Character("Olivia",5,"mother",!1,0,0,!0)),this._characters.push(new o.Character("Michael",5,"son",!0,0,0,!0)),this._characters.push(new o.Character("Sophia",5,"daughter",!1,0,0,!1)),this._characters.push(new o.Character("Emma",5,"grandmother",!0,0,0,!1))},l.prototype.addItemsToBag=function(){this._bag.putItem(new c.Item("Food","",2))},l.prototype.goToState=function(e){this._currentState=e,this.setState()},l.prototype.showPage=function(e){e.style.display="block"},l.prototype.hidePage=function(e){e.style.display="none"},l.prototype.hideAllPages=function(){this.hidePage(this._travelPage),this.hidePage(this._logPage),this.hidePage(this._campPage),this.hidePage(this._statsPage),this.hidePage(this._eventPage),this.hidePage(this._gameOverPage),this.hidePage(this._bagPage)},l.prototype.setState=function(){switch(this.hideAllPages(),this._currentState){case e.TRAVEL:this.showPage(this._travelPage),this._travel.start();break;case e.CAMP:this.showPage(this._campPage),this._camp.start();break;case e.STATS:this.showPage(this._statsPage),this._stats.start();break;case e.EVENT:this.showPage(this._eventPage),this._events.start();break;case e.LOG:this.showPage(this._logPage),this._log.start();break;case e.GAME_OVER:this.showPage(this._gameOverPage),this._gameOver.start();break;case e.BAG:this.showPage(this._bagPage),this._bag.start()}},l}();exports.Game=l;
},{"./managers/CampManager":"xGbl","./managers/EventManager":"XVIc","./managers/GameOverManager":"te8u","./managers/StatsManager":"f4fg","./managers/TravelManager":"B4ph","./managers/LogManager":"pbwm","./managers/BagManager":"hQTy","./entities/Character":"X9QG","./managers/CharacterManager":"vgbH","./entities/Item":"SNDR","./entities/Clock":"XxXA"}],"B6dB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Game"),t=e.Game.getInstance();t.start();
},{"./Game":"LMN3"}]},{},["B6dB"], null)
//# sourceMappingURL=src.cf13bd1f.js.map