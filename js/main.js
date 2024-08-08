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
    enterDOM.value.trim().length === 0 ? alert("Input can't be empty") : data.push({ id: 'id_' + new Date(), text: enterDOM.value });
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
        if (item.text.toLowerCase().includes(searchDOM.value.toLowerCase())) {
            HTML += `
            <li>
                <p>${item.text}</p> 
                <button id="${item.id}">X</button>
            </li>`;
        }
    }
    listDOM.innerHTML = HTML;
    const listBtnsDOM = listDOM.querySelectorAll('button');

    for (let i = 0; i < listBtnsDOM.length; i++) {
        listBtnsDOM[i].addEventListener('click', () => {
            data = data.filter(item => item.id !== listBtnsDOM[i].id)
            localStorage.setItem('countries', JSON.stringify(data));
            displayItems();
        })
    }
}
