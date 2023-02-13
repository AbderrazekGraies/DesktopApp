const url = `https://pokeapi.co/api/v2/pokemon?limit=100`;

async function displayPokemon(url) {
  const res = await fetch(url);
  const data = await res.json();
  const title = document.createElement("h3");
  const img = document.createElement("img");
  const types = document.createElement("p");
  const div = document.createElement("div");
  title.innerHTML = data.name;
  img.src = data.sprites.front_default;
  types.innerHTML = "type : ";
  for (i = 0; i < data.types.length; i++) {
    types.innerHTML = types.innerHTML + `${data.types[i].type.name}  `;
  }

  div.classList.add("pokemon");
  div.appendChild(title);
  div.appendChild(img);
  div.appendChild(types);
  div.style.borderRadius = "10px";
  const ListePokemon = document.querySelector(".ListePokemon");
  ListePokemon.appendChild(div);
  div.addEventListener("click", () => {
    localStorage.setItem("pokemon", data.name);
    document.location.href = "pokemon.html";
  });
}

async function displayAll(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);

  for (let i = 0; i < data.results.length; i++) {
    displayPokemon(data.results[i].url);
  }
  if (data.next) displayAll(data.next);
}

displayAll(url);

const search = document.getElementById("recherche");

search.addEventListener("keyup", () => {
  const Pokemons = document.querySelectorAll(".pokemon");
  for (i = 0; i < Pokemons.length; i++) {
    const text = Pokemons[i].querySelector("h3").innerHTML;
    if (!text.includes(search.value)) Pokemons[i].style.display = "none";
    else Pokemons[i].style.display = "grid";
  }
});
