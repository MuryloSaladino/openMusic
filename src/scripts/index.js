import { renderAlbums, renderFilters, renderPriceComponents } from "./render.js";
import { addTheme, themeButtonEvent } from "./theme.js";

function createEvents() {
    let buttonsContainer = Array.from(document.querySelectorAll('.button'))
    buttonsContainer.push(document.querySelector('.button--selected'))

    buttonsContainer.forEach(element => element.addEventListener('click', () => renderAlbums()))
}

renderPriceComponents()
renderFilters()
renderAlbums()
addTheme()
createEvents()
themeButtonEvent()