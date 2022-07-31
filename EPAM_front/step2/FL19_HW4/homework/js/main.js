let a = 5;
function f(){
    if(a){
        console.log(a);
        let a =10;
    }
}
f();


const readyState = 4;
const statusOk = 200;
const loadByJS = document.getElementById('load-by-js');
const loadByFetch = document.getElementById('load-by-fetch');
const gridItemJs = document.getElementById('grid-item-js');
const gridItemFetch = document.getElementById('grid-item-fetch');
let clicked = false;
let downloadedFetch = false;
let arr = [];

function putMethod(id_, input, p, divTwo, div){
    const url = `https://jsonplaceholder.typicode.com/users/${id_}`;
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
            id: id_,
            name: input.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then((res) => res.json())
    .then((json) => {
        p.innerHTML = json.name;
        divTwo.style.display = 'none';
        div.style.height = '10vh';
        clicked = false;
        input.value = '';
    })
    .catch(err => console.log('Request Failed', err)); 
}
function deleteMethod(id_, p, div){
    const url = `https://jsonplaceholder.typicode.com/users/${id_}`;
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body:null
    })
    .then(response => response.json())
    .then(data => {
        p.innerHTML = data.name;
        div.style.display = 'none';
    })
    .catch(err => console.log(err))
    alert(`User with id - ${id_} was deleted`);
}

function insertHTMLtoJS(element){
    let div = document.createElement('div');
    div.classList.add(`${element.name.split(' ')[0]}`)
    div.innerHTML = `${element.name}`;
    gridItemJs.appendChild(div);
}

function arrayRemove(arr, value) { 
    return arr.filter(function(ele){ 
        return ele !== value; 
    });
}

function insertHTMLtoFetch(id_, name){
    let div = document.createElement('div');
    div.setAttribute('id', `${id_}`);
    gridItemFetch.appendChild(div);

    let p = document.createElement('p');
    p.innerHTML = `${name}`;
    div.appendChild(p);

    let updateButton = document.createElement('button');
    updateButton.classList = 'first-row';
    updateButton.innerHTML = 'Update';
    updateButton.addEventListener('click', function () {
        if(!clicked){
            divTwo.style.display = 'flex';
            divTwo.style.background = 'none';
            div.style.height = '15vh';
            clicked = true;
        } else{
            divTwo.style.display = 'none';
            div.style.height = '10vh';
            clicked = false;
        }
    });
    div.appendChild(updateButton);

    let deleteButton = document.createElement('button');
    deleteButton.classList = 'first-row';
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click', function () {
        deleteMethod(id_, p, div);
        arr = arrayRemove(arr, id_);
    });
    div.appendChild(deleteButton);

    let divTwo = document.createElement('div');
    divTwo.classList = 'second-row';
    div.appendChild(divTwo);

    let input = document.createElement('input');
    divTwo.appendChild(input);

    let saveButton = document.createElement('button');
    saveButton.innerHTML = 'Save';
    saveButton.addEventListener('click', function () {
        putMethod(id_, input, p, divTwo, div)
    });
    divTwo.appendChild(saveButton);
}

loadByJS.addEventListener('click', function () {
    loadByJS.innerHTML='Loading...';
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === readyState && this.status === statusOk) {
            while (gridItemJs.firstChild) {
                gridItemJs.removeChild(gridItemJs.lastChild);
            }
            JSON.parse(this.responseText).forEach(x => insertHTMLtoJS(x));
            loadByJS.innerHTML='Load by JS';
        }
    };
    request.open('GET', 'https://jsonplaceholder.typicode.com/users');
    request.send();
});

loadByFetch.addEventListener('click', function(){
    loadByFetch.innerHTML='Loading...';
    const url = 'https://jsonplaceholder.typicode.com/users';
    fetch(url)
    .then(res => res.json())
    .then(res => {
        res.forEach((item) => {
            const itemId = item.id;
            const itemName = item.name;
            if(!downloadedFetch){
                insertHTMLtoFetch(itemId, itemName);
                arr.push(itemId);
            } else{
                console.log(itemId);
                console.log(arr);
                if(!arr.includes(itemId)){
                    insertHTMLtoFetch(itemId, itemName);
                    console.log(itemId)
                }
            }
        })
        downloadedFetch = true;
        loadByFetch.innerHTML='Load by Fetch';
    })
    .catch(err => console.log('Request Failed', err)); 
})
