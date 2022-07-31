const images = document.getElementById('characters-wrap');
const search = document.getElementById('search-btn');
const loadMoreButton = document.getElementsByClassName('load-more')[0];
const stringIdArray = allStorage();
const countInRow = 5;
let dataArray = [];
let intIdArray = [];
let cards = document.getElementsByClassName('card');
let count = 5;
let maxCount;

function getAllFromLocal(){
    intIdArray = stringIdArray.map(str => Number(str));
    intIdArray.forEach(item => {
        getDataFromApi(item, false);
    });
}
getAllFromLocal();
updateMaxCount();

function getImage(data, id){
    let card = document.createElement('div');
    card.className = 'card';
    images.prepend(card);

    let img = document.createElement('img');        
    img.src = data.image;
    card.appendChild(img);

    let name = document.createElement('p');        
    name.innerHTML = data.name;
    name.setAttribute('id', 'name');
    card.appendChild(name);

    let status = document.createElement('p');        
    status.innerHTML = data.status;
    status.setAttribute('id', 'status');
    if(data.status === 'Alive'){
        status.style.color = 'green';
    } else if(data.status === 'Dead'){
        status.style.color = 'red';
    }
    card.appendChild(status);
    

    let removeButton = document.createElement('button');
    removeButton.innerHTML = 'Remove';
    removeButton.type = 'button';
    removeButton.name = 'remove';
    removeButton.className ='remove';
    removeButton.addEventListener('click', function () {
        if(confirm('Do you want to remove character?\nEither OK or Cancel.')){
            card.style.display = 'none';

            window.localStorage.removeItem(id);
            if(cards.length>count){
                cards[count].style.display = 'flex';
            }
            let arr = Array.prototype.slice.call(cards);
            let i = arr.indexOf(card);
            cards[i].parentNode.removeChild(cards[i]);
            doButtonVisible();
        }
    });
    card.appendChild(removeButton);
}

function addIdToLocalStorage(id){
    if(!Object.keys(localStorage).map(str => Number(str)).includes(id)){
        localStorage.setItem(id, new Date());
    }
}

function getDataFromApi(id, isSearch){
    const url = `https://rickandmortyapi.com/api/character/${id}`;
    fetch(url)
    .then(response => response.ok ? response.json() : alert('Character not found'))
    .then((data) => {
        if(data){
            const date = localStorage.getItem(`${id}`);
            data.createdOn = date;
            dataArray.push(data);
            if (dataArray.length === intIdArray.length && !isSearch) {
                sortAndDisplay(id);
            }
            hideCards();
            doButtonVisible();
            if (isSearch) {
                updateMaxCount();
                getImage(data, id);
                cards[count].style.display = 'none';
            }
        }
    });
}

function sortAndDisplay(id) {
    dataArray = dataArray.sort(function(a,b){
        return new Date(a.createdOn) - new Date(b.createdOn);
    });
    dataArray.forEach(data => {
        getImage(data, id);
    });
    doButtonVisible();
}

function searchCharacter(){
    const id = parseInt(document.getElementById('search-input').value);
    if (isNaN(id) || id <= 0 || id > maxCount) {
        alert('Character not found');
        return;
    }
    if(!intIdArray.includes(id)) {
        intIdArray.push(id);
        addIdToLocalStorage(id);
        getDataFromApi(id, true);
    } else{
        alert('Character is already in the list');
    }
}

function allStorage() {
    return Object.keys(localStorage);
}

function doButtonVisible() {
    if(count >= cards.length) {
        loadMoreButton.style.visibility = 'hidden';
    } else {
        loadMoreButton.style.visibility = 'visible';
    }
}

function hideCards() {
    for (let i = count; i < cards.length; i++){
        cards[i].style.display = 'none';
    }
}

function showItems(){
    for (let i = count; i < Math.min(count + countInRow, cards.length); i++){
        cards[i].style.display = 'flex';
    }
    count += countInRow;
    doButtonVisible();
}

function updateMaxCount(){
    fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.ok ? response.json() : alert('Invalid url'))
    .then((data) => {
        if(data){
            maxCount = data.info.count;
        }
    });
}

search.addEventListener('click', searchCharacter);
loadMoreButton.addEventListener('click', showItems);
