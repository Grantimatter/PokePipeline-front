import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonScreenComponent } from './pokemon-screen.component';

describe('PokemonScreenComponent', () => {
  let component: PokemonScreenComponent;
  let fixture: ComponentFixture<PokemonScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
