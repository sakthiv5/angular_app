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
    { field: 'id' },
    { field: 'address' }
];

rowData : any;
tokenDetails : any;

formdata = new FormData();

  ngOnInit(): void {
    this.loadAddress("64223740205");
  }

loadAddress(phoneNumber) {
  return this.addressservice.getAddress(phoneNumber).subscribe((data: any) => {
    this.rowData = data;
    console.log(this.rowData);
  })
}


}