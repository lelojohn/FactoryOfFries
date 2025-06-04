let storedFries = parseFloat(localStorage.getItem("FriesEarned")) || 0;
let storedHash = localStorage.getItem("FriesEarnedHash");
let FriesEarned = (storedHash && isValidFries(storedFries, storedHash)) ? storedFries : 0;
let FriesPerClick = parseFloat(localStorage.getItem("FriesPerClick")) || 1;
let FPC_UpgradeCost = parseFloat(localStorage.getItem("FPC_UpgradeCost")) || 15;
let FriesPerSecond = parseFloat(localStorage.getItem("FriesPerSecond")) || 0;
let FPS_UpgradeCost = parseFloat(localStorage.getItem("FPS_UpgradeCost")) || 50;
let FPC_UpgradeLevel = parseFloat(localStorage.getItem("FPC_UpgradeLevel")) || 1;
let FPS_UpgradeLevel = parseFloat(localStorage.getItem("FPS_UpgradeLevel")) || 1;
let savingEnabled = true;


function SaveGame() {
    if (savingEnabled) localStorage.setItem("FriesEarned", FriesEarned);
    localStorage.setItem("FriesEarnedHash", generateHash(FriesEarned));
    if (savingEnabled) localStorage.setItem("FriesPerClick", FriesPerClick);
    if (savingEnabled) localStorage.setItem("FPC_UpgradeCost", FPC_UpgradeCost);
    if (savingEnabled) localStorage.setItem("FriesPerSecond", FriesPerSecond);
    if (savingEnabled) localStorage.setItem("FPS_UpgradeCost", FPS_UpgradeCost);
    if (savingEnabled) localStorage.setItem("FPC_UpgradeLevel", FPC_UpgradeLevel);
    if (savingEnabled) localStorage.setItem("FPS_UpgradeLevel", FPS_UpgradeLevel);
}


window.onload = function() {
    Fries.textContent = "Fries: " + formatFries(Math.round(FriesEarned * 10) / 10);
    resetPassiveGeneration();
    StatsButton.style.whiteSpace = "pre-line";
    StatsButton.textContent =
  "Stats:\n_________________\nFries Per Click: " + formatFries(FriesPerClick) +
  " | Level: " + FPC_UpgradeLevel +
  "\nUpgrade Cost: " + formatFries(FPC_UpgradeCost) +
  "\n_________________\nFries Per Second: " + formatFries(FriesPerSecond) +
  " | Level: " + FPS_UpgradeLevel +
  "\nUpgrade Cost: " + formatFries(FPS_UpgradeCost);
}
// New accumulators for leftover fractions
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
    // Add click amount and accumulate leftover fractions
    let totalClick = FriesPerClick;
    let wholeClick = Math.floor(totalClick);
    clickFraction += totalClick - wholeClick;

    if (clickFraction >= 1) {
        wholeClick += Math.floor(clickFraction);
        clickFraction -= Math.floor(clickFraction);
    }

    FriesEarned += wholeClick;
    SaveGame()
    Fries.textContent = "Fries: " + formatFries(Math.round(FriesEarned * 10) / 10);
});


const FriesPerClickUpgrade = document.getElementById("FPC_UpgradeButton");

FriesPerClickUpgrade.addEventListener("click", function() {
    FPC_UpgradeCost = Math.round(FPC_UpgradeCost)
    if (FPC_UpgradeCost <= FriesEarned ) {
        FriesEarned -= FPC_UpgradeCost;
        SaveGame()
        Fries.textContent = "Fries: " + formatFries(Math.round(FriesEarned * 10) / 10);

        FriesPerClick = FriesPerClick *=1.2; //Amount to upgrade Fries per click by
        FPC_UpgradeCost = FPC_UpgradeCost *=1.2; //Amount to upgrade the upgrade cost by
        FPC_UpgradeLevel = FPC_UpgradeLevel +=1;

        StatsButton.style.whiteSpace = "pre-line"; //Makes sure to update the stats with the new ones
        StatsButton.textContent =
  "Stats:\n_________________\nFries Per Click: " + formatFries(FriesPerClick) +
  " | Level: " + FPC_UpgradeLevel +
  "\nUpgrade Cost: " + formatFries(FPC_UpgradeCost) +
  "\n_________________\nFries Per Second: " + formatFries(FriesPerSecond) +
  " | Level: " + FPS_UpgradeLevel +
  "\nUpgrade Cost: " + formatFries(FPS_UpgradeCost);
        console.log(FriesPerClick)
        console.log(FPC_UpgradeCost)
        console.log(FPC_UpgradeLevel)
    }
    else {
        console.log("Not enough fries!")
    }
});

const FriesPerSecondUpgrade = document.getElementById("FPS_UpgradeButton");

FriesPerSecondUpgrade.addEventListener("click", function() {
    FPS_UpgradeCost = Math.round(FPS_UpgradeCost)
    if (FPS_UpgradeCost <= FriesEarned ) {
        FriesEarned -= FPS_UpgradeCost;
        SaveGame()
        Fries.textContent = "Fries: " + formatFries(Math.round(FriesEarned * 10) / 10);

        if (FriesPerSecond < 1) {
          FriesPerSecond = FriesPerSecond +=1
          FriesPerSecond = Math.round(FriesPerSecond * 1.2 * 10) / 10; //Amount to upgrade Fries per second by
          FPS_UpgradeCost = Math.round(FPS_UpgradeCost * 1.2* 10) / 10; //Amount to upgrade the upgrade cost by
          FriesPerSecond = FriesPerSecond -=1
        }

        else {
          FriesPerSecond = Math.round(FriesPerSecond * 1.2 * 10) / 10; //Amount to upgrade Fries per second by
          FPS_UpgradeCost = Math.round(FPS_UpgradeCost * 1.2 * 10) / 10; //Amount to upgrade the upgrade cost by
        }
        FPS_UpgradeLevel = FPS_UpgradeLevel +=1;

        StatsButton.style.whiteSpace = "pre-line"; //Makes sure to update the stats with the new ones
        StatsButton.textContent =
  "Stats:\n_________________\nFries Per Click: " + formatFries(FriesPerClick) +
  " | Level: " + FPC_UpgradeLevel +
  "\nUpgrade Cost: " + formatFries(FPC_UpgradeCost) +
  "\n_________________\nFries Per Second: " + formatFries(FriesPerSecond) +
  " | Level: " + FPS_UpgradeLevel +
  "\nUpgrade Cost: " + formatFries(FPS_UpgradeCost);
        console.log(FriesPerSecond)
        console.log(FPS_UpgradeCost)
        console.log(FPS_UpgradeLevel)

        resetPassiveGeneration(); // Restart fry gain rate
    }
    else {
        console.log("Not enough fries!")
    }
});

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

// Start the timer
setInterval(updateTimer, 1000);

// Toggle button
const toggleButton = document.getElementById("TimePlayed");
const timerDiv = document.getElementById("timer");

toggleButton.addEventListener("click", function() {
  if (timerDiv.style.display === "none") {
    timerDiv.style.display = "block";
    TimePlayed.textContent = "Hide Time Played";
  } else {
    timerDiv.style.display = "none";
    TimePlayed.textContent = "Show Time Played";
  }
});

// Passive fry generation system
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
                FriesEarned += wholeFries;
                if (savingEnabled) localStorage.setItem("FriesEarned", FriesEarned);
                localStorage.setItem("FriesEarnedHash", generateHash(FriesEarned));
                passiveRemainder -= wholeFries;
                Fries.textContent = "Fries: " + formatFries(Math.round(FriesEarned * 10) / 10);
            }
        }, intervalTime);
    }
}

function updateButtonStyles() {
    if (FriesEarned >= FPC_UpgradeCost) {
        FriesPerClickUpgrade.style.backgroundColor = "#F5F5F5"; // light grey
    } else {
        FriesPerClickUpgrade.style.backgroundColor = "#707070"; // dark grey
    }
    if (FriesEarned >= FPS_UpgradeCost) {
        FriesPerSecondUpgrade.style.backgroundColor = "#F5F5F5"; // light grey
    } else {
        FriesPerSecondUpgrade.style.backgroundColor = "#707070"; // dark grey
    }
}

function RandomNumberGenerator() {
    let RandomNumberMaker = Math.floor((Math.random() * 100000000) + 1);
    console.log(RandomNumberMaker)
}

setInterval(updateButtonStyles, 20); // update every 20ms
setInterval(() => {
    SaveGame()
}, 1000);

function ResetProgress() {
    if (window.confirm("Are you sure you want to do this?")) {
        FriesEarned = 0;
        totalSeconds = 0;
        FriesPerClick = 1;
        FPC_UpgradeCost = 15;
        FriesPerSecond = 0;
        FPS_UpgradeCost = 50;
        FPC_UpgradeLevel = 1;
        FPS_UpgradeLevel = 1;
        SaveGame()
        Fries.textContent = "Fries: " + formatFries(Math.round(FriesEarned * 10) / 10);
        StatsButton.style.whiteSpace = "pre-line";
        StatsButton.textContent =
        "Stats:\n_________________\nFries Per Click: " + formatFries(FriesPerClick) +
        " | Level: " + FPC_UpgradeLevel +
        "\nUpgrade Cost: " + formatFries(FPC_UpgradeCost) +
        "\n_________________\nFries Per Second: " + formatFries(FriesPerSecond) +
        " | Level: " + FPS_UpgradeLevel +
        "\nUpgrade Cost: " + formatFries(FPS_UpgradeCost);
        document.getElementById("timer").textContent = "Time: 0d 00h 00m 00s";
    }
}

function Bonus() {
    const EasterEgg = "1234"; 
    const userInput = prompt("You found the bonus!");
    if (userInput && userInput.trim() === EasterEgg) {
        savingEnabled = false; 
        if (SecretMenu.style.display === "none") {
            SecretMenu.style.display = "block";
        } else {
            SecretMenu.style.display = "none";
        }

        alert("Whoop de doo.");
    } else {
        alert("What did you expect anyway?");
    }
}


const FreeUpgradesActivateButton = document.getElementById("FreeUpgradeStyles");
    FreeUpgradesActivateButton.addEventListener("click", function() {
        document.getElementById("FreeUpgradeStyles").textContent = "Activated!";
        localStorage.setItem("FPC_UpgradeCost", FPC_UpgradeCost);
        localStorage.setItem("FPS_UpgradeCost", FPS_UpgradeCost);
        FPC_UpgradeCost = 0;
        FPS_UpgradeCost = 0;
    });

    function formatFries(count) {
        const suffixes = [
            "", " thousand", " million", " billion", " trillion"," quadrillion", " quintillion", " sextillion", " septillion", " octillion", " nonillion", " decillion", " undecillion", " duodecillion", " tredecillion", " quattuordecillion", " quindecillion", " sexdecillion", " septendecillion", " octodecillion", " novemdecillion", " vigintillion", " Unvigintillion", " Duovigintillion", " Tresvigintillion", " Quattuorvigintillion", " Quinvigintillion", " Sexvigintillion", " Septenvigintillion", " Octovigintillion", " Novemvigintillion", " Trigintillion", " Untrigintillion", " Duotrigintillion", " Tretrigintillion", " Quattuortrigintillion", " Quintrigintillion", " Sextrigintillion", " Septentrigintillion", " Octotrigintillion", " Novemtrigintillion", " Quadragintillion", " Unquadragintillion", " Duoquadragintillion", " Trequadragintillion", " Quattuorquadragintillion", " Quinquadragintillion", " Sexquadragintillion", " Septenquadragintillion", " Octoquadragintillion", " Novemquadragintillion", " Quinquagintillion", " Unquinquagintillion", " Duoquinquagintillion", " Trequinquagintillion", " Quattuorquinquagintillion", " Quinquinquagintillion", " Sexquinquagintillion", " Septenquinquagintillion", " Octoquinquagintillion", " Novemquinquagintillion", " Sexagintillion", " Unsexagintillion", " Duosexagintillion", " Tresexagintillion", " Quattuorsexagintillion", " Quinsexagintillion", " Sexsexagintillion", " Septensexagintillion", " Octosexagintillion", " Novemsexagintillion"
        ];
    
        if (count < 1000) {
            return Math.round(count * 10) / 10;
        }
    
        let tier = Math.floor(Math.log10(count) / 3);
        if (tier >= suffixes.length) tier = suffixes.length - 1;
    
        const suffix = suffixes[tier];
        const scale = Math.pow(10, tier * 3);
        const scaled = (count / scale).toFixed(2);
    
        return scaled + suffix;
    }
