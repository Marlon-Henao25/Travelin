import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';

@Component({
  standalone: true,
  selector: 'app-rute',
  imports: [MatSelectModule, MatGridListModule],
  templateUrl: './rute.component.html',
  styleUrls: ['./rute.component.css']
})
export class RuteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
