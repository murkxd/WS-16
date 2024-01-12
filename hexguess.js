const hexText = document.getElementById("hex-text");
const circleCont = document.getElementById("circle-div");
const infoText = document.getElementById("info-text");
const newGameButton = document.getElementById("new-game-button");

let playingGame = true;
let currentLevel = 4;
let targetColor;

function displayNewGameButton() {
  newGameButton.classList.remove("new-game-button-hide");
  newGameButton.classList.add("new-game-button-show");
}

function startNewGame() {
  playingGame = true;
  newGameButton.classList.remove("new-game-button-show");
  newGameButton.classList.add("new-game-button-hide");

  circleCont.innerHTML = "";
  infoText.innerHTML = "Guess the color";

  generateCircles();
}

function generateRandomHexCode() {
  const randomNum = Math.floor(Math.random() * 16777216);
  const hexCode = randomNum.toString(16).toUpperCase();
  const paddedHexCode = "000000".substring(0, 6 - hexCode.length) + hexCode;
  return "#" + paddedHexCode;
}

function generateUniqueHex(previousColor) {
  let newHex;
  do {
    newHex = generateRandomHexCode();
  } while (previousColor === newHex);
  return newHex;
}

function generateCircles() {
  targetColor = generateRandomHexCode();
  hexText.innerHTML = targetColor;

  const randomNum = Math.floor(Math.random() * currentLevel);

  for (let i = 0; i < currentLevel; i++) {
    const circle = document.createElement("div");
    circle.classList.add("color-button-visible");

    if (i === randomNum) {
      circle.style.backgroundColor = targetColor;
      circle.style.boxShadow = "0px 0px 10px " + targetColor;
      hexText.innerHTML = targetColor;

      circle.addEventListener("click", function () {
        if (playingGame) {
          infoText.innerHTML = "YOU WIN! THAT'S THE ";
          const colorText = document.createElement("span");
          colorText.innerHTML = "COLOR!";
          colorText.style.color = circle.style.backgroundColor;
          infoText.appendChild(colorText);
          displayNewGameButton();

          const allCircles = document.querySelectorAll(".color-button-visible");
          allCircles.forEach((otherCircle) => {
            if (otherCircle !== circle) {
              otherCircle.style.display = "none";
            }
          });
        }
      });
    } else {
      const circleColor = generateUniqueHex(targetColor);
      circle.style.backgroundColor = circleColor;
      circle.style.boxShadow = "0px 0px 10px " + circleColor;

      circle.addEventListener("click", function () {
        if (playingGame) {
          wrongGuess(rgbaToHex(circle.style.backgroundColor));
          circle.style.display = "none";
        }
      });
    }

    circleCont.appendChild(circle);
  }
}

function wrongGuess(color) {
  const colorText = document.createElement("span");
  infoText.innerHTML = "WRONG! This color is ";
  colorText.innerHTML = color.toUpperCase();
  colorText.style.color = color.toUpperCase();
  infoText.appendChild(colorText);
}

function rgbaToHex(rgba) {
  const hex = rgba
    .replace(/^rgba?\(|\s+|\)$/g, "")
    .split(",")
    .map((x) => (+x).toString(16).padStart(2, "0"))
    .join("");
  return "#" + hex;
}

function pickColor(selectedColor) {
  if (selectedColor === targetColor) {
    console.log("VICTORY!");
  }
}

function changeLevel(newLevel) {
  currentLevel = newLevel;
  circleCont.innerHTML = "";
  generateCircles();
}

generateCircles();
