import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NgxLoadingModule } from 'ngx-loading';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceMock } from 'src/test-mocks/angular/translate-service.mock';
import { LoadingMaskService } from './services/loading-mask/loading-mask.service';
import { LoadingMaskServiceMock } from 'src/test-mocks/services/loading-mask-service.mock';

describe('AppComponent', () => {
  let app;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgxLoadingModule.forRoot({}),
      ],
      declarations: [
        AppComponent
      ],
      providers: [{
        provide: TranslateService, useClass: TranslateServiceMock
      }, {
        provide: LoadingMaskService, useClass: LoadingMaskServiceMock
      }]
    }).compileComponents();
  }));

  beforeEach(function () {
    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  describe(' - Testing functions', function () {
    describe(' - Testing setLoading', function () {
      let loading = false;
      beforeEach(function () {
        spyOn(app, 'setLoadingValue');
      });
      it(' - Function will not throw', function () {
        expect(function () {
          app.setLoading(loading);
        }).not.toThrow();
      });
    });

    describe(' - Testing setLoadingValue', function () {
      let loading = false;
      it(' - Function will not throw', function () {
        expect(function () {
          app.setLoadingValue(loading);
        }).not.toThrow();
      });
    });
  });
});
