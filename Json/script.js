const charactersContainer = document.querySelector(".characters-container");
const radioFilters = document.querySelectorAll("input[type = radio]");
const nameFilter = document.querySelector(".name-filter");
const pageBtns = document.querySelectorAll(".page-btn");
const addNewCharBtn = document.querySelector(".new-char-submit-btn");
const baseUrl = "http://localhost:3000/characters";
const filterOptions = { name: "", status: "Alive", page: 1, pageMax: 1 };

loadCharacters();

async function loadCharacters() {
  try {
    let filterUrl = `?name_like=${filterOptions.name}&status=${filterOptions.status}&_page=${filterOptions.page}`;
    const limitUrl = "&_limit=5";
    const charactersCountResponse = await fetch(baseUrl + filterUrl);
    const response = await fetch(baseUrl + filterUrl + limitUrl);
    const charactersCount = await charactersCountResponse.json();
    const characters = await response.json();

    charactersContainer.textContent = "";
    filterOptions.pageMax = Math.ceil(charactersCount.length / 5);
    characters.forEach((character) => {
      createCharPanel(character);
    });
  } catch {
    charactersContainer.textContent =
      "Nie znaleziono postaci spełniających kryteria wyszukiwania.";
  }
}

function createCharPanel(character) {
  const charContainer = createElement("div", "char-container");
  const charImg = createElement("img", "char-img");
  const charName = createElement("h3", "char-name");
  const charStatus = createElement("p", "char-status");
  const charSpecies = createElement("p", "char-species");
  const deleteBtn = createElement("button", "delete-btn");

  charImg.src = character.image;
  charImg.alt = `${character.name} image`;
  charName.textContent = character.name;
  charStatus.textContent = `Status: ${character.status}`;
  charSpecies.textContent = `Gatunek: ${character.species}`;
  deleteBtn.textContent = "Usuń postać";
  deleteBtn.value = character.id;
  deleteBtn.addEventListener("click", (e) => {
    deleteCharPanel(e);
  });
  charContainer.append(charImg, charName, charStatus, charSpecies, deleteBtn);
  charactersContainer.append(charContainer);
}

function createElement(tag, className) {
  const newElement = document.createElement(tag);

  newElement.className = className;
  return newElement;
}

radioFilters.forEach((radioBox) =>
  radioBox.addEventListener("change", (e) => {
    filterOptions.status = e.target.value;
    loadCharacters();
  })
);

nameFilter.addEventListener("keyup", (e) => {
  filterOptions.name = e.target.value;

  loadCharacters();
});

pageBtns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    if (e.target.value === "next" && filterOptions.page < filterOptions.pageMax)
      filterOptions.page = filterOptions.page + 1;
    else if (e.target.value === "prev" && filterOptions.page > 1)
      filterOptions.page = filterOptions.page - 1;

    loadCharacters();
  })
);

function createNewCharacterData() {
  const nameInput = document.querySelector(".new-char-name");
  const statusSelector = document.querySelector(".new-char-status");
  const speciesInput = document.querySelector(".new-char-species");
  const newChar = {
    name: nameInput.value,
    status: statusSelector.value,
    species: speciesInput.value,
    image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
  };
  return newChar;
}
async function postNewCharacter(newChar) {
  const response = await fetch("http://localhost:3000/characters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newChar),
  });
  const data = await response.json();
}

addNewCharBtn.addEventListener("click", () => {
  const newChar = createNewCharacterData();
  postNewCharacter(newChar);
});

function deleteCharPanel(e) {
  deleteCharacterData(e.target.value);
  loadCharacters();
}

async function deleteCharacterData(id) {
  const response = await fetch(`http://localhost:3000/characters/${id}`, {
    method: "DELETE",
  });
}
