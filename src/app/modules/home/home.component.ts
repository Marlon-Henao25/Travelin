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
  originSelected: string = "";
  destinationSelected: string = ""; 
  escales: number = 0; 
  ruteObtained: any[] = [];
  datalist: any[] = [];  
  
  //CONSTRUCTOR
  constructor(private apiService : ApiService){
    console.log('El Servicio Se Ha Creado');
  }

  //INIT CYCLE (LIFEHOOKS)
  ngOnInit(): void{
    console.log('El Componente Se Ha Inicializado');
    this.ruteSelected();
    this.getData();       
  }

  //FUNCIÓN DEL SERVICIO APISERVICE QUE PERMITE CONSUMIR LA API PROPUESTA
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

  //FILTRADO PARA NO TRAER ORIGENES REPETIDOS EN LOS SELECT
  public noRepeatOrigin(Data : any){    
    for(let x of Data){
      if(this.originAvailable.includes(x.departureStation)==false){        
        this.originAvailable.push(x.departureStation);
      }
    }
  }

  //FILTRADO PARA NO TRAER DESTINOS REPETIDOS EN LOS SELECT
  public noRepeatDestination(Data : any){
    for(let x of Data){
      if(this.destinationAvailable.includes(x.arrivalStation)==false){        
        this.destinationAvailable.push(x.arrivalStation);
      }
    }
  }

  //BOTON QUE ATIENDE UN ELEMENTO DE HTML "BUSCAR RUTA"
  public findRute(event : Event, origin: string, destination: string){
    event.preventDefault();    
    this.ruteResult(origin, destination);     
  }

  //LOGICA PARA CALCULAR SI LA RUTA EXISTE Y ESTÁ DISPONIBLE
  public ruteResult(originSelected: string, destinationSelected: string){                    
    
    this.ruteObtained.pop();

    //CALCULAR RUTAS CON VUELOS MULTIPLES    
    const queue: { origen: string; flights: any[]; TotalPrice: number; escales: number }[] = [];

    // Agregar el primer vuelo a la cola
    this.datalist.forEach((flight) => {
      if (flight.departureStation === originSelected) {
        queue.push({
          origen: flight.arrivalStation,
          flights: [flight],
          TotalPrice: flight.price,
          escales: 0,
        });
      }
    });

    // Recorrer la cola
    while (queue.length > 0) {
      const { origen, flights, TotalPrice, escales } = queue.shift()!;

      // Si hemos llegado a nuestro destino, agregamos la ruta a la lista de rutas
      if (origen === destinationSelected) {
        let journey = new Journey(originSelected, destinationSelected);        
        flights.forEach(flights => {
          journey.addFlight(flights);
          journey.UpdatePrice(TotalPrice);          
        });        
        this.ruteObtained.push(journey);        
                   
      }//Condición que verifica el número de escalas que tiene el vuelo
      else if(escales < this.escales-1){       
        this.datalist.forEach((flight) => {
          if (flight.departureStation === origen) {
            queue.push({
              origen: flight.arrivalStation,
              flights: [...flights, flight],
              TotalPrice: TotalPrice + flight.price,
              escales: escales + 1,
            });
          }
        });
      }

    }

    //Condicional que valida si hay más de 1 posible ruta y escoge la ruta más corta
    if(this.ruteObtained.length>1){      
      let maxArray = this.ruteObtained[0].flights;      
      for (let i = 1; i < this.ruteObtained.length; i++) {                
        if (this.ruteObtained[i].flights.length < maxArray.length) {
            maxArray = this.ruteObtained[i];
        } else {
            maxArray = this.ruteObtained[0];
        }
      }      
      this.ruteObtained = []      
      this.ruteObtained.push(maxArray);      
    }
    
    /*Condición que verifica si se encontró la ruta, en caso que no se haya encontrado,
      se le informa al usuario mediante una alerta*/
    if(this.ruteObtained.length === 0){
      this.ruteObtained = [];
      alert("NO SE HA ENCONTRADO RUTA, INTENTA LA BUSQUEDA CON UN NÚMERO DE VUELOS MAYOR");
    } else if(this.originSelected == this.destinationSelected){
        this.ruteObtained = [];
        alert("NO SE PUEDE TENER ORIGEN Y DESTINO IGUALES");

    }
  }   

  //seleccionar y asignar valores de los select
  public ruteSelected(){
    this.originSelected = this.originSelected;    
    this.destinationSelected = this.destinationSelected;
    this.escales = this.escales;    
  }  

  public currencyFormat(price: number, currency: string){
      const currencyFormat = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    });
    return currencyFormat.format(price);
  }
}
