import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleInterfaceComponent } from './battle-interface.component';

describe('BattleInterfaceComponent', () => {
  let component: BattleInterfaceComponent;
  let fixture: ComponentFixture<BattleInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattleInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
