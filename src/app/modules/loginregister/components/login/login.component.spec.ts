import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be falsy', () => {
    expect(component.trainerModel.description).toBeFalsy();
  });

  it('should be falsy', () => {
    expect(component.trainerModel.password).toBeFalsy();
  });

  it('should be falsy', () => {
    expect(component.trainerModel.trainerName).toBeFalsy();
  });
  it('should be falsy', () => {
    expect(component.trainerModel.email).toBeFalsy();
  });
});
