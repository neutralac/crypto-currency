import { TestBed } from "@angular/core/testing";
import { PaginationBar } from './pagination-bar.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from 'src/test.util';

describe('PaginationBar component', function () {
    let fixture;
    let component;

    beforeEach(async function () {
        TestBed.configureTestingModule({
            declarations: [
                PaginationBar
            ],
            imports: [
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: (createTranslateLoader),
                        deps: [HttpClient]
                    }
                }),
            ]
        });
    });

    beforeEach(function () {
        fixture = TestBed.createComponent(PaginationBar);
        component = fixture.componentInstance;
    });

    it('should be created', function () {
        expect(component).toBeTruthy();
    });

    describe(' - Testing functions', function () {
        describe(' - Testing ngOnInit', function () {
            beforeEach(function () {
                spyOn(component, 'calculatePageCount');
                spyOn(component, 'setPages');
                spyOn(component, 'setInitialPage');
            });

            it(' - Function will not throw', function () {
                expect(function () {
                    component.ngOnInit();
                }).not.toThrow();
            });
        });

        describe(' - Testing calculatePageCount', function () {
            beforeEach(function () {
                component.config = {
                    pageSize: 10,
                    allItems: []
                };
            });

            describe(' - Testing when remainder exists', function () {
                beforeEach(function () {
                    spyOn(component, 'getItemsCount').and.callFake(function () {
                        return 11;
                    });
                });

                it(' - Function will not throw and returns correct value', function () {
                    let result;
                    expect(function () {
                        result = component.calculatePageCount();
                    }).not.toThrow();
                    expect(result).toBe(2);
                });
            });

            describe(' - Testing when remainder does not exist', function () {
                beforeEach(function () {
                    spyOn(component, 'getItemsCount').and.callFake(function () {
                        return 30;
                    });
                });

                it(' - Function will not throw and returns correct value', function () {
                    let result;
                    expect(function () {
                        result = component.calculatePageCount();
                    }).not.toThrow();
                    expect(result).toBe(3);
                });
            });
        });

        describe(' - Testing getActivePageItems', function () {
            beforeEach(function () {
                component.activePageIndex = 1;
            });

            describe(' - Testing when endIndex greater than items count', function () {
                it(' - Function will not throw', function () {
                    expect(function () {
                        component.getActivePageItems();
                    }).not.toThrow();
                });
            });

            describe(' - Testing when endIndex not greater than items count', function () {
                beforeEach(function () {
                    component.config = {
                        pageSize: 10,
                        allItems: []
                    };
                });

                it(' - Function will not throw', function () {
                    expect(function () {
                        component.getActivePageItems();
                    }).not.toThrow();
                });
            });
        });

        describe(' - Testing getItemsCount', function () {
            describe(' - Testing when allItems exist', function () {
                beforeEach(function () {
                    component.config = {
                        allItems: [{}]
                    };
                });

                it(' - Function will not throw and returns correct value', function () {
                    let result;
                    expect(function () {
                        result = component.getItemsCount();
                    }).not.toThrow();
                    expect(result).toBe(component.config.allItems.length);
                });
            });

            describe(' - Testing when allItems do not exist', function () {
                beforeEach(function () {
                    component.config = {
                        allItems: undefined
                    };
                });

                it(' - Function will not throw and returns correct value', function () {
                    let result;
                    expect(function () {
                        result = component.getItemsCount();
                    }).not.toThrow();
                    expect(result).toBe(0);
                });
            });
        });

        describe(' - Testing setInitialPage', function () {
            beforeEach(function () {
                spyOn(component, 'setPage');
            });

            describe(' - Testing when defaultPageIndex is a number', function () {
                beforeEach(function () {
                    component.config = {
                        defaultPageIndex: 1
                    };
                });

                it(' - Function will not throw and works as it should', function () {
                    expect(function () {
                        component.setInitialPage();
                    }).not.toThrow();
                    expect(component.setPage).toHaveBeenCalledWith(component.config.defaultPageIndex);
                });
            });

            describe(' - Testing when defaultPageIndex is not a number', function () {
                beforeEach(function () {
                    component.config = {
                        defaultPageIndex: undefined
                    };
                });

                it(' - Function will not throw and works as it should', function () {
                    expect(function () {
                        component.setInitialPage();
                    }).not.toThrow();
                    expect(component.setPage).toHaveBeenCalledWith(0);
                });
            });
        });

        describe(' - Testing setPage', function () {
            let index;
            describe(' - Testing when index is less than 0', function () {
                beforeEach(function () {
                    index = -1;
                });

                it(' - Function will not throw', function () {
                    expect(function () {
                        component.setPage(index);
                    }).not.toThrow();
                });
            });

            describe(' - Testing when index is equal to 0', function () {
                beforeEach(function () {
                    index = 0;
                    spyOn(component, 'getActivePageItems');
                    spyOn(component.pageChanged, 'emit');
                    spyOn(component, 'updateIsLast');
                    spyOn(component, 'updateIsFirst');
                });

                it(' - Function will not throw', function () {
                    expect(function () {
                        component.setPage(index);
                    }).not.toThrow();
                });
            });

            describe(' - Testing when index is greater than 0', function () {
                describe(' - Testing when index is less than pageCount', function () {
                    beforeEach(function () {
                        index = 2;
                        component.pageCount = 3;
                        spyOn(component, 'getActivePageItems');
                        spyOn(component.pageChanged, 'emit');
                        spyOn(component, 'updateIsLast');
                        spyOn(component, 'updateIsFirst');
                    });

                    it(' - Function will not throw', function () {
                        expect(function () {
                            component.setPage(index);
                        }).not.toThrow();
                    });
                });

                describe(' - Testing when index is equal to pageCount', function () {
                    beforeEach(function () {
                        index = 2;
                        component.pageCount = 2;
                    });

                    it(' - Function will not throw', function () {
                        expect(function () {
                            component.setPage(index);
                        }).not.toThrow();
                    });
                });

                describe(' - Testing when index is greater than pageCount', function () {
                    beforeEach(function () {
                        index = 3;
                        component.pageCount = 2;
                    });

                    it(' - Function will not throw', function () {
                        expect(function () {
                            component.setPage(index);
                        }).not.toThrow();
                    });
                });
            });
        });

        describe(' - Testing setPages', function () {
            beforeEach(function () {
                component.pageCount = 2;
            });

            it(' - Function will not throw', function () {
                expect(function () {
                    component.setPages();
                }).not.toThrow();
            });
        });

        describe(' - Testing updateIsFirst', function () {
            describe(' - Testing when activePageIndes is 0', function () {
                beforeEach(function () {
                    component.activePageIndex = 0;
                });

                it(' - Function will not throw and works as it should', function () {
                    expect(function () {
                        component.updateIsFirst();
                    }).not.toThrow();
                    expect(component.isFirst).toBe(true);
                });
            });

            describe(' - Testing when activePageIndes is not 0', function () {
                beforeEach(function () {
                    component.activePageIndex = 1;
                });

                it(' - Function will not throw and works as it should', function () {
                    expect(function () {
                        component.updateIsFirst();
                    }).not.toThrow();
                    expect(component.isFirst).toBe(false);
                });
            });
        });

        describe(' - Testing updateIsLast', function () {
            describe(' - Testing when activePageIndes is pageCount -1', function () {
                beforeEach(function () {
                    component.activePageIndex = 2;
                    component.pageCount = 3;
                });

                it(' - Function will not throw and works as it should', function () {
                    expect(function () {
                        component.updateIsLast();
                    }).not.toThrow();
                    expect(component.isLast).toBe(true);
                });
            });

            describe(' - Testing when activePageIndes is not pageCount - 1', function () {
                beforeEach(function () {
                    component.activePageIndex = 1;
                    component.pageCount = 4;
                });

                it(' - Function will not throw and works as it should', function () {
                    expect(function () {
                        component.updateIsLast();
                    }).not.toThrow();
                    expect(component.isLast).toBe(false);
                });
            });
        });
    });
});