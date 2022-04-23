const gameContainer = document.getElementById("game");
let target1 = null;
let target2 = null;
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);

    //start with colors to remember
    newDiv.style.backgroundColor = newDiv.className;
    setTimeout(function () {
      newDiv.style.background = "white";
    }, 5000);
    newDiv.addEventListener("click", handleCardClick);
    if (newDiv.classList.contains("clicked")) {
      newDiv.style.background = "white";
    }
  }
}


// TODO: Implement this function!
function handleCardClick(event) {
  let temp = event.target;

  if (temp.classList.contains("matched")) {
    return;
  } else {
    if (!target1 || !target2) {
      target1 = target1 || temp;
      target2 = temp === target1 ? null : temp;
    }
    if (!event.target.classList.contains("clicked")) {
      event.target.style.backgroundColor = event.target.className;
      event.target.classList.add("clicked");
    } else if (event.target.classList.contains("clicked")) {
      event.target.classList.remove("clicked");
      event.target.style.backgroundColor = "white";
    }
    if (target1.className === target2.className) {
      target1.classList.add("matched");
      target2.classList.add("matched");
      target1.removeEventListener("click", handleCardClick);
      target2.removeEventListener("click", handleCardClick);
      target1 = null;
      target2 = null;
    } else {
      setTimeout(function () {
        target1.style.backgroundColor = "white";
        target2.style.backgroundColor = "white";
        target1 = null;
        target2 = null;
        target1.classList.remove("clicked");
        target2.classList.remove("clicked");
      }, 1000);
    }
  }
}
// when the DOM loads
createDivsForColors(shuffledColors);

/* */