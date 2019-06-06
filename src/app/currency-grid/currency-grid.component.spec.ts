import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyGridComponent } from './currency-grid.component';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateServiceMock } from 'src/test-mocks/angular/translate-service.mock';
import { SpanWithTooltip } from '../global/span-with-tooltip/span-with-tooltip.component';
import { CurrencyGridHeaderComponent } from './currency-grid-header/currency-grid-header.component';
import { CurrencyRowComponent } from './currency-row/currency-row.component';
import { PaginationBar } from '../global/pagination-bar/pagination-bar.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { CurrencyInputComponent } from './currency-input/currency-input.component';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from 'src/test.util';
import { FormsModule } from '@angular/forms';
import { LoadingMaskService } from '../services/loading-mask/loading-mask.service';
import { LoadingMaskServiceMock } from 'src/test-mocks/services/loading-mask-service.mock';
import { Router } from '@angular/router';
import { RouterMock } from 'src/test-mocks/angular/router.mock';
import { CryptoCurrencyApiService } from '../services/crypto-currency-api/crypto-currency-api.service';
import { CryptoCurrencyApiServiceMock } from 'src/test-mocks/services/crypto-currency-api-service.mock';

describe('CurrencyGridComponent', () => {
  let component: CurrencyGridComponent;
  let fixture: ComponentFixture<CurrencyGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CurrencyGridComponent,
        SpanWithTooltip,
        CurrencyGridHeaderComponent,
        CurrencyRowComponent,
        PaginationBar,
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
        provide: TranslateService, useClass: TranslateServiceMock
      }, {
        provide: LoadingMaskService, useClass: LoadingMaskServiceMock
      }, {
        provide: Router, useClass: RouterMock
      }, {
        provide: CryptoCurrencyApiService, useClass: CryptoCurrencyApiServiceMock
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(' - Testing functions', function () {
    describe(' - Testing ngOnInit', function () {
      beforeEach(function () {
        spyOn<any>(component, 'getData');
      });

      it(' - Function will not throw', function () {
        expect(function () {
          component.ngOnInit();
        }).not.toThrow();
      });
    });

    describe(' - Testing calculateGainLossValue', function () {
      let priceData = {};
      beforeEach(function () {
        spyOn<any>(component, 'calculateItemGainLossValue').and.callFake(function () {
          return 0;
        });
        component.paginationData = {
          allItems: [{}]
        };
      });
      it(' - Function will not throw', function () {
        expect(function () {
          component['calculateGainLossValue'](priceData);
        }).not.toThrow();
      });
    });

    describe(' - Testing calculateItemGainLossValue', function () {
      let currency = {};
      let priceData = {};
      describe(' - Testing when user currency count exists', function () {
        beforeEach(function () {
          spyOn(localStorage, 'getItem').and.callFake(function () {
            return '12';
          });
        });

        it(' - Function will not throw', function () {
          expect(function () {
            component['calculateItemGainLossValue'](currency, priceData);
          }).not.toThrow();
        });
      });

      describe(' - Testing when user currency count does not exist', function () {
        beforeEach(function () {
          spyOn(localStorage, 'getItem').and.callFake(function () {
            return '';
          });
        });

        it(' - Function will not throw', function () {
          expect(function () {
            component['calculateItemGainLossValue'](currency, priceData);
          }).not.toThrow();
        });
      });
    });

    describe(' - Testing getData', function () {
      describe(' - Testing when router url is /', function () {
        beforeEach(function () {
          (component['router'] as any).url = '/';
          spyOn(component, 'updateData');
        });

        it(' - Function will not throw', function () {
          expect(function () {
            component['getData']();
          }).not.toThrow();
        });
      });

      describe(' - Testing when router url is not /', function () {
        beforeEach(function () {
          (component['router'] as any).url = '/details';
        });

        it(' - Function will not throw', function () {
          expect(function () {
            component['getData']();
          }).not.toThrow();
        });
      });
    });

    describe(' - Testing onPageChange', function () {
      let items = [];
      beforeEach(function () {
        spyOn<any>(component, 'setItems');
      });

      it(' - Function will not throw', function () {
        expect(function () {
          component.onPageChange(items);
        }).not.toThrow();
      });
    });

    describe(' - Testing setData', function () {
      let data = {
        data: []
      };
      beforeEach(function () {
        spyOn<any>(component, 'updateUserGainLossValue');
        spyOn<any>(component, 'updateStoredCurrencyData');
        spyOn<any>(component, 'getData');
      });

      describe(' - Testing when initialLoad is true', function () {
        beforeEach(function () {
          component['initialLoad'] = true;
        });

        it(' - Function will not throw', function () {
          expect(function () {
            component['setData'](data);
          }).not.toThrow();
        });
      });

      describe(' - Testing when initialLoad is false', function () {
        beforeEach(function () {
          component['initialLoad'] = false;
        });

        it(' - Function will not throw', function () {
          expect(function () {
            component['setData'](data);
          }).not.toThrow();
        });
      });
    });

    describe(' - Testing setItems', function () {
      let items = [];

      it(' - Function will not throw', function () {
        expect(function () {
          component['setItems'](items);
        }).not.toThrow();
      });
    });

    describe(' - Testing updateData', function () {
      beforeEach(function () {
        spyOn<any>(component, 'setData');
      });

      it(' - Function will not throw', function () {
        expect(function () {
          component.updateData();
        }).not.toThrow();
      });
    });

    describe(' - Testing updateStoredCurrencyData', function () {
      beforeEach(function () {
        spyOn(localStorage, 'setItem');
        component.paginationData = {
          allItems: [{
            price: 121,
            symbol: 'BCT'
          }]
        };
      });

      describe(' - Testing when currencyData exists', function () {
        beforeEach(function () {
          spyOn(localStorage, 'getItem').and.callFake(function () {
            let data = {
              BCT: 12
            };
            return JSON.stringify(data);
          });
        });

        it(' - Function will not throw', function () {
          expect(function () {
            component['updateStoredCurrencyData']();
          }).not.toThrow();
        });
      });

      describe(' - Testing when currencyData does not exist', function () {
        beforeEach(function () {
          spyOn(localStorage, 'getItem').and.callFake(function () {
            return '';
          });
        });

        it(' - Function will not throw', function () {
          expect(function () {
            component['updateStoredCurrencyData']();
          }).not.toThrow();
        });
      });
    });

    describe(' - Testing updateUserGainLossValue', function () {
      describe(' - Testing when currencyData exists', function () {
        beforeEach(function () {
          spyOn(localStorage, 'getItem').and.callFake(function () {
            let data = {
              BCT: 12
            };
            return JSON.stringify(data);
          });
        });

        describe(' - Testing when gainValue exists', function () {
          beforeEach(function () {
            spyOn<any>(component, 'calculateGainLossValue').and.callFake(function () {
              return 12;
            });
          });

          it(' - Function will not throw', function () {
            expect(function () {
              component['updateUserGainLossValue']();
            }).not.toThrow();
          });
        });

        describe(' - Testing when gainValue does not exist', function () {
          beforeEach(function () {
            spyOn<any>(component, 'calculateGainLossValue').and.callFake(function () {
              return undefined;
            });
          });

          it(' - Function will not throw', function () {
            expect(function () {
              component['updateUserGainLossValue']();
            }).not.toThrow();
          });
        });
      });

      describe(' - Testing when currencyData does not exist', function () {
        beforeEach(function () {
          spyOn(localStorage, 'getItem').and.callFake(function () {
            return '';
          });
        });

        it(' - Function will not throw', function () {
          expect(function () {
            component['updateUserGainLossValue']();
          }).not.toThrow();
        });
      });
    });
  });
});
