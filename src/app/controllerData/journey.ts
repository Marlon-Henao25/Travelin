import { Flight } from "./flight";

export class Journey extends Flight{    
    flights: Flight[] = [];

    constructor(origin: string, destination: string, price?: number){            
            super(origin, destination, price);            
    }

    public addFlight(flights: Flight){        
        this.flights.push(flights);
    }

    public UpdatePrice(CurrentPrice : number){
        this.price = CurrentPrice;
    }

}