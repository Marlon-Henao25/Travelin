import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input()
  rute: any;

  constructor() { }

  ngOnInit(): void {    
  }

  public currencyFormat(price: number, currency: string){
    const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  });
  return currencyFormat.format(price);
}

}
