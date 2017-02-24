import { Component } from '@angular/core';
import { CarService } from './car.service';

@Component({
  selector: 'car-root',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
  constructor(private carService: CarService) {}

  makes: any = [];
  model: any = '';
  car: any;
  parsedModel: any;

  ngOnInit() {
    this.carService.getMakes().subscribe((carMakes) => {
     this.makes = carMakes;
    });
  }

  resetModel(){
      this.model = '';
      this.parsedModel = undefined;
  }

  // When Make Dropdown is selected
  selectedMake(id) {
    this.carService.getCar(id).subscribe((car) => {
      this.car = car;
      this.resetModel();
    });
  }
  //when model dropdown is selected
  selectecModel(model) {
    this.model = model;
    this.parsedModel = JSON.parse(model);
  }
}
