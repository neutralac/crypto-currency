import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyRowComponent } from './currency-row.component';
import { SpanWithTooltip } from 'src/app/global/span-with-tooltip/span-with-tooltip.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { CurrencyInputComponent } from '../currency-input/currency-input.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from 'src/test.util';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterMock } from 'src/test-mocks/angular/router.mock';
import { HttpClientMock } from 'src/test-mocks/angular/http-client.mock';

describe('CurrencyRowComponent', () => {
  let component: CurrencyRowComponent;
  let fixture: ComponentFixture<CurrencyRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CurrencyRowComponent,
        SpanWithTooltip,
        CurrencyInputComponent
      ],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
          }
        }),
        TooltipModule,
        FormsModule
      ],
      providers: [{
        provide: Router, useClass: RouterMock
      }, {
        provide: HttpClient, useClass: HttpClientMock
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyRowComponent);
    component = fixture.componentInstance;
    component.data = {
      percent_change_24h: 12
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(' - Testing functions', function () {
    describe(' - Testing ngOnInit', function () {
      describe(' - Testing when percent_change_24h  is less than 0', function () {
        beforeEach(function () {
          component.data = {
            percent_change_24h: -24
          };
        });

        it(' - Function will not throw', function () {
          expect(function () {
            component.ngOnInit();
          }).not.toThrow();
        });
      });

      describe(' - Testing when percent_change_24h  is  0', function () {
        beforeEach(function () {
          component.data = {
            percent_change_24h: 0
          };
        });

        it(' - Function will not throw', function () {
          expect(function () {
            component.ngOnInit();
          }).not.toThrow();
        });
      });

      describe(' - Testing when percent_change_24h  is greater than 0', function () {
        beforeEach(function () {
          component.data = {
            percent_change_24h: 24
          };
        });

        it(' - Function will not throw', function () {
          expect(function () {
            component.ngOnInit();
          }).not.toThrow();
        });
      });
    });

    describe(' - Testing displayCurrencyDetailsPage', function () {
      it(' - Function will not throw', function () {
        expect(function () {
          component.displayCurrencyDetailsPage();
        }).not.toThrow();
      });
    });

    describe(' - Testing onAmmountOwnedChanged', function () {
      it(' - Function will not throw', function () {
        expect(function () {
          component.onAmmountOwnedChanged();
        }).not.toThrow();
      });
    });
  });
});
