import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TableService } from '../table.service';
import { Tables } from '../mock-tables';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let tableService;
  let getTablesSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    tableService = jasmine.createSpyObj('TableService', ['getTables']);
    getTablesSpy = tableService.getTables.and.returnValue(of(Tables));
    TestBed
        .configureTestingModule({
          declarations: [DashboardComponent],
          imports: [RouterTestingModule.withRoutes([])],
          providers: [{provide: TableService, useValue: tableService}]
        })
        .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Tables" as headline', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toEqual('Tables');
  });

  it('should call tableService', waitForAsync(() => {
       expect(getTablesSpy.calls.any()).toBe(true);
     }));

  it('should display 4 links', waitForAsync(() => {
       expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
     }));
});
