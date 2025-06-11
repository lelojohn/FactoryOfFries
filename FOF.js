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
let FPC_UpgradeCost = parseFloat(localStorage.getItem("FPC_UpgradeCost")) || 15;
let FriesPerSecond = parseFloat(localStorage.getItem("FriesPerSecond")) || 0;
let FPS_UpgradeCost = parseFloat(localStorage.getItem("FPS_UpgradeCost")) || 20;
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
    if (saveState.isEnabled()) {
        localStorage.setItem("FriesPerClick", FriesPerClick);
        localStorage.setItem("FPC_UpgradeCost", FPC_UpgradeCost);
        localStorage.setItem("FriesPerSecond", FriesPerSecond);
        localStorage.setItem("FPS_UpgradeCost", FPS_UpgradeCost);
        localStorage.setItem("FPC_UpgradeLevel", FPC_UpgradeLevel);
        localStorage.setItem("FPS_UpgradeLevel", FPS_UpgradeLevel);
        localStorage.setItem("FriesEarned", FriesManager.getRaw());
        localStorage.setItem("FriesEarnedHash", generateHash(FriesManager.getRaw()));
    }
}

window.onload = function() {
    Fries.textContent = "Fries: " + formatFries(Math.round(FriesManager.get() * 10) / 10);
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

const FriesPerClickUpgrade = document.getElementById("FPC_UpgradeButton");

FriesPerClickUpgrade.addEventListener("click", function() {
    FPC_UpgradeCost = Math.round(FPC_UpgradeCost);
    if (FPC_UpgradeCost <= FriesManager.get()) {
        FriesManager.subtract(FPC_UpgradeCost);
        SaveGame();
        Fries.textContent = "Fries: " + formatFries(Math.round(FriesManager.get() * 10) / 10);

        FriesPerClick *= 1.2;
        FPC_UpgradeCost *= 1.2;
        FPC_UpgradeLevel += 1;

        StatsButton.style.whiteSpace = "pre-line";
        StatsButton.textContent =
            "Stats:\n_________________\nFries Per Click: " + formatFries(FriesPerClick) +
            " | Level: " + FPC_UpgradeLevel +
            "\nUpgrade Cost: " + formatFries(FPC_UpgradeCost) +
            "\n_________________\nFries Per Second: " + formatFries(FriesPerSecond) +
            " | Level: " + FPS_UpgradeLevel +
            "\nUpgrade Cost: " + formatFries(FPS_UpgradeCost);
    } else {
        console.log("Not enough fries!");
    }
});

const FriesPerSecondUpgrade = document.getElementById("FPS_UpgradeButton");

FriesPerSecondUpgrade.addEventListener("click", function() {
    FPS_UpgradeCost = Math.round(FPS_UpgradeCost);
    if (FPS_UpgradeCost <= FriesManager.get()) {
        FriesManager.subtract(FPS_UpgradeCost);
        SaveGame();
        Fries.textContent = "Fries: " + formatFries(Math.round(FriesManager.get() * 10) / 10);

        if (FriesPerSecond < 1) {
            FriesPerSecond += 1;
            FriesPerSecond = Math.round(FriesPerSecond * 1.2 * 10) / 10;
            FPS_UpgradeCost = Math.round(FPS_UpgradeCost * 1.2 * 10) / 10;
            FriesPerSecond -= 1;
        } else {
            FriesPerSecond = Math.round(FriesPerSecond * 1.2 * 10) / 10;
            FPS_UpgradeCost = Math.round(FPS_UpgradeCost * 1.2 * 10) / 10;
        }

        FPS_UpgradeLevel += 1;

        StatsButton.style.whiteSpace = "pre-line";
        StatsButton.textContent =
            "Stats:\n_________________\nFries Per Click: " + formatFries(FriesPerClick) +
            " | Level: " + FPC_UpgradeLevel +
            "\nUpgrade Cost: " + formatFries(FPC_UpgradeCost) +
            "\n_________________\nFries Per Second: " + formatFries(FriesPerSecond) +
            " | Level: " + FPS_UpgradeLevel +
            "\nUpgrade Cost: " + formatFries(FPS_UpgradeCost);

        resetPassiveGeneration();
    } else {
        console.log("Not enough fries!");
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
    FriesPerClickUpgrade.style.backgroundColor = (FriesManager.get() >= FPC_UpgradeCost) ? "#F5F5F5" : "#707070";
    FriesPerSecondUpgrade.style.backgroundColor = (FriesManager.get() >= FPS_UpgradeCost) ? "#F5F5F5" : "#707070";
}

setInterval(updateButtonStyles, 20);
setInterval(() => SaveGame(), 1000);

document.getElementById("FreeUpgradeStyles").addEventListener("click", function () {
    this.textContent = "Activated!";
    FPC_UpgradeCost = 0;
    FPS_UpgradeCost = 0;
    localStorage.setItem("FPC_UpgradeCost", FPC_UpgradeCost);
    localStorage.setItem("FPS_UpgradeCost", FPS_UpgradeCost);
});

function formatFries(count) {
    const suffixes = ["", " thousand", " million", " billion", " trillion", " quadrillion", " quintillion"];
    if (count < 1000) return Math.round(count * 10) / 10;
    const tier = Math.min(Math.floor(Math.log10(count) / 3), suffixes.length - 1);
    const scale = Math.pow(10, tier * 3);
    return (count / scale).toFixed(2) + suffixes[tier];
}

function Bonus() {
    const EasterEgg = "1234";
    const userInput = prompt("You found the bonus!");
    if (userInput && userInput.trim() === EasterEgg) {
        saveState.disable();
        SecretMenu.style.display = (SecretMenu.style.display === "none") ? "block" : "none";
        alert("Whoop de doo.");
    } else {
        alert("What did you expect anyway?");
    }
}

function ResetProgress() {
    if (window.confirm("Are you sure you want to do this?")) {
        FriesManager.set(0);
        totalSeconds = 0;
        FriesPerClick = 1;
        FPC_UpgradeCost = 15;
        FriesPerSecond = 0;
        FPS_UpgradeCost = 20;
        FPC_UpgradeLevel = 1;
        FPS_UpgradeLevel = 1;
        SaveGame();
        Fries.textContent = "Fries: " + formatFries(FriesManager.get());
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
