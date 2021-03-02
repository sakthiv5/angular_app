import { Component, OnInit } from '@angular/core';
import { fromEventPattern } from 'rxjs';
import { AgGridComponent } from '../common/ag-grid/ag-grid.component';

@Component({
  selector: 'app-train-bot',
  templateUrl: './train-bot.component.html',
  styleUrls: ['./train-bot.component.css']
})
export class TrainBotComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
