import { NgModule } from "@angular/core";
import { BasketModule } from "./basket/basket.module";
import { HomeModule } from "./home/home.module";

@NgModule({
    

    imports: [
        HomeModule,
        BasketModule
    ],
    exports: [
        HomeModule,
        BasketModule
    ]
})
export class ModulesModule { }