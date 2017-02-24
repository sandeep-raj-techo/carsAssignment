import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CarComponent } from './car.component';
import { CarService } from './car.service';

@NgModule({
  declarations: [
    CarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [CarService],
  bootstrap: [CarComponent]
})
export class CarModule { }
