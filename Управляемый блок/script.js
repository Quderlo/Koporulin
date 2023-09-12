var colors = ["Red", "Grey", "Blue", "Green", "Yellow", "Purple", "Pink", "Orange"];

function getblock(){
    return document.getElementById("block");
}

function widthPlus() {
    getblock().style.backgroundColor = colors[Math.random(0, 7)];
}

function changeColor() {

    getblock().style.backgroundColor = colors[Math.ceil(Math.randomInt(7))];
}
