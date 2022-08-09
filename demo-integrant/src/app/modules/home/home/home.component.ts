import { HomeService } from '../../../core/services/home.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, CellClickedEvent, GridOptions } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { IProduct } from 'src/app/shared/models/Product';
import { Filter } from 'src/app/shared/models/Filter';
import { FilterModalComponent } from 'src/app/shared/components/filter-modal/filter-modal.component';
import { Observable } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import { GridImageComponent } from 'src/app/shared/components/ag-grid-image/grid-image.component';


@Component({
  selector: 'app-home-admin',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products$: Observable<IProduct[]>
  maxValueFilter: number = 0;
  minValueFilter: number = 0;
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;


  // AG-grid
  public rowSelection: 'single' | 'multiple' = 'multiple';
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  api: any;
  columnApi: any;


  public columnDefs: ColDef[] = [
    { field: 'Id', type: 'numberColumn' },
    { field: 'Name' },
    { field: 'Description' },
    { field: 'Price', type: 'numberColumn' },
    { field: 'image', type: 'imageColumn', cellRenderer: GridImageComponent }
  ];


  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    // set the default column width
    width: 150,
    // make every column editable
    editable: true,
    // make every column use 'text' filter by default
    filter: 'agTextColumnFilter',
    // enable floating filters by default
    floatingFilter: true,
    // make columns resizable
    resizable: true,
  };


  public columnTypes: {
    [key: string]: ColDef;
  } = {
    numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
    imageColumn: { width: 75, filter: null, resizable: false},

  };

  gridOptions : GridOptions = {
    // PROPERTIES
    // Objects like myRowData and myColDefs would be created in your application
    columnDefs: this.columnDefs,
    columnTypes: this.columnTypes,
    defaultColDef: this.defaultColDef,
    rowSelection: 'multiple',
    enableRangeSelection: true,
    copyGroupHeadersToClipboard: true,
    rowDragManaged: true,
    paginationPageSize: 12,
    
    pagination: true,
    // EVENTS
    // Add event handlers
    onRowClicked: event => console.log('A row was clicked'),
    onColumnResized: event => console.log('A column was resized'),
    onGridReady: event => console.log('The grid is now ready'),

    // CALLBACKS
    getRowHeight: (params) => 25
}


  constructor(private homeService: HomeService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.products$ = this.homeService.products$
  }

  openDialog(): void {
    let filterParams: Filter = { MinValue: this.maxValueFilter, MaxValue: this.minValueFilter }
    const dialogRef = this.dialog.open(FilterModalComponent, {
      width: '250px',
      data: filterParams,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.homeService.FilterData(result)
    });
  }

  onGridReady = (params) => {
    this.api = params.api;
    this.columnApi = params.columnApi;
}


  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  getFilterStatus() {
    const model = this.agGrid.api.getFilterModel(); 
    console.log(model)
    // Sets the filter model via the grid API
    this.agGrid.api.setFilterModel(model);
  }
}
