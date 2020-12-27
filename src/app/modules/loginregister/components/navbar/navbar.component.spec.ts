import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogRegNavbar } from './navbar.component';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

describe('NavbarComponent', () => {
  let component: LogRegNavbar;
  let fixture: ComponentFixture<LogRegNavbar>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogRegNavbar],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { url: ['login'] },
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { url: ['register'] },
          },
        },
      ],
      imports: [
        RouterModule,
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: LoginComponent,
          },
          {
            path: 'login',
            component: LoginComponent,
            data: { adjacentRoute: 'register' },
          },
          {
            path: 'register',
            component: RegisterComponent,
            data: { adjacentRoute: 'login' },
          },
        ]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(LogRegNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
