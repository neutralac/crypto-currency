import { TestBed } from "@angular/core/testing";
import { SpanWithTooltip } from './span-with-tooltip.component';
import { TooltipModule } from 'ng2-tooltip-directive';

describe('SpanWithTooltip component', function () {
    let fixture;
    let component;

    beforeEach(async function () {
        TestBed.configureTestingModule({
            declarations: [SpanWithTooltip],
            imports: [
                TooltipModule
            ]
        });
    });

    beforeEach(function () {
        fixture = TestBed.createComponent(SpanWithTooltip);
        component = fixture.componentInstance;
    });

    it('should be created', function () {
        expect(component).toBeTruthy();
    });

    describe(' - Testing functions', function () {
        describe(' - Testing ngOnInit', function () {
            describe(' - Testing when tooltipText exists', function () {
                beforeEach(function () {
                    component.tooltipText = 'test';
                });

                it(' - Function will not throw', function () {
                    expect(function () {
                        component.ngOnInit();
                    }).not.toThrow();
                });
            });

            describe(' - Testing when tooltipText does not exist', function () {
                beforeEach(function () {
                    component.tooltipText = undefined;
                });

                it(' - Function will not throw', function () {
                    expect(function () {
                        component.ngOnInit();
                    }).not.toThrow();
                });
            });
        });
    });
});