import { TestBed, getTestBed } from "@angular/core/testing";
import { CryptoCurrencyApiService } from './crypto-currency-api.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientMock } from 'src/test-mocks/angular/http-client.mock';

describe('CryptoCurrencyApi service', function () {
    let service;
    let injector;

    beforeEach(async function () {
        TestBed.configureTestingModule({
            providers: [{
                provide: HttpClient, useClass: HttpClientMock
            }]
        });
    });

    beforeEach(function () {
        injector = getTestBed();
        let http = injector.get(HttpClient);
        service = new CryptoCurrencyApiService(http);
    });

    it('should be created', function () {
        expect(service).toBeTruthy();
    });

    describe(' - Testing functions', function () {
        describe(' - Testing getCryptoCurrencyData', function () {
            it(' - Function will not throw', function () {
                expect(function () {
                    service.getCryptoCurrencyData();
                }).not.toThrow();
            });
        });

        describe(' - Testing getSingleCurrencyData', function () {
            let symbol = 'BCT';
            it(' - Function will not throw', function () {
                expect(function () {
                    service.getSingleCurrencyData(symbol);
                }).not.toThrow();
            });
        });
    });
});