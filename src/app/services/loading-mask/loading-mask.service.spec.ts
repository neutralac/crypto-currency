import { TestBed } from "@angular/core/testing";
import { LoadingMaskService } from './loading-mask.service';

describe('LoadingMask service', function () {
    let service;

    beforeEach(async function () {
        TestBed.configureTestingModule({

        });
    });

    beforeEach(function () {
        service = new LoadingMaskService();
    });

    it('should be created', function () {
        expect(service).toBeTruthy();
    });

    describe(' - Testing functions', function () {
        describe(' - Testing hideLoadingMask', function () {
            beforeEach(function () {
                spyOn(service.loadingMaskToggle, 'emit');
            });

            it(' - Function will not throw', function () {
                expect(function () {
                    service.hideLoadingMask();
                }).not.toThrow();
            });
        });

        describe(' - Testing showLoadingMask', function () {
            beforeEach(function () {
                spyOn(service.loadingMaskToggle, 'emit');
            });

            it(' - Function will not throw', function () {
                expect(function () {
                    service.showLoadingMask();
                }).not.toThrow();
            });
        });
    });
});