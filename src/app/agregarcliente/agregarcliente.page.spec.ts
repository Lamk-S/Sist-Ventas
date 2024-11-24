import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarclientePage } from './agregarcliente.page';

describe('AgregarclientePage', () => {
  let component: AgregarclientePage;
  let fixture: ComponentFixture<AgregarclientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarclientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
