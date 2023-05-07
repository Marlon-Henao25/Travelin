import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    HomeComponent,
    ModalComponent,       
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule      
  ]
})
export class HomeModule { }
