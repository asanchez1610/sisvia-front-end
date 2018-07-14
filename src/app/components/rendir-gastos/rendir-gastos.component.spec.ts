import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RendirGastosComponent } from './rendir-gastos.component';

describe('RendirGastosComponent', () => {
  let component: RendirGastosComponent;
  let fixture: ComponentFixture<RendirGastosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RendirGastosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RendirGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
