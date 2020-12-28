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
    expect(component.userModel.description).toBeFalsy();
  });

  it('should be falsy', () => {
    expect(component.userModel.password).toBeFalsy();
  });

  it('should be falsy', () => {
    expect(component.userModel.username).toBeFalsy();
  });
  it('should be falsy', () => {
    expect(component.userModel.email).toBeFalsy();
  });
});
