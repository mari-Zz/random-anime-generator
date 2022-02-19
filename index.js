const greetingDiv = document.querySelector("#greeting");
const answerDiv = document.querySelector("#answer");
const humanName = document.querySelector(".inputName");
const button = document.querySelector("#generate");

const imageElement = document.querySelector("#image");
const titleElement = document.querySelector(".title");
const card = document.querySelector(".card");
const genresDiv = document.querySelector(".genres");
const selectElement = document.querySelector("#genres");

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
  }, 60);
}

function greet() {
  const greet = "Welcome human, what is your name?";
  typewriter(greetingDiv, greet, 0, humanName);
}

greet();

humanName.addEventListener("keydown", (event) => {
  const answer = `Hello ${humanName.value}, choose you genre!`;
  if (event.which === 13) {
    typewriter(answerDiv, answer, 0, genresDiv);
    humanName.disabled = true;
  }
});

async function genreButtons() {
  const data = await fetch(`https://api.jikan.moe/v4/genres/anime`);
  const result = await data.json();
  const genres = result.data;
  genres.forEach((genre) => {
    let option = document.createElement("option");
    option.setAttribute("value", genre.mal_id);
    option.innerHTML = genre.name;
    selectElement.appendChild(option);
  });
}

genreButtons();

function animation() {
  let tl = gsap.timeline();
  tl.fromTo(".card", { opacity: 0, y: 20, duration: 2 }, { opacity: 1, y: 0 });
  tl.fromTo(".img", { opacity: 0, y: 20, duration: 1 }, { opacity: 1, y: 0 });
  tl.fromTo(".title", { opacity: 0, y: 20, duration: 1 }, { opacity: 1, y: 0 });
}

button.addEventListener("click", async () => {
  let i = Math.floor(Math.random() * (25 - 0 + 1) + 0);
  let selectedGenre = selectElement.value;
  const data = await fetch(
    `https://api.jikan.moe/v4/anime?genres=${selectedGenre}`
  );
  const animes = await data.json();
  const anime = animes.data[i];

  imageElement.setAttribute("src", anime.images.jpg.image_url);
  titleElement.innerHTML = anime.title;
  animation();
  card.style.display = "flex";
});

async function fetchTedt() {
  const data = await fetch("https://animechan.vercel.app/api/available/anime");
  const result = await data.json();

  console.log(result);
}

fetchTedt();
