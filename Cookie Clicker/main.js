var game = {
    score: 0,
    totalScore: 0,
    totalClicks: 0,
    clickValue: 1,
    version: 0.000,


    addToScore: function(amount) {
        this.score += amount
        this.totalScore += amount;
        display.updateScore();
    },

    getScorePerSecond: function() {
        var scorePerSecond = 0;
        for (i = 0; i < building.name.length; i++) {
            scorePerSecond += building.income[i] * building.count[i];
        }
        return scorePerSecond
    }
};

var building = {
    name: [
        "Cursor",
        "Grandmar",
        "Oven",
        "Bakery",
        "Factory",
        "City"
    ],
    image: [
        "cursor.png",
        "grandma.png",
        "oven.png",
        "bakery.png",
        "factory.png",
        "city.png"
    ],
    count: [0, 0, 0, 0, 0, 0],
    income: [
        1,
        10,
        100,
        1000,
        10000,
        100000
    ],
    cost: [
        10,
        100,
        1000,
        10000,
        100000,
        1000000
    ],

    purchase: function(index) {
        if (game.score >= this.cost[index]) {
            game.score -= this.cost[index];
            this.count[index]++; // means the same as += 1  
            this.cost[index] = Math.round(Math.ceil(this.cost[index] * 1.15));
            display.updateScore();
            display.updateShop();
            display.updateUpgrades();
        }
    }
};

var upgrade = {
    name: [
        // mouse click upgrades
        "paper clicks",
        "wood mouse",
        "gold mouse",
        "metal mouse",
        "code mouse",
        // cursor upgrades
        "paper cursor",
        "double paper cursor",
        "fabric cursor",
        "double fabric cursor",
        "metal cursor",
        "double metal cursor"
        // grandma upgrades
        // bakery upgrades
        // factory upgrades
        // city upgrades
    ],
    description: [
        // mouse click upgrades
        "paper clicks is just a pun of paper clips, also makes you click better, 2 times better",
        "wood mouse, idk why its wood, you click 2 times better",
        "gold? ok. thats just dumb. 2 times better clicks",
        "metal? fine, i guess, 2 times better clicks",
        "hacker man. ok. 100% more effcient clicks",
        // cursor upgrades
        "paper am i right. also i do need to disclose this, it makes your cursors 100% better",
        "double the paper double the power, it makes your cursors 2x efficient",
        "fabric? fabric better than paper? ok, well... it makes your cursors 2x efficient",
        "well... its 2 times the fabric, so it makes your cursors 2x efficient",
        "metal. yeah. thats what im talking about, wait get this. it makes your cursors 4x efficient",
        "double the metal means double the petal. well that sounded better in my head. anywayit makes your cursors 4x efficient"
        // grandma upgrades
        // bakery upgrades
        // factory upgrades
        // city upgrades
    ],
    image: [
        // mouse click upgrades
        "you.png",
        "mouse.png",
        "mouse.png",
        "mouse.png",
        "upgrades/mouse/hacker-mouse.png",
        // cursor upgrades
        "upgrades/cursors/paper-cursor.png",
        "upgrades/cursors/double-paper-cursor.png",
        "upgrades/cursors/fabric-cursor.png",
        "upgrades/cursors/double-fabric-cursor.png",
        "upgrades/cursors/metal-cursor.png",
        "upgrades/cursors/double-metal-cursor.png"
        // grandma upgrades
        // bakery upgrades
        // factory upgrades
        // city upgrades
    ],
    type: [
        // mouse click upgrades
        "click",
        "click",
        "click",
        "click",
        "click",
        // cursor upgrades
        "building",
        "building",
        "building",
        "building",
        "building",
        "building"
        // grandma upgrades
        // bakery upgrades
        // factory upgrades
        // city upgrades
    ],
    cost: [
        // mouse click upgrades
        50,
        250,
        500,
        750,
        1250,
        // cursor upgrades
        250,
        500,
        1000,
        2500,
        10000,
        50000
        // grandma upgrades
        // bakery upgrades
        // factory upgrades
        // city upgrades
    ],
    buildingIndex: [
        // mouse click upgrades
        -1,
        -1,
        -1,
        -1,
        -1,
        // cursor upgrades
        0,
        0,
        0,
        0,
        0,
        0
        // grandma upgrades
        // bakery upgrades
        // factory upgrades
        // city upgrades
    ],
    requirement: [
        // mouse click upgrades
        1,
        50,
        100,
        200,
        500,
        // cursor upgrades
        1,
        5,
        10,
        25,
        50,
        100
        // grandma upgrades
        // bakery upgrades
        // factory upgrades
        // city upgrades
    ],
    bonus: [
        // mouse click upgrades
        2,
        2,
        2,
        2,
        2,
        // cursor upgrades
        2,
        2,
        2,
        2,
        4,
        4
        // grandma upgrades
        // bakery upgrades
        // factory upgrades
        // city upgrades
    ],
    purchased: [
        // mouse click upgrades
        false,
        false,
        false,
        false,
        false,
        // cursor upgrades
        false,
        false,
        false,
        false,
        false,
        false
        // grandma upgrades
        // bakery upgrades
        // factory upgrades
        // city upgrades
    ],

    purchase: function(index) {
        if (!this.purchased[index] && game.score >= this.cost[index]) {
            if (this.type[index] == "building" && building.count[this.buildingIndex[index]] >= this.requirement[index]) {
                game.score -= this.cost[index];
                building.income[this.buildingIndex[index]] *= this.bonus[index];
                this.purchased[index] = true;

                display.updateUpgrades();
                display.updateScore();
            } else if (this.type[index] == "click" && game.totalClicks >= this.requirement[index]) {
                game.score -= this.cost[index];
                game.clickValue *= this.bonus[index];
                this.purchased[index] = true;

                display.updateUpgrades();
                display.updateScore();
            }
        }
    }
}

var display = {
    updateScore: function() {
        document.getElementById("score").innerHTML = game.score;
        document.getElementById("scorepersecond").innerHTML = game.getScorePerSecond();
        document.title = game.score + " cookies - Cookie Clicker"
    },

    updateShop: function() {
        document.getElementById("shopContainer").innerHTML = "";
        for (i = 0; i < building.name.length; i++) {
            document.getElementById("shopContainer").innerHTML += '<table class="shopButton" onclick="building.purchase('+i+')"><tr><td id="image"><img src="images/'+building.image[i]+'"></td><td id="nameAndCost"><p>'+building.name[i]+'</p><p><span>'+building.cost[i]+'</span> Cookies</p></td><td id="amount"><span>'+building.count[i]+'</span></td></tr></table>';
        }
    },

    updateUpgrades: function() {
        document.getElementById("upgradeContainer").innerHTML = "";
        for (i = 0; i < upgrade.name.length; i++) {
            if (!upgrade.purchased[i]) {
                if (upgrade.type[i] == "building" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]) {
                    document.getElementById("upgradeContainer").innerHTML += '<img src="images/'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+' &#10; ('+upgrade.cost[i]+' cookies)" onclick="upgrade.purchase('+i+')">';
                } else if (upgrade.type[i] == "click" && game.totalClicks >= upgrade.requirement[i]) {
                    document.getElementById("upgradeContainer").innerHTML += '<img src="images/'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+' &#10; ('+upgrade.cost[i]+' cookies)" onclick="upgrade.purchase('+i+')">';
                }
            }
        }
    }
};

function saveGame() {
    var gameSave = {
        score: game.score,
        totalScore: game.totalScore,
        totalClicks: game.totalClicks,
        clickValue: game.clickValue,
        version: game.version,
        buildingCount: building.count,
        buildingIncome: building.income,
        buildingCost: building.cost,
        upgradePurchased: upgrade.purchased
    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem("gameSave"))
    if (localStorage.getItem("gameSave") !== null) {
        if (typeof savedGame.score !== "undefined") game.score = savedGame.score;
        if (typeof savedGame.totalScore !== "undefined") game.totalScore = savedGame.totalScore;
        if (typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totalClicks;
        if (typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
        if (typeof savedGame.version !== "undefined") game.version = savedGame.version;
        if (typeof savedGame.buildingCount !== "undefined") {
            for (i = 0; i < savedGame.buildingCount.length; i++) {
                building.count[i] = savedGame.buildingCount[i];
            }
        }
        if (typeof savedGame.buildingIncome !== "undefined") {
            for (i = 0; i < savedGame.buildingIncome.length; i++) {
                building.income[i] = savedGame.buildingIncome[i];
            }
        }
        if (typeof savedGame.buildingCost !== "undefined") {
            for (i = 0; i < savedGame.buildingCost.length; i++) {
                building.cost[i] = savedGame.buildingCost[i];
            }
        }
        if (typeof savedGame.upgradePurchased !== "undefined") {
            for (i = 0; i < savedGame.upgradePurchased.length; i++) {
                upgrade.purchased[i] = savedGame.upgradePurchased[i];
            }    
        }
    }
}

function resetGame() {
    if(confirm("Are you sure you want to reset your game?")) {
        var gameSave = {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
        location.reload();
    }
}

document.getElementById("clicker").addEventListener("click", function() {
    game.totalClicks++;
    game.addToScore(game.clickValue);
}, false);

window.onload = function() {
    loadGame();
    display.updateScore();
    display.updateUpgrades();
    display.updateShop();
};

setInterval(function() {
    game.score += (game.getScorePerSecond() * 0.5);
    game.totalScore += (game.getScorePerSecond() * 0.5);
    display.updateScore();
},500); // 500ms = 0.5 seconds

setInterval(function() {
    display.updateScore();
    display.updateUpgrades();
},10000); //10000ms = 10 seconds

setInterval(function() {  
    saveGame()
},30000); // 30000ms = 30 seconds

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.which == 83) { // if ctrl + 3 = pressed
        event.preventDefault();
        saveGame();
    }
}, false);