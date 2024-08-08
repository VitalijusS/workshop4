const searchDOM = document.querySelector('.search');
const enterDOM = document.querySelector('.enter');
const buttonDOM = document.querySelector('.btn');
const listDOM = document.querySelector('.list');

let data = [];
if (localStorage.getItem('countries') !== null) {
    data = JSON.parse(localStorage.getItem('countries'));
}
displayItems();
buttonDOM.addEventListener('click', () => {
    enterDOM.value.trim().length === 0 ? '' : data.push(enterDOM.value);
    enterDOM.value = '';
    localStorage.setItem('countries', JSON.stringify(data));
    displayItems();
})
searchDOM.addEventListener('input', () => {
    displayItems();
})
function displayItems() {
    let HTML = '';
    for (const item of data) {
        if (item.toLowerCase().includes(searchDOM.value.toLowerCase())) {
            HTML += `<li>${item} 
            <button>X</button>
            </li>`
        }
    }
    listDOM.innerHTML = HTML;
    const listBtnsDOM = document.querySelectorAll('.list button');

    for (let i = 0; i < listBtnsDOM.length; i++) {
        listBtnsDOM[i].addEventListener('click', () => {
            data.splice(i, 1);
            localStorage.setItem('countries', JSON.stringify(data));
            displayItems();
        })
    }
}
