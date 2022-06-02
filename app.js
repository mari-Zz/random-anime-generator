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
      element.style.display = "flex";
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

async function genreSelect() {
  const data = await fetch(`https://api.jikan.moe/v4/genres/anime`);
  const result = await data.json();
  const genres = result.data;
  let uniqueGenres = [];
  genres.forEach((item) => {
    if (!(item.mal_id in uniqueGenres.map((item) => item.mal_id))) {
      uniqueGenres.push(item);
    }
  });

  uniqueGenres.forEach((genre) => {
    let option = document.createElement("option");
    option.setAttribute("value", genre.mal_id);
    option.innerHTML = genre.name;
    selectElement.appendChild(option);
  });
}

genreSelect();

function animation() {
  let tl = gsap.timeline();
  tl.fromTo(".card", { opacity: 0, y: 20, duration: 2 }, { opacity: 1, y: 0 });
  tl.fromTo(".img", { opacity: 0, y: 20, duration: 1 }, { opacity: 1, y: 0 });
  tl.fromTo(".title", { opacity: 0, y: 20, duration: 1 }, { opacity: 1, y: 0 });
}

button.addEventListener("click", async () => {
  let selectedGenre = selectElement.value;
  const result = await fetch(
    `https://api.jikan.moe/v4/anime?sort=desc&order_by=score&type=tv|movie&genres=${selectedGenre}`
  );
  const animes = await result.json();
  const itemCount = animes.data.length;
  let i = Math.floor(Math.random() * itemCount);
  const anime = animes.data[i];
  console.log(i);
  imageElement.setAttribute("src", anime.images.jpg.image_url);
  titleElement.innerHTML = anime.title;
  animation();
  card.style.display = "flex";
});
