import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecupracaoComponent } from './recupracao.component';

describe('RecupracaoComponent', () => {
  let component: RecupracaoComponent;
  let fixture: ComponentFixture<RecupracaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecupracaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecupracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
