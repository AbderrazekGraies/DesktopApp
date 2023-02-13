img = document.getElementById("img");
types = document.querySelector(".types");
poke = document.getElementById("name");
info = document.querySelector(".info");
typestr = document.querySelector(".typestr");
//evolution = document.querySelector(".evolution");
search = document.getElementById("recherche");
text = localStorage.getItem("pokemon");

async function displayEvolution(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
}

async function desplayMoreInfo(specie) {
  const res = await fetch(specie);
  const data = await res.json();
  console.log(data);
  info.innerHTML = `<p>Habitat : ${data.habitat.name}<br>
                        Features : ${data.flavor_text_entries[0].flavor_text}</p>`;
  displayEvolution(data.evolution_chain.url);
}

async function desplaytypestr(types) {
  strongAgainst = [];
  weakAgainst = [];
  for (const type of types) {
    const res = await fetch(type.type.url);
    const data = await res.json();
    console.log(data);
    strongAgainst.push(
      ...data.damage_relations.half_damage_from.map((t) => t.name)
    );
    weakAgainst.push(
      ...data.damage_relations.double_damage_from.map((t) => t.name)
    );
  }
  strongAgainst = Array.from(new Set(strongAgainst));
  weakAgainst = Array.from(new Set(weakAgainst));
  store = [];
  store.push(...strongAgainst.map((t) => t));
  strongAgainst = strongAgainst.filter((s) => !weakAgainst.includes(s));
  weakAgainst = weakAgainst.filter((w) => !store.includes(w) || w === "dragon");

  typestr.innerHTML = `<p>strong agaisnt :${strongAgainst.join(", ")}<p>
                        <p> weak against : ${weakAgainst.join(", ")}`;
}

async function display(text) {
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${text}`);
  const pokemon = await result.json();
  console.log(pokemon);
  img.src = pokemon.sprites.front_default;
  types.innerHTML = "";
  for (let i = 0; i < pokemon.types.length; i++) {
    poke.innerHTML = pokemon.name;
    const imgtype = document.createElement("img");
    imgtype.src = `types/${pokemon.types[i].type.name}.png`;
    imgtype.style.height = "60px";
    imgtype.style.borderRadius = "30px";
    types.appendChild(imgtype);
  }
  desplayMoreInfo(pokemon.species.url);
  desplaytypestr(pokemon.types);
}

function recherche() {
  display(search.value);
}

search.addEventListener("keyup", (e) => {
  if (e.key === "Enter") recherche();
});

display(text);

index = 0;

function description() {
  switch (index) {
    case 0:
      info.style.display = "block";
      typestr.style.display = "none";
      //evolution.style.display='none';
      break;
    case 1:
      info.style.display = "none";
      typestr.style.display = "block";
      //evolution.style.display='none';
      break;
    /*case 2:
            info.style.display='none';
            typestr.style.display='none';
            evolution.style.display='block';
            break;*/
  }
}

function right() {
  index = (index + 1) % 2;
  description();
}

function left() {
  index = index - 1;
  if (index === -1) index = 1;
  description();
}
