import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPetComponent } from './criar-pet.component';

describe('CriarPetComponent', () => {
  let component: CriarPetComponent;
  let fixture: ComponentFixture<CriarPetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarPetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
