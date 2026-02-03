class Car {
    model: string;
    brand: string;
    doors: number;
    features: string[];

    constructor(model : string, brand : string, doors : number, features : string[]) {
        this.model = model;
        this.brand = brand;
        this.doors = doors;
        this.features = features;
    }

    startEngine() {
        console.log(`Arranca el motor del ${this.model}`)
    }
}

const audi = new Car("A4", "Audi", 4, ["2025", "AT"])

console.log(audi)