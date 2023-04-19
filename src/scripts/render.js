import { categories, products } from "./productsData.js";

export function renderFilters()  {
    const container = document.getElementById('buttons');
    container.innerHTML = '';

    categories.forEach(categorie => {
        container.insertAdjacentHTML('beforeend', `
            <button id="${categories.indexOf(categorie)}" class="button">${categorie}</button>
        `)
    })

    const buttonsContainer = Array.from(document.querySelectorAll('.button'))

    buttonsContainer.forEach(element => {
        element.addEventListener('click', () => {
            if(localStorage.getItem('darkMode')) {
                buttonsContainer.forEach(element => {element.setAttribute('class', 'button dark')})
                element.setAttribute('class', 'button--selected dark--selected')
                localStorage.setItem('filter', buttonsContainer.indexOf(element))
            } else{
                buttonsContainer.forEach(element => {element.setAttribute('class', 'button')})
                element.setAttribute('class', 'button--selected')
                localStorage.setItem('filter', buttonsContainer.indexOf(element))
            }
        })
    })

    localStorage.getItem('filter') ? buttonsContainer[localStorage.getItem('filter')].click() : buttonsContainer[0].click();
}

function filterProducts(arr) {
    const inputPrice = document.getElementById('filters__price-range');
    const buttonsContainer = Array.from(document.querySelectorAll('.button'))
    buttonsContainer.push(document.querySelector('.button--selected'))

    let priceFilter = parseInt(inputPrice.value);
    let categoryFilter = parseInt(buttonsContainer.find(element => element.classList.contains('button--selected')).id);
    
    if(categoryFilter === 0) {
        return arr.filter(element => element.price < priceFilter/10) 
    } else {
        return arr.filter(element => element.price < priceFilter/10 && element.category === categoryFilter)
    }
}

export function renderAlbums()   {
    const container = document.getElementById('results');
    const filteredProducts = filterProducts(products)

    container.innerHTML = '';

    filteredProducts.forEach(product => {
        container.insertAdjacentHTML('beforeend', `
        <div class="album__container">
            <div class="album">
                <img class="album__img" src=${product.img}>
                <div class="album__info">
                <h4>${product.band} - ${product.year}</h4>
                <h2>${product.title}</h2>
                <h3>R$ ${product.price.toFixed(2).toString().replace('.', ',')}</h3>
                </div>
                <button class="button">Comprar</button>
            </div>
        </div>
        `)
    });
    console.log('aqui')
}

export function renderPriceComponents() {
    const input = document.getElementById('filters__price-range');
    const span = document.getElementById('filters__price');

    input.addEventListener('input', () => {
        span.innerText = 'Até R$ ' + (parseInt(input.value)/10).toFixed(2).toString().replace('.', ',');
        input.style.backgroundSize = (input.value/10).toString() + '% 100%'
        renderAlbums()
        localStorage.setItem('price', input.value)
    })

    if(localStorage.getItem('price')) {
        input.value = localStorage.getItem('price');
        input.style.backgroundSize = (input.value/10).toString() + '% 100%'
        span.innerText = 'Até R$ ' + (parseInt(input.value)/10).toFixed(2).toString().replace('.', ',');
    }
}