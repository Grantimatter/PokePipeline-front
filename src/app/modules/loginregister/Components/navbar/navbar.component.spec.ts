import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogRegNavbar } from './navbar.component';

describe('NavbarComponent', () => {
  let component: LogRegNavbar;
  let fixture: ComponentFixture<LogRegNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogRegNavbar],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogRegNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
