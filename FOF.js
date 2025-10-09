const sessionKey = Math.random().toString(36).substring(2) + Date.now();
let JerrySecret = false;
let storedFries = parseFloat(localStorage.getItem("FriesEarned")) || 0;
let storedHash = localStorage.getItem("FriesEarnedHash");

const FriesManager = (() => {
    let _value = (storedHash && isValidFries(storedFries, storedHash)) ? storedFries : 0;

    return {
        get: () => _value,
        add: (amount) => {
            _value += amount;
            localStorage.setItem("FriesEarned", _value);
            localStorage.setItem("FriesEarnedHash", generateHash(_value));
        },
        subtract: (amount) => {
            _value = Math.max(0, _value - amount);
            localStorage.setItem("FriesEarned", _value);
            localStorage.setItem("FriesEarnedHash", generateHash(_value));
        },
        set: (amount) => {
            _value = amount;
            localStorage.setItem("FriesEarned", _value);
            localStorage.setItem("FriesEarnedHash", generateHash(_value));
        },
        getRaw: () => _value
    };
})();

let FriesPerClick = parseFloat(localStorage.getItem("FriesPerClick")) || 1;
let ClickerUpgradeCost = parseFloat(localStorage.getItem("ClickerUpgradeCost")) || 15;
let FriesPerSecond = parseFloat(localStorage.getItem("FriesPerSecond")) || 0;
let WorkersUpgradeCost = parseFloat(localStorage.getItem("WorkersUpgradeCost")) || 20;
let FPC_UpgradeLevel = parseFloat(localStorage.getItem("FPC_UpgradeLevel")) || 1;
let FPS_UpgradeLevel = parseFloat(localStorage.getItem("FPS_UpgradeLevel")) || 1;

const saveState = (() => {
    let enabled = true;
    return {
        isEnabled: () => enabled,
        disable: () => { enabled = false; },
        enable: () => { /* don't allow re-enable */ },
    };
})();

function SaveGame() {

    

    // Saving Achievements
    localStorage.setItem("Achievements", JSON.stringify(Achievements));
    localStorage.setItem("AmountOfAchievements", AmountOfAchievements);
    achievementPopup.style.whiteSpace = "pre-line";
    
    // Fries Earned Achievements
    if (FriesManager.get() >= 100 && !Achievements.includes(" Small Beginnings")) {
        Achievements[AmountOfAchievements] = " Small Beginnings";
        AmountOfAchievements += 1;
        document.getElementById("achievementPopup").innerHTML = 
            "<span class='VeryLargeText'>Achievement Get!<br><br></span><span class='LargeText'>Small Beginnings</span><br><br><span class='SmallText'>Earn 100 Fries.</span>";
        showPopup(); 
    }
    if (FriesManager.get() >= 1000 && !Achievements.includes(" Getting Decent...")) {
        Achievements[AmountOfAchievements] = " Getting Decent...";
        AmountOfAchievements += 1;
        document.getElementById("achievementPopup").innerHTML = 
        "<span class='VeryLargeText'>Achievement Get!<br><br></span><span class='LargeText'>Getting Decent...</span><br><br><span class='SmallText'>Earn 1000 Fries.</span>";
    showPopup(); 
    }
    if (FriesManager.get() >= 10000 && !Achievements.includes(" Frymaster")) {
        Achievements[AmountOfAchievements] = " Frymaster";
        AmountOfAchievements += 1;
        document.getElementById("achievementPopup").innerHTML = 
        "<span class='VeryLargeText'>Achievement Get!<br><br></span><span class='LargeText'>Frymaster</span><br><br><span class='SmallText'>Earn 10000 Fries.</span>";
    showPopup(); 
    }
    if (FriesManager.get() >= 100000 && !Achievements.includes(" Factory Owner")) {
        Achievements[AmountOfAchievements] = " Factory Owner";
        AmountOfAchievements += 1;
        document.getElementById("achievementPopup").innerHTML = 
        "<span class='VeryLargeText'>Achievement Get!<br><br></span><span class='LargeText'>Factory Owner</span><br><br><span class='SmallText'>Earn 100000 Fries.</span>";
    showPopup(); 
    }
    //FPC_UpgradeLevel Achievements
    if (FPC_UpgradeLevel >= 2 && !Achievements.includes(" Clicker")) {
        Achievements[AmountOfAchievements] = " Clicker";
        AmountOfAchievements += 1;
        document.getElementById("achievementPopup").innerHTML = 
        "<span class='VeryLargeText'>Achievement Get!<br><br></span><span class='LargeText'>Clicker</span><br><br><span class='SmallText'>Upgrade your Fries Per Click.</span>";
    showPopup(); 
    }
    if (FPC_UpgradeLevel >= 10 && !Achievements.includes(" Determined Clicker")) {
        Achievements[AmountOfAchievements] = " Determined Clicker";
        AmountOfAchievements += 1;
        document.getElementById("achievementPopup").innerHTML = 
        "<span class='VeryLargeText'>Achievement Get!<br><br></span><span class='LargeText'>Determined Clicker</span><br><br><span class='SmallText'>Reach a Fries Per Click level of at least 10.</span>";
    showPopup(); 
    }

    //FPS_UpgradeLevel Achievements
    if (FPS_UpgradeLevel >= 2 && !Achievements.includes(" Passive Income")) {
        Achievements[AmountOfAchievements] = " Passive Income";
        AmountOfAchievements += 1;
        document.getElementById("achievementPopup").innerHTML = 
        "<span class='VeryLargeText'>Achievement Get!<br><br></span><span class='LargeText'>Passive Income</span><br><br><span class='SmallText'>Upgrade your Fries Per Second.</span>";
    showPopup(); 
    }
    if (FPS_UpgradeLevel >= 10 && !Achievements.includes(" Paid Workers")) {
        Achievements[AmountOfAchievements] = " Paid Workers";
        AmountOfAchievements += 1;
        document.getElementById("achievementPopup").innerHTML = 
        "<span class='VeryLargeText'>Achievement Get!<br><br></span><span class='LargeText'>Paid Workers</span><br><br><span class='SmallText'>Reach a Fries Per Second level of at least 10.</span>";
    showPopup(); 
    }

    //FPC Achievements
    if (FriesPerClick >= 10 && !Achievements.includes(" 10x Fries")) {
        Achievements[AmountOfAchievements] = " 10x Fries";
        AmountOfAchievements += 1;
        document.getElementById("achievementPopup").innerHTML = 
        "<span class='VeryLargeText'>Achievement Get!<br><br></span><span class='LargeText'>10x Fries</span><br><br><span class='SmallText'>Earn at least 10 Fries Per Click.</span>";
    showPopup(); 
    }

    //FPS Achievements
    if (FriesPerSecond >= 1 && !Achievements.includes(" 1 at a Time")) {
        Achievements[AmountOfAchievements] = " 1 at a Time";
        AmountOfAchievements += 1;
        document.getElementById("achievementPopup").innerHTML = 
        "<span class='VeryLargeText'>Achievement Get!<br><br></span><span class='LargeText'>1 at a Time</span><br><br><span class='SmallText'>Earn at least 1 Fry Per Second.</span>";
    showPopup(); 
    }

    //Secret Achievements
    if (JerrySecret == true && !Achievements.includes(" Blessed by Jerry")) {
        Achievements[AmountOfAchievements] = " Blessed by Jerry";
        AmountOfAchievements += 1;
    }
    document.getElementById("AchievementsList").textContent = ("Achievements:\n\n" + "\u2022 " + Achievements.join("\n\u2022 "));
    localStorage.setItem("AchievementsKey", JSON.stringify(Achievements));

    if (saveState.isEnabled()) {
        localStorage.setItem("FriesPerClick", FriesPerClick);
        localStorage.setItem("ClickerUpgradeCost", ClickerUpgradeCost);
        localStorage.setItem("FriesPerSecond", FriesPerSecond);
        localStorage.setItem("WorkersUpgradeCost", WorkersUpgradeCost);
        localStorage.setItem("FPC_UpgradeLevel", FPC_UpgradeLevel);
        localStorage.setItem("FPS_UpgradeLevel", FPS_UpgradeLevel);
        localStorage.setItem("FriesEarned", FriesManager.getRaw());
        localStorage.setItem("FriesEarnedHash", generateHash(FriesManager.getRaw()));
    }
}

window.onload = function(F) {
    Fries.textContent = "Fries: " + formatFries(Math.round(FriesManager.get() * 10) / 10);
    resetPassiveGeneration();


    // Load saved achievements
    const savedAchievements = JSON.parse(localStorage.getItem("Achievements")) || [];
    const savedAmountOfAchievements = parseInt(localStorage.getItem("AmountOfAchievements")) || 0;
    Achievements.length = 0;
    Achievements.push(...savedAchievements);
    AmountOfAchievements = savedAmountOfAchievements;

    document.getElementById("AchievementsList").textContent = ("Achievements:\n\n" + "\u2022 " + Achievements.join("\n\u2022 "));
}

let clickFraction = 0;
let passiveFraction = 0;
const ClickDiv = document.getElementById("Clicker");

function generateHash(value) {
    return btoa((value * 17.3).toString().split('').reverse().join(''));
}

function isValidFries(fries, storedHash) {
    return generateHash(fries) === storedHash;
}

ClickDiv.addEventListener("click", function() {
    let totalClick = FriesPerClick;
    let wholeClick = Math.floor(totalClick);
    clickFraction += totalClick - wholeClick;

    if (clickFraction >= 1) {
        wholeClick += Math.floor(clickFraction);
        clickFraction -= Math.floor(clickFraction);
    }

    FriesManager.add(wholeClick);
    SaveGame();
    Fries.textContent = "Fries: " + formatFries(Math.round(FriesManager.get() * 10) / 10);
});

const FriesPerClickUpgrade = document.getElementById("UpgradeClicker");

FriesPerClickUpgrade.addEventListener("click", function() {
    ClickerUpgradeCost = Math.round(ClickerUpgradeCost);
    if (ClickerUpgradeCost <= FriesManager.get()) {
        FriesManager.subtract(ClickerUpgradeCost);
        SaveGame();
        Fries.textContent = "Fries: " + formatFries(Math.round(FriesManager.get() * 10) / 10);

        FriesPerClick *= 1.2;
        ClickerUpgradeCost *= 1.2;
        FPC_UpgradeLevel += 1;

        
    } else {
        console.log("Not enough fries!");
    }
});

const FriesPerSecondUpgrade = document.getElementById("UpgradeWorkers");

FriesPerSecondUpgrade.addEventListener("click", function() {
    WorkersUpgradeCost = Math.round(WorkersUpgradeCost);
    if (WorkersUpgradeCost <= FriesManager.get()) {
        FriesManager.subtract(WorkersUpgradeCost);
        SaveGame();
        Fries.textContent = "Fries: " + formatFries(Math.round(FriesManager.get() * 10) / 10);

        if (FriesPerSecond < 1) {
            FriesPerSecond += 1;
            FriesPerSecond = Math.round(FriesPerSecond * 1.3 * 10) / 10;
            WorkersUpgradeCost = Math.round(WorkersUpgradeCost * 1.3 * 10) / 10;
            FriesPerSecond -= 1;
        } else {
            FriesPerSecond = Math.round(FriesPerSecond * 1.3 * 10) / 10;
            WorkersUpgradeCost = Math.round(WorkersUpgradeCost * 1.3 * 10) / 10;
        }

        FPS_UpgradeLevel += 1;

        
        resetPassiveGeneration();
    } else {
        console.log("Not enough fries!");
    }
});

// Your remaining code continues as is...


let totalSeconds = parseInt(localStorage.getItem("totalSeconds")) || 0;

function updateTimer() {
    totalSeconds += 1;
    localStorage.setItem("totalSeconds", totalSeconds);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const timeString =
        days + "d " +
        hours.toString().padStart(2, "0") + "h " +
        minutes.toString().padStart(2, "0") + "m " +
        seconds.toString().padStart(2, "0") + "s";

    document.getElementById("timer").textContent = "Time: " + timeString;
}

setInterval(updateTimer, 1000);

const toggleButton = document.getElementById("TimePlayed");
const timerDiv = document.getElementById("timer");

toggleButton.addEventListener("click", function () {
    if (timerDiv.style.display === "none") {
        timerDiv.style.display = "block";
        TimePlayed.textContent = "Hide Time Played";
    } else {
        timerDiv.style.display = "none";
        TimePlayed.textContent = "Show Time Played";
    }
});

let passiveInterval;
let passiveRemainder = 0;

function resetPassiveGeneration() {
    if (passiveInterval) clearInterval(passiveInterval);

    if (FriesPerSecond > 0) {
        const updatesPerSecond = 60;
        const intervalTime = 1000 / updatesPerSecond;

        passiveInterval = setInterval(() => {
            const gainPerTick = FriesPerSecond / updatesPerSecond;
            passiveRemainder += gainPerTick;

            const wholeFries = Math.floor(passiveRemainder);
            if (wholeFries >= 1) {
                FriesManager.add(wholeFries);
                passiveRemainder -= wholeFries;
                Fries.textContent = "Fries: " + formatFries(Math.round(FriesManager.get() * 10) / 10);
            }
        }, intervalTime);
    }
}

function updateButtonStyles() {
    FriesPerClickUpgrade.style.backgroundColor = (FriesManager.get() >= ClickerUpgradeCost) ? "#F5F5F5" : "#707070";
    FriesPerSecondUpgrade.style.backgroundColor = (FriesManager.get() >= WorkersUpgradeCost) ? "#F5F5F5" : "#707070";
}

setInterval(updateButtonStyles, 20);
setInterval(() => SaveGame(), 100);

document.getElementById("FreeUpgradeStyles").addEventListener("click", function () {
    this.textContent = "Activated!";
    ClickerUpgradeCost = 0;
    WorkersUpgradeCost = 0;
    localStorage.setItem("ClickerUpgradeCost", ClickerUpgradeCost);
    localStorage.setItem("WorkersUpgradeCost", WorkersUpgradeCost);
});

function formatFries(count) {
    const suffixes = ["", " thousand", " million", " billion", " trillion", " quadrillion", " quintillion", " sextillion", " septillion", " octillion", " nonillion"];
    if (count < 1000) return Math.round(count * 10) / 10;
    const tier = Math.min(Math.floor(Math.log10(count) / 3), suffixes.length - 1);
    const scale = Math.pow(10, tier * 3);
    return (count / scale).toFixed(2) + suffixes[tier];
}


function ResetProgress() {
    if (window.confirm("Are you sure you want to do this?")) {
        FriesManager.set(0);
        while (Achievements.length > 0) {
            Achievements.pop();
        }
        Achievements = [" The Journey Begins"]
        AmountOfAchievements = 1;
        totalSeconds = 0;
        FriesPerClick = 1;
        ClickerUpgradeCost = 15;
        FriesPerSecond = 0;
        WorkersUpgradeCost = 20;
        FPC_UpgradeLevel = 1;
        FPS_UpgradeLevel = 1;
        JerrySecret = false;
        SaveGame();
        document.getElementById("AchievementsList").textContent = ("Achievements:\n\n"+"\u2022 "+Achievements);
        Fries.textContent = "Fries: " + formatFries(FriesManager.get());
        document.getElementById("timer").textContent = "Time: 0d 00h 00m 00s";
    }
}

function DisplayAchievements() {
 if (AchievementsList.style.display == "none") {
    AchievementsList.style.display = "block";
    AchievementsList.style.whiteSpace = "pre-line";
    console.log(StoredAchievements)
    document.getElementById("AchievementsList").textContent = ("Achievements:\n\n"+"\u2022 "+Achievements);
 }
 else {
    AchievementsList.style.display = "none";
 }

}

let Achievements = [" The Journey Begins"]

let AmountOfAchievements = 1;
Achievements[AmountOfAchievements] = " The Journey Begins";
AmountOfAchievements += 1;

const StoredAchievements = JSON.parse(localStorage.getItem('AchievementsKey'));


function showPopup() {
    var popup = document.getElementById("achievementPopup");
    popup.classList.add("show");
    
    // Automatically hide after 3 seconds
    setTimeout(function() {
        popup.classList.remove("show");
    }, 4000);
}


const music = document.getElementById('background-music');
let isPlaying = false;

function toggleMusic() {
  if (isPlaying) {
    music.pause();
  } else {
    music.play();
  }
  isPlaying = !isPlaying;
}


function UpdateUpgradesBox() {
    document.getElementById("UpgradesBoxUnderlineText").textContent = ("Upgrades");
    UpgradesBoxUnderlineText.style.textDecoration = "underline"}

UpdateUpgradesBox()


function upgradeClickerInfoShow() {
    document.getElementById("UpgradeItemsInfo").innerHTML =
    "A simple upgrade for your cursor.<br>----------------------------<br>Upgrade Cost: "+ formatFries(Math.round(ClickerUpgradeCost))+ "<br>----------------------------<br>Fries per click: "+formatFries(Math.round(FriesPerClick))+"<br>----------------------------<br>Fries per click after upgrading: "+formatFries(FriesPerClick*1.2)+"<br>----------------------------<br>Upgrade level:"+formatFries(FPC_UpgradeLevel);
        let div = document.getElementById("UpgradeItemsInfo");
        div.style.opacity = "1";
  }

function upgradeItemsInfoHide() {
        let div = document.getElementById("UpgradeItemsInfo");
        div.style.opacity = "0";

}


function UpdateClickerInfoAfterUpgrade() {
    setTimeout(function() {
        document.getElementById("UpgradeItemsInfo").innerHTML =
        "A simple upgrade for your cursor.<br>----------------------------<br>Upgrade Cost: "+ formatFries(Math.round(ClickerUpgradeCost))+ "<br>----------------------------<br>Fries per click: "+formatFries(Math.round(FriesPerClick))+"<br>----------------------------<br>Fries per click after upgrading: "+formatFries(FriesPerClick*1.2)+"<br>----------------------------<br>Upgrade level: "+formatFries(FPC_UpgradeLevel);
      }, 50);


}

function upgradeWorkersInfoShow() {
    document.getElementById("UpgradeItemsInfo").innerHTML =
    "A simple upgrade for your fries per second.<br>----------------------------<br>Upgrade Cost: "+ formatFries(Math.round(WorkersUpgradeCost))+ "<br>----------------------------<br>Fries per second: "+formatFries(Math.round(FriesPerSecond))+"<br>----------------------------<br>Fries per second after upgrading: "+formatFries(Math.round(FriesPerSecond*1.3))+"<br>----------------------------<br>Upgrade level: "+formatFries(FPS_UpgradeLevel);
        let div = document.getElementById("UpgradeItemsInfo");
        div.style.opacity = "1";
}

function UpdateWorkersInfoAfterUpgrade() {
    setTimeout(function() {
        document.getElementById("UpgradeItemsInfo").innerHTML =
        "A simple upgrade for your fries per second.<br>----------------------------<br>Upgrade Cost: "+ formatFries(Math.round(WorkersUpgradeCost))+ "<br>----------------------------<br>Fries per second: "+formatFries(Math.round(FriesPerSecond))+"<br>----------------------------<br>Fries per second after upgrading: "+formatFries(Math.round(FriesPerSecond*1.3))+"<br>----------------------------<br>Upgrade level: "+formatFries(FPS_UpgradeLevel);
      }, 50);


}

function autoResizeText() {
    const box = document.getElementById("UpgradeItemsInfo");
    let fontSize = 27; // start from your preferred size
    box.style.fontSize = fontSize + "px";

    while (box.scrollHeight > box.clientHeight || box.scrollWidth > box.clientWidth) {
        fontSize--;
        box.style.fontSize = fontSize + "px";
        if (fontSize <= 10) break; // stop shrinking at 10px
    }
}

// Run on load
window.onload = autoResizeText;
// Run whenever the window resizes
window.onresize = autoResizeText;

window.onload = updateFries;

function updateFries() {
    document.getElementById("Fries").textContent = ("Fries: " + FriesManager.get());
}

const div = document.getElementById('myDiv');
let isdarkshade = false;

function toggleColor() {
  if (isdarkshade) {
    div.style.backgroundColor = "white";
  } else {
    div.style.backgroundColor = "black";
  }
  isdarkshade = !isdarkshade;
}
