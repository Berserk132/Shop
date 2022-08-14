import { HomeService } from '../../../core/services/home.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ColDef,
  CellClickedEvent,
  GridOptions,
  ValueFormatterParams,
} from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { IProduct } from 'src/app/shared/models/Product';
import { Filter } from 'src/app/shared/models/Filter';
import { FilterModalComponent } from 'src/app/shared/components/filter-modal/filter-modal.component';
import { Observable } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import { GridImageComponent } from 'src/app/shared/components/ag-grid-image/grid-image.component';
import * as HomeActions from '../state/home.action';
import { Store } from '@ngrx/store';
import { getToggleAgGrid } from '../state/home.reducer';
import { MainState } from 'src/app/configs/state/state';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products$: Observable<IProduct[]>;
  maxValueFilter: number = 0;
  minValueFilter: number = 0;
  color: ThemePalette = 'accent';
  checked$: Observable<boolean>;
  disabled = false;
  pinnedTopRowData: IProduct[] = [];
  pinnedBottomRowData: IProduct[] = [];

  // AG-grid
  public rowSelection: 'single' | 'multiple' = 'multiple';
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  api: any;
  columnApi: any;

  public columnDefs: ColDef[] = [
    { field: 'Id', type: 'numberColumn' },
    { field: 'Name' },
    { field: 'Description' },
    {
      field: 'Price',
      type: 'numberColumn',
      valueFormatter: this.currencyFormatter,
    },
    { field: 'image', type: 'imageColumn', cellRenderer: GridImageComponent },
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
    imageColumn: { width: 75, filter: null, resizable: false },
  };

  gridOptions: GridOptions = {
    // PROPERTIES
    // Objects like myRowData and myColDefs would be created in your application
    columnDefs: this.columnDefs,
    columnTypes: this.columnTypes,
    defaultColDef: this.defaultColDef,
    rowSelection: 'multiple',
    enableRangeSelection: true,
    copyGroupHeadersToClipboard: true,
    rowDragManaged: true,
    paginationPageSize: 50,

    pagination: true,
    // EVENTS
    // Add event handlers
    onRowClicked: (event) => console.log('A row was clicked'),
    onColumnResized: (event) => console.log('A column was resized'),
    onGridReady: (event) => console.log('The grid is now ready'),
    onPaginationChanged: (event) => this.pinnedRowTopCount(),

    // CALLBACKS
    getRowHeight: (params) => 25,
  };

  constructor(
    private homeService: HomeService,
    public dialog: MatDialog,
    private store: Store<MainState>
  ) {}

  ngOnInit(): void {
    this.products$ = this.homeService.products$;
    this.pinnedRowTopCount();

    // Selectors
    this.checked$ = this.store.select(getToggleAgGrid);
  }

  openDialog(): void {
    let filterParams: Filter = {
      MinValue: this.maxValueFilter,
      MaxValue: this.minValueFilter,
    };
    const dialogRef = this.dialog.open(FilterModalComponent, {
      width: '250px',
      data: filterParams,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.homeService.FilterData(result);
    });
  }

  toggleChecked() {
    this.store.dispatch(HomeActions.ToggleAgGrid());
  }

  onGridReady = (params) => {
    this.api = params.api;
    this.columnApi = params.columnApi;
  };

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
    console.log(model);
    // Sets the filter model via the grid API
    this.agGrid.api.setFilterModel(model);
  }

  pinnedRowTopCount() {
    this.products$.subscribe({
      next: (products) => {
        let start = this.agGrid?.api?.getFirstDisplayedRow();
        this.pinnedTopRowData = products?.slice(start, start + 2);
      },
    });
  }

  getFirstDisplayedRow() {
    console.log(this.agGrid?.api?.getFirstDisplayedRow());
  }

  currencyFormatter(params: ValueFormatterParams) {
    return '$ ' + params.value;
  }

  autoSizeAll(skipHeader: boolean) {
    const allColumnIds: string[] = [];
    this.columnApi.getColumns()!.forEach((column) => {
      allColumnIds.push(column.getId());
    });
    this.columnApi.autoSizeColumns(allColumnIds, skipHeader);
  }

  sizeToFit() {
    this.api.sizeColumnsToFit();
  }

  sizeColumnToFit() {
    this.columnApi.sizeColumnsToFit();
  }

  setAutoHeight() {
    this.api.setDomLayout('autoHeight');
    (document.querySelector<HTMLElement>('#myGrid')! as any).style.height = '';
  }

  setFixedHeight() {
    // we could also call setDomLayout() here as normal is the default
    this.api.setDomLayout('normal');
    (document.querySelector<HTMLElement>('#myGrid')! as any)!.style.height =
      '400px';
  }

  // addFiftyRow() {
  //   for (let i = 0; i < 50; i++) {
  //     this.homeService.addProduct();
  //   }
  // }
}
