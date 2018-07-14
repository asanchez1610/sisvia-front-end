import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarViaticoComponent } from './asignar-viatico.component';

describe('AsignarViaticoComponent', () => {
  let component: AsignarViaticoComponent;
  let fixture: ComponentFixture<AsignarViaticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarViaticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarViaticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
