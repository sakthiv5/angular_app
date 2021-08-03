import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../src/address-service.service';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.css']
})
export class AgGridComponent implements OnInit {
  constructor(
    public addressservice:AddressService
    ) { }

  columnDefs = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price'}
];

rowData : any;

  ngOnInit(): void {
    this.loadEmployees();
  }

loadEmployees() {
  return this.addressservice.getEmployees().subscribe((data: {}) => {
    this.rowData = data;
  })
}
}