import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyGridHeaderComponent } from './currency-grid-header.component';

describe('CurrencyGridHeaderComponent', () => {
  let component: CurrencyGridHeaderComponent;
  let fixture: ComponentFixture<CurrencyGridHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyGridHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyGridHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
