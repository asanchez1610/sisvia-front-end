import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarViaticoFormComponent } from './asignar-viatico-form.component';

describe('AsignarViaticoFormComponent', () => {
  let component: AsignarViaticoFormComponent;
  let fixture: ComponentFixture<AsignarViaticoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarViaticoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarViaticoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
