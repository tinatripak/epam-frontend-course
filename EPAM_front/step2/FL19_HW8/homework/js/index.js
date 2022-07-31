class Toy {
    constructor(name, price) {
        if (this.constructor === Toy) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.name = name;
        this.price = price;
    }
  
    getToyInfo() {
      return `The toy name is ${this.name}. It costs ${this.price} dollars.`;
    }
}

class TeddyToys extends Toy{
    constructor(name, price){
        super(name, price);
        this.material = 'cotton';
    }

    getMaterialInfo(){
        return `The toy ${this.name} was made of ${this.material}`
    }
}

class WoodenToys extends Toy{
    constructor(name, price){
        if (typeof WoodenToys.instance === 'object') { 
            return WoodenToys.instance 
        } 
        super(name, price);
        this.material = 'wood';
        WoodenToys.instance = this; 
        return this 
    }


    getMaterialInfo(){
        return `The toy ${this.name} was made of ${this.material}`;
    }
}

class PlasticToys extends Toy{
    constructor(name, price){
        super(name, price);
        this.material = 'plastic';
    }

    getMaterialInfo(){
        return `The toy ${this.name} was made of ${this.material}`
    }
}

class ToyFactory{
    constructor() {
        this.toys = [];
    }

    createAndGetToy(name, price, type) {
        let newToy;

        switch (type) {
            case 'cotton': 
                newToy = new TeddyToys(name, price);
                break;
            case 'wood':
                newToy = new WoodenToys(name, price);
                break;
            case 'plastic': 
                newToy = new PlasticToys(name, price);
                break;
            default:
                newToy = new PlasticToys(name, price);
                break;
        }

        if(!this.toys.includes(newToy)) {
            this.toys.push(newToy);
        }
    
        return newToy;
    }

    produce(name, price, type = 'plastic') {
        const toy = this.getToy(name)
        if (toy) {
          return toy;
        }
        return this.createAndGetToy(name, price, type)
    }

    getToy(name) {
        return this.toys.find(toy => toy.name === name);
    }
}

const factory = new ToyFactory();
const priceOneHundred = 100;
const priceTwoHundred = 200;
const priceOneAndHalfHundred = 150;
const priceFourHundred = 400;


const teddyBear = factory.produce('Bear', priceTwoHundred, 'cotton');
console.log(teddyBear.getToyInfo());
console.log(teddyBear.getMaterialInfo());

const plasticCar = factory.produce('Car', priceOneHundred);
console.log(plasticCar.getToyInfo());
console.log(plasticCar.getMaterialInfo());

const cottonFox = factory.produce('Fox', priceTwoHundred, 'cotton');
console.log(cottonFox.getToyInfo());
console.log(cottonFox.getMaterialInfo());

const plasticFox = factory.produce('Fox', priceOneAndHalfHundred, 'plastic');
console.log(plasticFox.getToyInfo());
console.log(plasticFox.getMaterialInfo());

const woodenBear = factory.produce('Rabbit', priceOneAndHalfHundred, 'wood');
console.log(woodenBear.getToyInfo());

const woodenHorse = factory.produce('Horse', priceFourHundred, 'wood');
console.log(woodenHorse.getToyInfo());

class Car{
    constructor(name, host) {
        this.name = name;
        this.host = host;
    }
    carSound(){
        return 'Usual car sound.';
    }
}

class AmbulanceCar extends Car{
    constructor(car){
        super(car.name, car.price);
    }
    ambulanceSound(){
        return 'Siren sound.';
    }
}
// function ambulanceCar(car){
//     car.ambulanceSound = function(){
//         return 'Siren sound.';
//     }
//     //return car.carSound();
// }

const mercedes = new Car('Mercedes', 'Doctor');
const ambulanceMercedes = new AmbulanceCar(mercedes);
console.log(ambulanceMercedes.ambulanceSound());
