import { TestBed } from '@angular/core/testing';

import { RegisterService } from './register.service';
import { HttpClientModule } from '@angular/common/http';

describe('RegisterService', () => {
  let service: RegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(RegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
