/* To be made:
 - Color generator function (6x digits 0-F)
    --> updates .currentColor textContent
 - Light vs Dark detector for foreground text
*/

// Var init:
let newColor;
let hexValues = [];

// HTML connectors:
const currentColorH2 = document.querySelector("#currentColor");
const generatorButton = document.querySelector("generator");


function generateNewColor() {
    // rand 1-16, convert to 0-F
}