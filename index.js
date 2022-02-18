const greetingDiv = document.querySelector("#greeting");
const answerDiv = document.querySelector("#answer");
const humanName = document.querySelector(".inputName");
const button = document.querySelector("#generate");

const imageElement = document.querySelector(".img");
const titleElement = document.querySelector(".title");
const card = document.querySelector(".card");

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

greet();

humanName.addEventListener("keydown", (event) => {
  const answer = `Hello ${humanName.value}, generate random anime to watch!`;
  if (event.which === 13) {
    typewriter(answerDiv, answer, 0, button);
    humanName.disabled = true;
  }
});

button.addEventListener("click", async () => {
  let i = Math.floor(Math.random() * (154 - 0 + 1) + 0);
  const data = await fetch(`https://api.jikan.moe/v4/anime/1/recommendations`);
  const animes = await data.json();
  const anime = animes.data[i].entry;
  console.log(anime);

  const img = document.createElement("img");
  img.setAttribute("src", anime.images.jpg.image_url);
  imageElement.appendChild(img);

  titleElement.innerHTML = anime.title;
  card.style.display = "flex";
  button.disabled = true;
});
