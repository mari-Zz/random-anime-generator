const greetingDiv = document.querySelector("#greeting");
const answerDiv = document.querySelector("#answer");
const humanName = document.querySelector(".inputName");
const button = document.querySelector("#generate");

function typewriter(div, sentence, i, element) {
  setTimeout(() => {
    div.innerHTML += sentence[i];
    i += 1;
    if (i < sentence.length) {
      typewriter(div, sentence, i, element);
    }
    if (i === sentence.length) {
      element.style.display = "block";
      element.focus();
    }
  }, 100);
}

function greet() {
  const greet = "Welcome human, what is your name?";
  typewriter(greetingDiv, greet, 0, humanName);
}

function input() {
  humanName.addEventListener("keydown", (event) => {
    const answer = `Hello ${humanName.value}, generate your anime character!`;
    if (event.which === 13) {
      typewriter(answerDiv, answer, 0, button);
      humanName.disabled = true;
    }
  });
}

function chooseYesOrNO() {}

function start() {
  greet();
  input();
  chooseYesOrNO();
}

start();
