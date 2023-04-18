import { renderAlbums, renderFilters, renderPriceComponents } from "./render.js";
import { addTheme } from "./theme.js";

function createEvents() {
    const themeButton = document.querySelector('.theme')
    const buttonsContainer = Array.from(document.querySelectorAll('.button'))
    buttonsContainer.push(document.querySelector('.button--selected'))

    themeButton.addEventListener('click', () => {
        if(localStorage.getItem('darkMode')) {
           localStorage.removeItem('darkMode') 
        } else {
           localStorage.setItem('darkMode', true) 
        } 
        addTheme()
        renderFilters()
    })

    buttonsContainer.forEach(element => element.addEventListener('click', () => renderAlbums()))
}

renderPriceComponents()
renderFilters()
renderAlbums()
addTheme()
createEvents()