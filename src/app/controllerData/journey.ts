import { Flight } from "./flight";
import { Transport } from "./transport";

export class Journey extends Flight{
    flights: Flight[] = [];

    constructor(origin: string, destination: string, price?: number){            
            super(origin, destination, price);                   
    }

    public addFlight(flights: any){        
        this.flights.push(flights);
    }

    public UpdatePrice(CurrentPrice : number){
        this.price = CurrentPrice;
    }

}