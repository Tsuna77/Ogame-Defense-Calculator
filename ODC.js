// ==UserScript==
// @name         Ogame Defense Calculator
// @namespace    https://tsuna.fr/
// @version      2025-08-09
// @description  Give advice about ogame defense ratio optimization
// @author       Tsuna
// @match        https://*.ogame.gameforge.com/game/index.php?page=ingame&component=defenses*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gameforge.com
// @grant        none
// @run-at       document-end
// ==/UserScript==

const ratio = {
    "rocketLauncher": 1,
    "laserCannonHeavy": 3.33,
    "gaussCannon": 13.99,
    "plasmaCannon": 40,
    "missileInterceptor": 50
};

const perma = {
    "laserCannonLight": 0,
    "ionCannon": 0,
    "shieldDomeSmall": 1,
    "shieldDomeLarge": 1
};

(function() {
    'use strict';

    const myDelay = 300;

    setTimeout(() => {
        console.log("ODC loaded");

        // Récupérer la quantité de rocketLauncher
        const rocketLauncherElements = document.getElementsByClassName("rocketLauncher");
        let rocketLauncherCount = 0;

        for (let element of rocketLauncherElements) {
            const stockAmountElement = element.querySelector(".stockAmount");
            if (stockAmountElement) {
                rocketLauncherCount = parseInt(stockAmountElement.textContent);
                break;
            }
        }

        // Vérifier les ratios pour chaque type de défense
        for (const [defenseType, ratioValue] of Object.entries(ratio)) {
            const elements = document.getElementsByClassName(defenseType);
            let count = 0;

            for (let element of elements) {
                const stockAmountElement = element.querySelector(".stockAmount");
                if (stockAmountElement) {
                    count = parseInt(stockAmountElement.textContent);
                    const requiredCount = Math.floor(rocketLauncherCount / ratioValue);
                    const isSufficient = count >= requiredCount;

                    // Ajouter un span pour indiquer si la quantité est suffisante
                    const sufficiencySpan = document.createElement("span");
                    sufficiencySpan.textContent = ` /${requiredCount}`;
                    sufficiencySpan.style.color = isSufficient ? "green" : "red";
                    sufficiencySpan.style.marginLeft = "5px";
                    stockAmountElement.appendChild(sufficiencySpan);

                    break;
                }
            }
        }

        // Vérifier les valeurs minimales pour les éléments permanents
        for (const [defenseType, minValue] of Object.entries(perma)) {
            const elements = document.getElementsByClassName(defenseType);
            let count = 0;

            for (let element of elements) {
                const stockAmountElement = element.querySelector(".stockAmount");
                if (stockAmountElement) {
                    count = parseInt(stockAmountElement.textContent);
                    const isSufficient = count >= minValue;

                    // Ajouter un span pour indiquer si la quantité est suffisante
                    const sufficiencySpan = document.createElement("span");
                    sufficiencySpan.textContent = ` /${minValue}`;
                    sufficiencySpan.style.color = isSufficient ? "green" : "red";
                    sufficiencySpan.style.marginLeft = "5px";
                    stockAmountElement.appendChild(sufficiencySpan);

                    break;
                }
            }
        }

    }, myDelay);
})();
