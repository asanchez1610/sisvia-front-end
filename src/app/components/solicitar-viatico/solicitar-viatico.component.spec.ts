import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarViaticoComponent } from './solicitar-viatico.component';

describe('SolicitarViaticoComponent', () => {
  let component: SolicitarViaticoComponent;
  let fixture: ComponentFixture<SolicitarViaticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitarViaticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarViaticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
