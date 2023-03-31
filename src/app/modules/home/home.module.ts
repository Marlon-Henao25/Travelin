import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { RuteComponent } from './components/rute/rute.component';
import { ResultComponent } from './components/result/result.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RuteComponent,
    FormsModule      
  ]
})
export class HomeModule { }
