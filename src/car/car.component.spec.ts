/* tslint:disable:no-unused-variable max-line-length*/

import { TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CarService } from './car.service';
import { CarComponent } from './car.component';
import {Observable} from 'rxjs/Rx';
/**
 * Mock Data
 */
const carMakesResponse = [{
        make: 'Ford',
        _id: 1
      }, {
        make: 'Acura',
        _id: 2
      }];

const carResponse = {
      make: 'Acura',
      models: [{
        name: 'ILX',
        image: '/public/images/acura-ilx.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lorem ipsum, maximus sed augue eget, volutpat luctus dui. Praesent molestie rhoncus nisl vel egestas. Phasellus luctus faucibus pharetra. Cras vestibulum erat vel mi vehicula ultrices. Aenean rutrum arcu ut ipsum ultrices, ut condimentum est malesuada. Ut lacinia ut nibh sed tempus. Nullam efficitur tempus velit id lobortis.'
      }, {
        name: 'MDX',
        image: '/public/images/acura-mdx.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lorem ipsum, maximus sed augue eget, volutpat luctus dui. Praesent molestie rhoncus nisl vel egestas. Phasellus luctus faucibus pharetra. Cras vestibulum erat vel mi vehicula ultrices. Aenean rutrum arcu ut ipsum ultrices, ut condimentum est malesuada. Ut lacinia ut nibh sed tempus. Nullam efficitur tempus velit id lobortis.'
      }]
    };

const modelObj = JSON.stringify({
  name: 'MDX',
  image: '/public/images/acura-mdx.jpg'
});


// Mock Service
class MockCarService {

  getMakes() {
    return Observable.create(observer => {
      observer.next(carMakesResponse);
      observer.complete();
    });
  }
  getCar(id) {
    return Observable.create(observer => {
      observer.next(carResponse);
      observer.complete();
    });
  }
}

/**
 * Unit Tests
 */
describe('CarComponent', () => {
  beforeEach(() => {
    // Runs Before Each Unit Test .
    TestBed.configureTestingModule({
      imports: [HttpModule, FormsModule],
      declarations: [
        CarComponent
      ],
      providers: [
        { provide: CarService, useClass: MockCarService }
      ],
    });
    TestBed.compileComponents();
  });
  describe('Component Load', () => {
    it('should create the app', async(() => {
      const fixture = TestBed.createComponent(CarComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }));

    it(`should have an empty array 'makes'`, async(() => {
      const fixture = TestBed.createComponent(CarComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.makes).toBeDefined();
      expect(app.model).toBeDefined();
      expect(app.car).not.toBeDefined();
      expect(app.makes).toEqual([]);
      expect(app.model).toEqual('');
    }));

    it(`should have a non empty array 'makes' after ngOnInit`, fakeAsync(() => {
      const fixture = TestBed.createComponent(CarComponent);
      const app = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      app.ngOnInit();
      fixture.detectChanges();
      expect(app.makes).toBeDefined();
      expect(app.model).toBeDefined();
      expect(app.car).not.toBeDefined();
      expect(app.makes).toEqual(carMakesResponse);
      expect(fixture.debugElement.query(By.css('#carMakes option:nth-child(2)')).nativeElement.textContent).toEqual('Ford');
      expect(fixture.debugElement.query(By.css('#carMakes option:nth-child(3)')).nativeElement.textContent).toEqual('Acura');

    }));

    it(`should have a non empty Object 'makes' after selectedMake`, fakeAsync(() => {
      const fixture = TestBed.createComponent(CarComponent);
      // skip getting makes to test only for selected make function
      const app = fixture.debugElement.componentInstance;
      // Send id 1 as default when testing
      fixture.detectChanges();
      app.ngOnInit();
      app.selectedMake(1);
      fixture.detectChanges();
      expect(app.model).toBeDefined();
      expect(app.car).toBeDefined();
      expect(app.car).toEqual(carResponse);
      expect(fixture.debugElement.query(By.css('#carModels option:nth-child(2)')).nativeElement.textContent).toEqual('ILX');
      expect(fixture.debugElement.query(By.css('#carModels option:nth-child(3)')).nativeElement.textContent).toEqual('MDX');
    }));

    it(`should have a non empty Object 'makes' after selectedMake`, fakeAsync(() => {
      const fixture = TestBed.createComponent(CarComponent);
      // skip getting makes to test only for selected make function
      const app = fixture.debugElement.componentInstance;
      // Send id modelObj as default when testing
      fixture.detectChanges();
      app.ngOnInit();
      app.selectedMake(1);
      app.selectecModel(modelObj);
      fixture.detectChanges();
      expect(app.model).toBeDefined();
      expect(app.parsedModel).toBeDefined();
      expect(app.model).toEqual(modelObj);
      expect(app.parsedModel).toEqual(JSON.parse(modelObj));
      expect(fixture.debugElement.query(By.css('#carImage')).nativeElement).toBeDefined();
      expect(fixture.debugElement.query(By.css('#carImage')).nativeElement.src).toContain(JSON.parse(modelObj).image);
    }));
  });
});
