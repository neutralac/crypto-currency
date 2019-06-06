import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyInputComponent } from './currency-input.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { createTranslateLoader } from 'src/test.util';

describe('CurrencyInputComponent', () => {
  let component: CurrencyInputComponent;
  let fixture: ComponentFixture<CurrencyInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyInputComponent],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
          }
        }),
        FormsModule,
        HttpClientModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(' - Testing functions', function () {
    describe(' - Testing ngOnInit', function () {
      describe(' - Testing when previous value exists', function () {
        beforeEach(function () {
          spyOn(localStorage, 'getItem').and.callFake(function (key) {
            return '12';
          });
        });

        it(' - Function will not throw', function () {
          expect(function () {
            component.ngOnInit();
          }).not.toThrow();
        });
      });

      describe(' - Testing when previous value does not exist', function () {
        beforeEach(function () {
          spyOn(localStorage, 'getItem').and.callFake(function (key) {
            return '';
          });
        });

        it(' - Function will not throw', function () {
          expect(function () {
            component.ngOnInit();
          }).not.toThrow();
        });
      });
    });

    describe(' - Testing onUserInput', function () {
      let event: any = {};
      describe(' - Testing when user value exists', function () {
        describe(' - Testing when user value is a number', function () {
          beforeEach(function () {
            event.target = {
              value: 12
            };
          });

          it(' - Function will not throw and works as it should', function () {
            expect(function () {
              component.onUserInput(event);
            }).not.toThrow();
            expect(component.isValid).toBe(true);
          });
        });

        describe(' - Testing when user value is not a number', function () {
          beforeEach(function () {
            event.target = {
              value: 'asdasdad'
            };
          });

          it(' - Function will not throw and works as it should', function () {
            expect(function () {
              component.onUserInput(event);
            }).not.toThrow();
            expect(component.isValid).toBe(false);
          });
        });
      });

      describe(' - Testing when user value does not exist', function () {
        beforeEach(function () {
          event.target = {
            value: ''
          };
        });

        it(' - Function will not throw and works as it should', function () {
          expect(function () {
            component.onUserInput(event);
          }).not.toThrow();
          expect(component.isValid).toBe(false);
        });
      });
    });

    describe(' - Testing submitAmmount', function () {
      beforeEach(function () {
        spyOn(localStorage, 'setItem');
        component.amountYouOwn = 12;
        spyOn(component.ammountOwnedChanged, 'emit');
      });
      it(' - Function will not throw', function () {
        expect(function () {
          component.submitAmmount();
        }).not.toThrow();
      });
    });
  });
});
