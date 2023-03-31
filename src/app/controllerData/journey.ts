import { Flight } from "./flight";

export class Journey extends Flight{
    flights: Flight[] = [];

    constructor(origin: any, destination: any, price: any){            
            super(origin, destination, price);                   
    }

    addFlight(flight : Flight){
        this.flights.push(flight);
    }

}