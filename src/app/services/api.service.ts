import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
    console.log('Servicio HTTP:');
   }
  
  getData(){
    return this.http.get("https://recruiting-api.newshore.es/api/flights/1");
  }

}
