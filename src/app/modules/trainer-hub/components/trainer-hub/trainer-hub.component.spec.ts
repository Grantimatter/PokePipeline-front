import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerHubComponent } from './trainer-hub.component';

describe('TrainerHubComponent', () => {
  let component: TrainerHubComponent;
  let fixture: ComponentFixture<TrainerHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
