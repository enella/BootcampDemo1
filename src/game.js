/* jshint esversion: 6 */
//import {sendData} from "/app.js";

// app.js
/* ASETUKET ----------------------------------------------------------------------------------------------- */
var CONST = { // * vähän niinkuin asetukset
    BOARD_SIZE: 8,
    CARDS_PER_ROW: 4,

    CARD_INVISIBLE: "oi oi-aperture text-info",
    CARD_PAIR_FOUND: "oi oi-check text-success",

    GAME_STATE_NO_TURNED_CARD: 0, // pelin tila
    GAME_STATE_ONE_TURNED_CARD: 1,
    GAME_STATE_TWO_TURNED_CARDS: 2,
    GAME_STATE_GAME_OVER: 3,
    GAME_STATE_WIN: 4, 

    CARD_STATE_IN_GAME: 0, // kortin tila
    CARD_STATE_GAME_OVER: 1,
    CARD_STATE_WIN: 2,

    TURN_INVISIBLE_DELAY: 1000
};

/* PELIN OHJAUS ----------------------------------------------------------------------------------------------- */
var MemoryCard = function(id, gameController) {
    var that = this;
    this.id = id; // * tallennetaan id MemoryCardin sisään
    this.gameController = gameController;
    this.state = CONST.CARD_STATE_IN_GAME;

    // console.log("MemoryCard constructor is" + JSON.stringify(this));
    this.onClickHandler = function(e) { // * kun korttia klikataan, niin suoritetaan seuraavaa:
        var id = that.id.substr(5);
        // console.log("Clicked: "+ that.id + " state: " + that.state);

        if (that.state == CONST.CARD_STATE_IN_GAME) {
            that.gameController.turnCard(id);
        } else if (that.state == CONST.CARD_STATE_GAME_OVER) {
            console.log("Card " + that.id + "is no longer playable");
        } else if (that.cards == CONST.CARD_STATE_WIN) {
           // that.gameController.turnCard(id);
        }
    };

    this.turnVisible = function() { // * käännetään näkyviin (tallenetaan iconClass:n tuos spanin sisään)
       var id = this.id.substr(5);
        // document.getElementById("span-" + id).className = this.iconClass;
        document.getElementById("span-" + id).className += " animated flipOutX ";
        document.getElementById("span-" + id).className = this.iconClass + " animated flipInX";
    };
    this.turnInVisible = function() { // * käännetään pois näkyvistä
        var id = this.id.substr(5);
         // document.getElementById("span-" + id).className = CONST.CARD_INVISIBLE;
         document.getElementById("span-" + id).className += " animated flipOutX ";
         document.getElementById("span-" + id).className = CONST.CARD_INVISIBLE + " animated flipInX";
    };
    this.turnGameOver = function() { // * parien löytymisen jälkeen muoktaan korttien sisältöä
        var id = this.id.substr(5);
         // document.getElementById("span-" + id).className = CONST.CARD_INVISIBLE;
         // document.getElementById("span-" + id).className += " animated flipOutX ";
         document.getElementById("span-" + id).className = CONST.CARD_PAIR_FOUND + " animated flipInX";
         this.setCardState(CONST.CARD_STATE_GAME_OVER);
    };
    this.turnWin = function() { // * Kun kaikki parit on käytetty
        var id = this.id.substr(5);
    };
    /*this.startOver = function() {
        var shuffleB = document.getElementById("shuffleGame");
        this.state = CONST.GAME_STATE_NO_TURNED_CARD;
    }*/
    this.getIconClass = function() {
       return this.iconClass;
    };
    this.setIconClass = function(icon) {
        this.iconClass = icon;
    };
    this.setCardState = function(state) {
        this.state = state;
    };
};
/* PELIPÖYDÄN LUOMINEN ----------------------------------------------------------------------------------------------- */
var MemoryGame = function(size, cardsPerRow) {
    var that = this;
    this.turn = 0;
    this.nbrOfCards = size;
    this.cardsPerRow = cardsPerRow;
    this.state = CONST.GAME_STATE_NO_TURNED_CARD;
    this.firtscard = -1;
    this.secondscard = -1;
    this.progress = 0;

    this.startTime = -1;
    this.playTime = 0;
    this.endTime = 0;

    this.cards = [];
    this.ikonit = [];
    this.highs = [];

    this.peliAika = 0;
    this.vuoro = 0;

    this.initialize = function() {
        this.createDivs();
        this.setEventListeners();
        this.setIconCalssToCards(); // * korttien iconit span-luokkaan
    };

    this.getNextUninitializedIconClassIndex = function(x) { // * tarkistetaan onko kortit samoja
        var i;

        for(i=0; i< this.nbrOfCards; i++) {
            if(this.cards[(x+i) % this.nbrOfCards].getIconClass() == undefined) {
                return (x+i) % this.nbrOfCards;
            }
        }
        return 0; // * ei pitäisi mennä koskaan tähän.
    };

    this.setIconCalssToCards = function() { // * asetetaan parit
        var i, j; 
        var icon;
        var x, y;
        var vara = 0;
        var len = this.ikonit.length;

        for(i = 0; i < this.nbrOfCards/2; i++) { // * arvotaan korttiparit
            do { // * tarkistetaanko onko ikoni käytetty, jos ikoni on käytetty arvotaan se uudestaan
                icon = Math.floor(Math.random() * ICONNAMES.length);
            } while (this.ikonit.includes(icon));
             this.ikonit.push(icon); 

            x = Math.floor(Math.random() * this.nbrOfCards);
            y = Math.floor(Math.random() * this.nbrOfCards);
            

            x = this.getNextUninitializedIconClassIndex(x);
            this.cards[x].setIconClass(ICONNAMES[icon]);

            y = this.getNextUninitializedIconClassIndex(y);
            this.cards[y].setIconClass(ICONNAMES[icon]);

            // console.log("Icon " + ICONNAMES[icon] + " set to " + x + " and " + y);
        }
    };

    this.setEventListeners = function() { 
        var i;
        var cardId = "";

        for (i = 0; i < this.nbrOfCards; i++) {
            cardId = "card-"+i;
            this.cards[i] = new MemoryCard(cardId, this);
            document.getElementById(cardId).addEventListener("click", this.cards[i].onClickHandler);
        }
    };

    this.createRow = function(id) { // * määritetään rivi
        var divRow;
        divRow = document.createElement("div"); // * luodaan HTML-elementti, div
        divRow.id = "row-"+id; // * identifioidaan rivit
        divRow.className = "row"; // nimetään class rowiksi
        return divRow;
    };
    this.createCard = function(id) { // * määritetään kortti
        var divCard;
        divCard = document.createElement("div");
        divCard.id = "card-"+id;
        divCard.className = "col-sm card";
        return divCard;
    };
    this.createCardBody = function(id) { // * määritetään korttien body
        var divCardBody;
        divCardBody = document.createElement("div");
        divCardBody.className = "card-body";
        return divCardBody;
    };
    this.createIcon = function (id) {
        var iconSpan;
        iconSpan = document.createElement("span");
        iconSpan.id = "span-"+id;
        iconSpan.className = CONST.CARD_INVISIBLE;
        return iconSpan;
    };
    this.createHighScore = function() { // * luodaan highscore-osio
        var x = 0, y = 1;
        var scoreB = document.getElementById("scoreBody"); // * haetaan table:n sisältö
        var row = scoreB.insertRow(x);
        var place = row.insertCell(0);
        var nickName = row.insertCell(1);
        var time = row.insertCell(2);
        var turns = row.insertCell(3);
        var playerid = Math.floor(Math.random()*(999-100+1)+100); // * arvotaan pelaaja id SQL:lle jolla random 3 numeroinen luku
        var nimi = "Anonymous";
        
        //score.HTMLTableElement.appendChild(document.createElement('tbody'));
        //score.setAttribute("id", "player-score" + x);
        
        var name = document.getElementById("username").value;
        place.innerHTML = y;
        if (name == "") {
            nickName.innerHTML = nimi; name = nimi;
        } else {
            nickName.innerHTML = name; 
        }
        time.innerHTML = this.playTime/1000; var aika = this.playtime/1000;
        turns.innerHTML = this.turn;

        x++;y++;

        var Player = {
            id : playerid,
            name : name,
            time : aika,
            turns : turns
        };
        return Player;
    };

    this.createDivs = function() { // * luodaan divit korteille 
        var i, j;
        var cardId = 0; // * alustetaan korttien id nollaksi

        var rowElement;
        var cardElement;
        var cardBodyElement;
        var iconElement;

        for (i = 0; i < this.nbrOfCards/this.cardsPerRow; i++) { // * for-luuppit luomaan korteille "paikat"
            rowElement = this.createRow(i); // * rivit
            for (j = 0; j < this.cardsPerRow; j++) { // * kortit
                cardId = (j + (i * this.cardsPerRow)); // * identifioidaan kortit
                cardElement = this.createCard(cardId);
                cardBodyElement = this.createCardBody(); 
                iconElement = this.createIcon(cardId);

                cardBodyElement.appendChild(iconElement); // * luodaan diveille sisältöä
                cardElement.appendChild(cardBodyElement);
                rowElement.appendChild(cardElement);
            }
            document.getElementById("game-content").appendChild(rowElement); // * luodaan kortit tietyn elementin sisään
        }
    };
 /* PELIAIKA, PELIVUOROT JA EDISTYMINEN ------------------------------------------------------------------------------------ */
    this.setPlayTime = function() { 
        if(this.startTime == -1){ // * aloitusajan alustaminen
            return;
        } else if(this.startTime > 0) {
            this.playTime = new Date().getTime() - this.startTime; 

            if(this.progress == 100) { // * kun voitto tapahtuu tehdään seuraavaa.. 
                this.endTime = this.playTime/1000; // * tallennetaan peliaika muuttujaan
                this.startTime = -1; // * nollataan peliajan asetukset
                return;
            }
        } 

        if(this.state == CONST.CARD_STATE_GAME_OVER) {
            return;
        } 
    };
    this.setTurns = function() {
        this.turn += 1;
        turnElement.innerHTML = "Turns: " + this.turn;
        return this.turn;
    };
    this.setProgress = function() {
        var parit = CONST.BOARD_SIZE / 2;
        var edis = 100 / parit;
        var v, va;

        this.progress += edis; 
        if (this.progress < 100) {
            v = this.progress;
            $('#progress-bar').attr('aria-valuenow', v);
            $('#progress-bar').css('width', v + '%');

            if (this.progress > 99) {
                v = 100;
                this.progress = 100;
                $('#progress-bar').attr('aria-valuenow', v);
            }
        } else {
            va = this.progress - 100;
            v = this.progress - va; 
            $('#progress-bar').attr('aria-valuenow', '100%');
            $('#progress-bar').css('width', v + '%');
        }
    };
 /* PELILOGIIKKA ----------------------------------------------------------------------------------------------- */
    this.turnCard = function(id) { // * pelilogiikan luominen
        // console.log("turnCard: " + id);
        var winElement;

        if(this.startTime == -1){ // * aloitusajan alustaminen
            this.startTime = new Date().getTime();
            this.setPlayTime();
        }

        if (this.state == CONST.GAME_STATE_NO_TURNED_CARD){ // * jos pelitila on 'ei käännettyjä kortteja'
            this.cards[id].turnVisible();
            this.firtscard = id;
            this.state = CONST.GAME_STATE_ONE_TURNED_CARD;
            //this.edis 
            this.setTurns();
        } else if (this.state == CONST.GAME_STATE_ONE_TURNED_CARD) { // * jos pelitila on 'kortteja käännetty'
            if (id == this.firtscard)   return;
            this.setTurns();
            this.cards[id].turnVisible();
            this.secondcard = id;
            this.state = CONST.GAME_STATE_TWO_TURNED_CARD; 

            // katsoo onko parit
            if(this.cards[this.firtscard].getIconClass() == this.cards[this.secondcard].getIconClass()) {
                // parit = aseta kortit // *'ei pelattavaksi'
                setTimeout(function(){ // * aika functio kääntämään kortit piiloon
                    that.cards[that.firtscard].turnGameOver();
                    that.cards[that.secondcard].turnGameOver();
                    that.state = CONST.GAME_STATE_NO_TURNED_CARD;
                }, CONST.TURN_INVISIBLE_DELAY);
                this.setProgress();
            } else {
                setTimeout(function(){ // * funktio kääntämään kortit piiloon
                    that.cards[that.firtscard].turnInVisible();
                    that.cards[that.secondcard].turnInVisible();
                    that.state = CONST.GAME_STATE_NO_TURNED_CARD;
                }, CONST.TURN_INVISIBLE_DELAY);
            }

            /*if (document.getElementById("shuffleGame").clicked == true) {
                this.state = CONST.GAME_STATE_NO_TURNED_CARD; console.log("Shuffle painettu");
            }*/

            if (this.progress == 100) { // * kun kaikki parit on käytetty tai siis progress-bar on 100%:a
                this.state = CONST.GAME_STATE_WIN;
                if (this.state == CONST.GAME_STATE_WIN) {
                    winElement = this.createHighScore(); console.log("WIN!");
                }
            }
        } 
    };
};

var memoryGame = new MemoryGame(CONST.BOARD_SIZE, CONST.CARDS_PER_ROW, CONST.CARD_INVISIBLE); // * huom.  memoryGamen etumerkki!
var playTimeElement = document.getElementById("play-time");
var turnElement = document.getElementById("turn-count");
var progressBar = document.getElementById("progress-bar");
var highScoreElement = document.getElementById("player-score");

memoryGame.initialize();

setInterval(function() {
    memoryGame.setPlayTime(); 
    playTimeElement.innerHTML = "Playtime: " + Math.floor(memoryGame.playTime / 1000) + " s";
}, 1000);

/*var url = "/app.js";

        $.getScript(url, function() {
            $(document).ready(function(){
                this.sendData(Player); console.log(this.sendData(Player));
            });
        });*/