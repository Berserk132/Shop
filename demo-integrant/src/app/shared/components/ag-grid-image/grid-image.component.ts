import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

@Component({
    selector: 'grid-image-component',
    templateUrl: './grid-image.component.html',
    styleUrls: ['./grid-image.component.scss']
})
export class GridImageComponent implements ICellRendererAngularComp {
    public cellValue: string;
    
    // gets called once before the renderer is used
    agInit(params: ICellRendererParams): void {
        // this.cellValue = this.getValueToDisplay(params);
        this.cellValue = this.getValueToDisplay(params);
        console.log(params.value)
    }


    // gets called whenever the cell refreshes
    refresh(params: ICellRendererParams): boolean {
        // set value into cell again
        this.cellValue = this.getValueToDisplay(params);
        return true;
    }

    // buttonClicked() {
    //     alert(`${ this.cellValue } medals won!`)
    // }

    getValueToDisplay(params: ICellRendererParams) {
        return params.value
    }
}