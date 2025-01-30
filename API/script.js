const charactersContainer = document.querySelector(".characters-container");

loadCharacters();

function createElement(tag, className) {
  const newElement = document.createElement(tag);

  newElement.className = className;
  return newElement;
}
async function loadCharacters() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character/");
    const characters = await response.json();

    characters.results.forEach((character) => {
      const charContainer = createElement("div", "char-container");
      const charImg = createElement("img", "char-img");
      const charName = createElement("h3", "char-name");
      const charStatus = createElement("p", "char-status");
      const charSpecies = createElement("p", "char-species");

      charImg.src = character.image;
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
