import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyGridHeaderComponent } from './currency-grid-header.component';
import { SpanWithTooltip } from 'src/app/global/span-with-tooltip/span-with-tooltip.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceMock } from 'src/test-mocks/angular/translate-service.mock';

describe('CurrencyGridHeaderComponent', () => {
  let component: CurrencyGridHeaderComponent;
  let fixture: ComponentFixture<CurrencyGridHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CurrencyGridHeaderComponent,
        SpanWithTooltip
      ],
      imports: [
        TooltipModule
      ],
      providers: [{
        provide: TranslateService, useClass: TranslateServiceMock
      }]
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

  describe(' - Testing functions', function () {
    describe(' - Testing onLangChange', function () {
      it(' - Function will not throw', function () {
        expect(function () {
          component['onLangChange']();
        }).not.toThrow();
      });
    });
  });
});
