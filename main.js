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
const controlsDiv = document.querySelector("#controls");
const textChange = document.querySelectorAll(".altShade");
const newButton = document.querySelector("#generator");
const rgbValue = document.querySelector("#rgbValue");
const hslValue = document.querySelector("#hslValue");


function generateNewColor() {
    // rand 1-16, convert to 0-F
    hexValues = [];
    for (i=0; i<6; i++) {
        hexValues[i] = Math.floor(Math.random()*16);
        hexValues[i] = hexValues[i].toString(16);
    }
    // console.log(hexValues);
    newColor = "#" + hexValues.join('');
    // console.log(newColor);
    document.body.style.backgroundColor = newColor;
    currentColorH2.textContent = String(newColor).toUpperCase();
    let [r, g, b, h, s, l] = HexToHSL(newColor);
    // console.log("h, s, l: ", h, s, l);
    if (l < 50) {
        controlsDiv.style.borderColor = "#fff";
        textChange.forEach(element => {
            element.style.color = "#fff";
        });
        newButton.style.borderColor = "#fff";
    } else {
        controlsDiv.style.borderColor = "#000"; 
        textChange.forEach(element => {
            element.style.color = "#000";
        });
        newButton.style.borderColor = "#000";
    }
    rgbValue.textContent = [r,g,b].join(', ');
    hslValue.textContent = [h,String(s)+"%",String(l)+"%"].join(', ');
}

function HexToHSL(hexNum) {
    // Slice into sets of two:
    let r = hexNum.slice(1,3);
    let g = hexNum.slice(3,5);
    let b = hexNum.slice(5,7);
    // Convert to rgb range (0-255):
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
    console.log("rgb: ", r, g, b);
    // To binary range (0-1):
    r /= 255; g /= 255; b /= 255;
    // Find min and max values:
    let min = Math.min(r,g,b);
    let max = Math.max(r,g,b);
    // console.log("max and min: ", max, min);
    // Calculate luminance:
    let lum = (min + max)/2;
    // Calculate saturation:
    let sat;
    let hue;
    if (min === max) {
        sat = 0;
        hue = 0;
    } else {
        if (lum <= 0.5) {
            sat = (max-min)/(max+min);
        } else {
            sat = (max-min)/(2-max-min);
        }
        // Calculate hue:
        switch (max) {
            case r:
                hue = (g-b)/(max-min);
                break;
            case g:
                hue = 2+((b-r)/(max-min));
                break;
            case b:
                hue = 4+((r-g)/(max-min));
                break;
        }
        hue *= 60;
        if (hue < 0) { hue += 360 };
    }
    // Round values:
    hue = Math.round(hue);
    sat = Math.round(sat*100);
    lum = Math.round(lum*100);
    // console.log("Hue, Sat, Lum" , hue, sat, lum);
    return [(r*255), (g*255), (b*255), hue, sat, lum];
}