const charactersContainer = document.querySelector(".characters-container");
const radioFilters = document.querySelectorAll("input[type = radio]");
const nameFilter = document.querySelector(".name-filter");
const baseUrl = "https://rickandmortyapi.com/api/character/";
const filterOptions = { name: "", status: "alive", page: 1, pageMax: 1 };

loadCharacters();

function createElement(tag, className) {
  const newElement = document.createElement(tag);

  newElement.className = className;
  return newElement;
}
async function loadCharacters() {
  try {
    let filterUrl = `?page=${filterOptions.page}&name=${filterOptions.name}&status=${filterOptions.status}`;
    const response = await fetch(baseUrl + filterUrl);
    const characters = await response.json();

    charactersContainer.textContent = "";
    characters.results.forEach((character) => {
      const charContainer = createElement("div", "char-container");
      const charImg = createElement("img", "char-img");
      const charName = createElement("h3", "char-name");
      const charStatus = createElement("p", "char-status");
      const charSpecies = createElement("p", "char-species");

      charImg.src = character.image;
      charImg.alt = `${character.name} image`;
      charName.textContent = character.name;
      charStatus.textContent = `Status: ${character.status}`;
      charSpecies.textContent = `Gatunek: ${character.species}`;
      charContainer.append(charImg, charName, charStatus, charSpecies);
      charactersContainer.append(charContainer);
    });
  } catch (err) {
    console.error("Error:", err);
  }
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
