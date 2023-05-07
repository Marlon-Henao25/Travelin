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
  originSelected!: string;
  destinationSelected!: string; 
  ruteObtained: any[] = [];
  datalist: any[] = [];  
  
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

  //BOTON BUSCAR RUTA
  public findRute(event : Event){
    event.preventDefault();    
    this.ruteResult(this.originSelected, this.destinationSelected); 
    console.log(this.ruteObtained);
  }

  //LOGICA PARA CALCULAR SI LA RUTA EXISTE Y ESTÁ DISPONIBLE
  public ruteResult(originSelected: string, destinationSelected: string){                

    this.ruteObtained.pop();
   
    //CALCULAR RUTAS CON VUELOS MULTIPLES    
    const cola: { origen: string; vuelos: any[]; precioTotal: number; escalas: number }[] = [];

    // Agregar el primer vuelo a la cola
    this.datalist.forEach((vuelo) => {
      if (vuelo.departureStation === originSelected) {
        cola.push({
          origen: vuelo.arrivalStation,
          vuelos: [vuelo],
          precioTotal: vuelo.price,
          escalas: 0,
        });
      }
    });

    // Recorrer la cola
    while (cola.length > 0) {
      const { origen, vuelos, precioTotal, escalas } = cola.shift()!;

      // Si hemos llegado a nuestro destino, agregamos la ruta a la lista de rutas
      if (origen === destinationSelected) {
        let journey = new Journey(originSelected, destinationSelected);        
        vuelos.forEach(flights => {
          journey.addFlight(flights);
          journey.UpdatePrice(precioTotal);          
        });        
        this.ruteObtained.push(journey);        
                   
      }//Condición que verifica el número de escalas que tiene el vuelo
      else if(escalas < 2){        
        this.datalist.forEach((vuelo) => {
          if (vuelo.departureStation === origen) {
            cola.push({
              origen: vuelo.arrivalStation,
              vuelos: [...vuelos, vuelo],
              precioTotal: precioTotal + vuelo.price,
              escalas: escalas + 1,
            });
          }
        });
      }

    }

    //Condicional que valida si hay más de 1 posible ruta y escoge la ruta más corta
    if(this.ruteObtained.length>1){      
      let maxArray = this.ruteObtained[0];
      for (let i = 1; i < this.ruteObtained.length; i++) {
        if (this.ruteObtained[i].length > maxArray.length) {
          maxArray = this.ruteObtained[i];
        }
      }
      this.ruteObtained.pop();
      this.ruteObtained.push(maxArray);
    }

    

    

        

    /*Condición que verifica si se encontró la ruta, en caso que no se haya encontrado,
      se le informa al usuario mediante una alerta*/
    if(this.ruteObtained.length === 0){
      alert("NO SE HA ENCONTRADO RUTA");
    }  

  }   

  //seleccionar y asignar valores de los select
  public ruteSelected(){
    this.originSelected = this.originSelected;    
    this.destinationSelected = this.destinationSelected;    
  }  

  public formatoMoneda(price: number, currency: string){
      const formatoMoneda = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    });
    return formatoMoneda.format(price);
  }
}
