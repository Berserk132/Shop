import { HomeService } from '../../../core/services/home.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, CellClickedEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { IProduct } from 'src/app/shared/models/Product';
import { Filter } from 'src/app/shared/models/Filter';
import { FilterModalComponent } from 'src/app/shared/components/filter-modal/filter-modal.component';
import { AuthenticationService } from 'src/app/core/services/authentication.service';


@Component({
  selector: 'app-home-admin',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: IProduct[] = this.homeService.products;
  maxValueFilter: number = 0;
  minValueFilter: number = 0;


  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;


  // Each Column Definition results in one Column.
  // public columnDefs: ColDef[] = [
  //   { field: 'Id', },
  //   {
  //     field: 'Name',
  //     filter: 'agTextColumnFilter',
  //     filterParams: {
  //       textMatcher: ({ filter, value, filterText }) => {
  //         const filterTextLowerCase = filterText.toLowerCase();
  //         const valueLowerCase = value.toString().toLowerCase();
  //         console.log(filter)
  //         console.log(value)
  //         console.log(filterText)
  //         switch (filter) {
  //           case 'contains':
  //             return valueLowerCase.indexOf(filterTextLowerCase) >= 0;
  //           case 'notContains':
  //             return valueLowerCase.indexOf(filterTextLowerCase) === -1;
  //           case 'equals':
  //             return valueLowerCase === filterTextLowerCase;
  //           case 'notEqual':
  //             return valueLowerCase != filterTextLowerCase;
  //           case 'startsWith':
  //             return valueLowerCase.indexOf(filterTextLowerCase) === 0;
  //           case 'endsWith':
  //             var index = valueLowerCase.lastIndexOf(filterTextLowerCase);
  //             return index >= 0 && index === (valueLowerCase.length - filterTextLowerCase.length);
  //           default:
  //             // should never happen
  //             console.warn('invalid filter type ' + filter);
  //             return false;
  //         }
  //       }
  //     }
  //   },
  //   { field: 'Description' },
  //   { field: 'Price' },
  //   { field: 'Image' },

  // ]

  public columnDefs: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' }
  ];

  public rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 }
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  constructor(private accountService: AuthenticationService, private homeService: HomeService, public dialog: MatDialog) { }

  ngOnInit(): void {

    console.log(this.accountService.currentUser)
    console.log(this.products)
  }

  openDialog(): void {
    let filterParams: Filter = { MinValue: this.maxValueFilter, MaxValue: this.minValueFilter }
    const dialogRef = this.dialog.open(FilterModalComponent, {
      width: '250px',
      data: filterParams,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.products = this.homeService.FilterData(this.products, result)
    });
  }

  // Example load data from sever


  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

}
