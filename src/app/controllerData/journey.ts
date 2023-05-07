import { Flight } from "./flight";

export class Journey extends Flight{
    static addFlight(flights: any) {
      throw new Error('Method not implemented.');
    }
    static UpdatePrice(precioTotal: number) {
      throw new Error('Method not implemented.');
    }
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