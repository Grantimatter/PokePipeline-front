import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionScreenComponent } from './option-screen.component';

describe('OptionScreenComponent', () => {
  let component: OptionScreenComponent;
  let fixture: ComponentFixture<OptionScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
