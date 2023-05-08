import { Transport } from "./transport";

export class Flight {

    public transport?: Transport;
    public origin: string;
    public destination: string;
    public price?: number;

    constructor(origin: string, destination: string, price?: number, transport?: Transport){
        this.origin = origin;
        this.destination = destination;
        this.price = price;
        this.transport = transport;
    }
    
}