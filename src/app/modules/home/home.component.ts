import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/controllerData/flight';
import { Journey } from 'src/app/controllerData/journey';
import { Transport } from 'src/app/controllerData/transport';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  //PROPERTIES
  originAvailable: string[] = [];
  destinationAvailable: string[] = [];
  repeat: string | undefined;
  originSelected: string | undefined;
  destinationSelected: string | undefined; 
  ruteObtained: any[] = [];
  datalist: any[] = [];
  priceCOP: number | undefined;
  priceEUR: number | undefined;
  
  //CONSTRUCTOR
  constructor(private apiService : ApiService){
    console.log('El Componente Se Ha Creado');
  }

  //INIT CYCLE (LIFEHOOKS)
  ngOnInit(): void{
    console.log('El Componente Se Ha Inicializado');
    this.ruteSelected();
    this.getData();       
  }

  public getData(){ 
    this.apiService.getData()
    .subscribe((Data : any) => {
      for(let x of Data){
        this.datalist.push(x);
      }
      
      this.noRepeatOrigin(Data);
      this.noRepeatDestination(Data);          
    }
    ); 
  }

  public noRepeatOrigin(Data : any){    
    for(let x of Data){
      if(x.departureStation != this.repeat){
        this.repeat = x.departureStation;
        this.originAvailable.push(x.departureStation);
      }
    }
  }

  public noRepeatDestination(Data : any){
    for(let x of Data){
      if(x.arrivalStation != this.repeat){
        this.repeat = x.arrivalStation;
        this.destinationAvailable.push(x.arrivalStation);
      }
    }
  }

  public findRute(event : Event){
    event.preventDefault();    
    this.ruteResult(this.datalist);
  }

  public ruteResult(datalist : any){            
    let count = false;
    this.ruteObtained.pop(); 
    for(let x of datalist){               
      if(this.originSelected === x.departureStation && this.destinationSelected === x.arrivalStation){      
        let transport = new Transport(x.flightCarrier, x.flightNumber);
        let flight = new Flight(x.departureStation, x.arrivalStation, x.price, transport);
        let journey = new Journey(this.originSelected, this.destinationSelected, x.price);
        journey.addFlight(flight)
        this.ruteObtained.push(journey);
        count = true;        
      }      
    }
    if(count === false){
      alert("NO SE HA ENCONTRADO RUTA");
    }    
  }

  public ruteSelected(){
    this.originSelected = this.originSelected;    
    this.destinationSelected = this.destinationSelected;    
  }

  public COP(event : Event){    
    event.preventDefault(); 
    for(let i of this.ruteObtained){
      this.priceCOP = Math.floor(i.price * 4645);
    }
  }

  public EUR(event : Event){    
    event.preventDefault(); 
    for(let i of this.ruteObtained){
      this.priceEUR = Math.floor(i.price * 0.92);
    }
  }

}
