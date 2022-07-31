class Unit {
    constructor(name, img, health, armor, attackrate, damage) {
        this.name = name;
        this.img = img;
        this.health = health;
        this.armor = armor;
        this.attackrate = attackrate;
        this.damage = damage;
    }

    healthDecrease(enemy){
        let dmgPerSecond = enemy.damage-enemy.attackrate
        this.health -= dmgPerSecond-enemy.armor;
    }
}
class Game{
    choosePlayer(){
        if(!isChoosen){
            document.querySelectorAll('.card').forEach(item => {
                item.addEventListener('click', event => {
                    isChoosen = true;
                    choosen_player = event.path[1].id;
                    let display = new Display();
                    display.hideAllExpectChosen(choosen_player);
                    display.notHideFight();
                })
            });
        }
    }
    async hit(){
        while(my_player.health>0 && computer_player.health>0){
            const computer_player_name = computer_player.name.split(' ')[0];
            const player_name = my_player.name.split(' ')[0];
            if(computer_player.health>0){
                my_player.healthDecrease(computer_player);
                console.log(my_player.health)
                document.querySelectorAll(`div.battle-field div#${player_name} p.health`).forEach(item => {
                    if(my_player.health <= 0){
                        item.innerHTML = 'health: dead';
                    } else{
                        item.innerHTML = `health: ${my_player.health}`;
                    }
                })
                await this.sleep(timeForSleep);
            }
            if(my_player.health>0){
                computer_player.healthDecrease(my_player);
                document.querySelectorAll(`div.battle-field div#${computer_player_name} p.health`).forEach(item => {
                    if(computer_player.health <=0){
                        item.innerHTML = 'health: dead';
                    } else{
                        item.innerHTML = `health: ${computer_player.health}`;
                    }
                })
                await this.sleep(timeForSleep);
            }
        }
        let display = new Display();
        display.showImage()
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

class Display{
    makeCard(person, div){
        let card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('id', `${person.name.split(' ')[0]}`)
        div.append(card);
    
        let img = document.createElement('img');        
        img.src = person.img;
        card.appendChild(img);
    
        let name = document.createElement('h3');        
        name.innerHTML = person.name;
        card.appendChild(name);
    
        let health = document.createElement('p');        
        health.innerHTML = `health: ${person.health}`;
        health.className = 'health';
        card.appendChild(health);
    
        let armor = document.createElement('p');        
        armor.innerHTML = `armor: ${person.armor}`;
        armor.className = 'armor';
        card.appendChild(armor);
    
        let attackrate = document.createElement('p');        
        attackrate.innerHTML = `attack rate: ${person.attackrate}`;
        attackrate.className = 'attack-rate';
        card.appendChild(attackrate);
    
        let damage = document.createElement('p');        
        damage.innerHTML = `damage: ${person.damage}`;
        damage.className = 'damage';
        card.appendChild(damage);
    }

    makeCards(){
        mass.forEach(element => {
            this.makeCard(element, characters)
        });
    }

    hideAllExpectChosen(choosen_player){
    
        characters.style.display = 'none';
        console.log(mass)
        mass.forEach(element => {
            if(element.name.split(' ')[0] === choosen_player){
                my_player = element;
            }
        });
        computer_player = mass[Math.floor(Math.random() * mass.length)];
        while(computer_player === my_player){
            computer_player = mass[Math.floor(Math.random() * mass.length)];
        }
        this.makeCard(my_player, battle_field);
        this.makeCard(computer_player, battle_field);
    }
    
    hideHiddenClass(){
        let hidden = document.getElementsByClassName('hidden')[0];
        hidden.style.display = 'none';
    }
    hideHeader(){
        let i;
        for (i = 0; i < header.length; i++) {
            header[i].style.display = 'none';
        }
        start.style.display = 'none';
    }
    
    notHideFight(){
        let hidden = document.getElementsByClassName('hidden')[0];
        hidden.style.display = 'block';
    }
    doImagesFlex(){
        document.querySelectorAll(`div.battle-field img`).forEach(item => {
            item.style.display='flex';
        })
    }
    
    paintColor(name, color){
        document.querySelectorAll(`div.battle-field div#${name}`).forEach(item => {
            item.style.border = color;
        })
    }

    async paintDiffirentColors(name){
        document.querySelectorAll(`div.battle-field div#${name} p.health`).forEach(async item => {
            if(item.innerHTML === 'health: dead'){
                this.paintColor(name, 'thick solid rgb(174 25 25)')
            } else{
                this.paintColor(name, 'thick solid #52b252')
                let game = new Game();
                await game.sleep(timeForSleep);
                alert(`The victory of ${name}`)
                location.reload();
            }
        })
    }

    showImage(){
        const computer_player_name = computer_player.name.split(' ')[0];
        const player_name = my_player.name.split(' ')[0];
        this.paintDiffirentColors(computer_player_name);
        this.paintDiffirentColors(player_name);
    }
}

let start = document.getElementsByClassName('start')[0]; 
let fight = document.getElementsByClassName('fight')[0]; 
let header = document.getElementsByTagName('header');
let characters = document.getElementsByClassName('characters-list')[0]; 
let battle_field = document.getElementsByClassName('battle-field')[0]; 
let choosen_player = '';
let computer_player;
let my_player;
let isChoosen = false;
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const timeForSleep = 500;
const mass = [
    new Unit(
        'Varian Wrynn',
        'https://static.wikia.nocookie.net/wowpedia/images/b/be/Varian_Wei.jpg',
        '100',
        '5',
        '20',
        '50'),
    new Unit(
        'Bolvar Fordragon',
        'https://static.wikia.nocookie.net/wowpedia/images/2/20/Bolvar_Game_Informer_cropped.png',
        '100',
        '10',
        '15',
        '35'),
    new Unit(
        'Cairne Bloodhoof',
        'https://static.wikia.nocookie.net/wowpedia/images/d/dc/Cairne_Mercenaries_3.jpg',
        '100',
        '9',
        '10',
        '20'),
    new Unit(
        'Medivn',
        'https://static.wikia.nocookie.net/wowpedia/images/2/27/Medivh_Cropped.jpg',
        '100',
        '14',
        '50',
        '70')];


start.addEventListener('click', function() { 
    alert('Choose your fighter');
    let display = new Display();
    display.hideHeader();
    display.makeCards();
    let game = new Game();
    game.choosePlayer();
});

fight.addEventListener('click', function() {
    let display = new Display();
    display.hideHiddenClass();
    display.doImagesFlex();
    let game = new Game();
    game.hit();
});