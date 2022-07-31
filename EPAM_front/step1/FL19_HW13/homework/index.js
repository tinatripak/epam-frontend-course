const amountofTiles = 9;
const reset = document.getElementById('reset');
const container = document.getElementsByClassName('container');
const announcer = document.querySelector('.announcer');
const displayPlayer = document.querySelector('.display-player');
const tiles = []
const emptyMap = ['', '', '', '', '', '', '', '', ''];
let count = 0;
let isFirstClicked = false;
let selectedTile;

function createPlayingField() {
    for (let i = 0; i < amountofTiles; i++) {
        const div = document.createElement('div');
        div.className = 'tile'
        container[0].appendChild(div);
        tiles.push(div);
    }
}

createPlayingField();

const dragAndDrop = () => {
    const imgs = Array.from(document.querySelectorAll('img'));
    const blocks = Array.from(document.querySelectorAll('.avatar-container'));

    imgs.forEach((img) => {
        img.setAttribute('draggable', true);
    })
    
    const dragStart = function(){
        setTimeout(() => {
            this.classList.add('hide');
        }, 0)
    };
    const dragEnd = function(){
        this.classList.remove('hide');
    }
    const dragOver = function(event){
        if(this.getElementsByTagName('img').length === 0){
        event.preventDefault();
        const hide = document.querySelector('.hide');
        this.appendChild(hide);
        }
    }
    blocks.forEach((block) => {
        block.addEventListener('dragover', dragOver);
    });

    imgs.forEach((img) => {
        img.addEventListener('dragstart', dragStart);
        img.addEventListener('dragend', dragEnd);
    })
}

dragAndDrop();

document.addEventListener('DOMContentLoaded', () => {
    const xWon = 'PLAYERX_WON';
    const oWon = 'PLAYERO_WON';
    const deadHeat = 'DEAD HEAT!';
    const combinationsForWinning = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let map = [...emptyMap];
    let currentPlayer = 'X';
    let isActive = true;

    function processResults() {
        let victory = false;
        for (let i = 0; i < amountofTiles - 1; i++) {
            const combination = combinationsForWinning[i];
            const first = map[combination[0]];
            const second = map[combination[1]];
            const third = map[combination[2]];

            if (first === '' || second === '' || third === '') {
                continue;
            }

            if (first === second && second === third) {
                victory = true;

                break;
            }
        }

        if (victory) {
            announceResult(currentPlayer === 'X' ? xWon : oWon);
                isActive = false;

                return;
            }

        if (!map.includes('')){
            announceResult(deadHeat);
        }
    }

    const announceResult = (type) => {
        switch(type){
            case xWon:
                announcer.innerHTML = 'PLAYER<span class="playerX"> X WON!</span> ';
                break;
            case oWon:
                announcer.innerHTML = 'PLAYER<span class="playerO"> O WON!</span>';
                break;
            case deadHeat:
                announcer.innerText = deadHeat;
                break;
            default:
                announcer.innerHTML = '';
                break;
        }
        announcer.classList.remove('hide');
    };
    
    const updateMap = (i) => {
        map[i] = currentPlayer;
    }

    const validation = (tile) => {
        return !(tile.innerText === 'O' || tile.innerText === 'X');
    };

    const nextPlayer = () => {
        displayPlayer.classList.remove(`player${currentPlayer}`);

        if(currentPlayer === 'X'){
            currentPlayer = 'O';
        } else {
            currentPlayer = 'X';
        }

        displayPlayer.innerText = currentPlayer;
        displayPlayer.classList.add(`player${currentPlayer}`);
    }

    const clickProcess = (tile, i) => {
        if(isActive && validation(tile)){
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);

            updateMap(i);
            processResults();
            nextPlayer();
        }
    }
    
    const resetMap = () => {
        map = [...emptyMap];
        isActive = true;

        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            nextPlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerO');
            tile.classList.remove('playerX');
            tile.style.backgroundColor = 'transparent';

        });

    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => clickProcess(tile, index));
    });

    
    document.addEventListener('keydown', (e) => {
        if(!isFirstClicked){
            selectedTile = tiles[count];
            tiles[count].style.backgroundColor = 'grey';
            isFirstClicked = true;
            return;
        }
        switch(e.key){ 
            case 'ArrowRight': 
                if (count >= tiles.length - 1) {
                    return;
                }
                count += 1;
                tiles[count-1].style.backgroundColor = 'transparent';

                tiles[count].style.backgroundColor = 'grey';
                selectedTile = tiles[count];
                break;
            case 'ArrowLeft':
                if (count < 1) {
                    return;
                }
                count -= 1;
                tiles[count+1].style.backgroundColor = 'transparent';

                tiles[count].style.backgroundColor = 'grey';
                selectedTile = tiles[count];
                break;
            case 'Enter':
                if (!isFirstClicked && selectedTile === undefined) {
                    return;
                }
                clickProcess(selectedTile, count);
                break; 
            default:
                break;
        }
    });
    
    reset.addEventListener('click', resetMap);
});
