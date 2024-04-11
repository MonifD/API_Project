import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarCoComponent } from './nav-bar-co.component';

describe('NavBarCoComponent', () => {
  let component: NavBarCoComponent;
  let fixture: ComponentFixture<NavBarCoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarCoComponent]
    });
    fixture = TestBed.createComponent(NavBarCoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
