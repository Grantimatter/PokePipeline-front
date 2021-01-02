import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultpathresolverComponent } from './defaultpathresolver.component';

describe('DefaultpathresolverComponent', () => {
  let component: DefaultpathresolverComponent;
  let fixture: ComponentFixture<DefaultpathresolverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultpathresolverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultpathresolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
